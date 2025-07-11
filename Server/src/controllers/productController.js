const { validationResult } = require('express-validator');
const { prisma } = require('../lib/db');

class ProductsController {
  // Get all products with filtering (matches your frontend filtering)
  static async getAllProducts(req, res) {
    try {
      const {
        search,
        categories,
        types,
        maxPoints,
        sortBy = 'productName',
        sortOrder = 'asc',
        limit = 50,
        offset = 0
      } = req.query;

      // Build where clause
      const where = {
        available: true
      };

      // Search filter
      if (search) {
        where.productName = {
          contains: search,
          mode: 'insensitive'
        };
      }

      // Category filter
      if (categories) {
        const categoryIds = categories.split(',').map(id => parseInt(id));
        where.categoryId = {
          in: categoryIds
        };
      }

      // Product type filter
      if (types) {
        const typeFilter = types.split(',');
        where.productType = {
          in: typeFilter
        };
      }

      // Points filter
      if (maxPoints) {
        where.points = {
          lte: parseInt(maxPoints)
        };
      }

      // Build orderBy clause
      const orderBy = {};
      if (sortBy === 'productName') {
        orderBy.productName = sortOrder.toLowerCase();
      } else if (sortBy === 'points') {
        orderBy.points = sortOrder.toLowerCase();
      } else {
        orderBy[sortBy] = sortOrder.toLowerCase();
      }

      // Execute query with pagination
      const [products, totalCount] = await Promise.all([
        prisma.product.findMany({
          where,
          include: {
            category: {
              select: {
                id: true,
                categoryName: true
              }
            }
          },
          orderBy,
          take: parseInt(limit),
          skip: parseInt(offset)
        }),
        prisma.product.count({ where })
      ]);

      res.json({
        success: true,
        data: {
          products,
          pagination: {
            total: totalCount,
            limit: parseInt(limit),
            offset: parseInt(offset),
            pages: Math.ceil(totalCount / parseInt(limit))
          }
        }
      });

    } catch (error) {
      console.error('Get products error:', error);
      res.status(500).json({ 
        error: { message: 'Internal server error' }
      });
    }
  }

  // Get single product by ID
  static async getProductById(req, res) {
    try {
      const { id } = req.params;

      const product = await prisma.product.findUnique({
        where: { id: parseInt(id) },
        include: {
          category: {
            select: {
              id: true,
              categoryName: true
            }
          }
        }
      });

      if (!product) {
        return res.status(404).json({ 
          error: { message: 'Product not found' }
        });
      }

      res.json({
        success: true,
        data: product
      });

    } catch (error) {
      console.error('Get product error:', error);
      res.status(500).json({ 
        error: { message: 'Internal server error' }
      });
    }
  }

  // Get popular products (most redeemed)
  static async getPopularProducts(req, res) {
    try {
      const { limit = 10 } = req.query;

      const products = await prisma.product.findMany({
        where: { available: true },
        include: {
          category: {
            select: {
              id: true,
              categoryName: true
            }
          },
          _count: {
            select: {
              redemptions: true
            }
          }
        },
        orderBy: {
          redemptions: {
            _count: 'desc'
          }
        },
        take: parseInt(limit)
      });

      res.json({
        success: true,
        data: products
      });

    } catch (error) {
      console.error('Get popular products error:', error);
      res.status(500).json({ 
        error: { message: 'Internal server error' }
      });
    }
  }

  // Create new product (admin/officer only)
  static async createProduct(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          error: { message: 'Validation failed', details: errors.array() }
        });
      }

      const {
        productName,
        imageUrl,
        productDescription,
        points,
        productType = 'physical',
        categoryId,
        available = true
      } = req.body;

      // Verify category exists if provided
      if (categoryId) {
        const category = await prisma.category.findUnique({
          where: { id: parseInt(categoryId) }
        });
        
        if (!category) {
          return res.status(400).json({ 
            error: { message: 'Invalid category ID' }
          });
        }
      }

      const product = await prisma.product.create({
        data: {
          productName,
          imageUrl,
          productDescription,
          points: parseInt(points),
          productType,
          categoryId: categoryId ? parseInt(categoryId) : null,
          available
        },
        include: {
          category: {
            select: {
              id: true,
              categoryName: true
            }
          }
        }
      });

      res.status(201).json({
        success: true,
        data: product
      });

    } catch (error) {
      console.error('Create product error:', error);
      res.status(500).json({ 
        error: { message: 'Internal server error' }
      });
    }
  }

  // Update product (admin/officer only)
  static async updateProduct(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          error: { message: 'Validation failed', details: errors.array() }
        });
      }

      const { id } = req.params;
      const updates = req.body;

      const product = await prisma.product.findUnique({
        where: { id: parseInt(id) }
      });

      if (!product) {
        return res.status(404).json({ 
          error: { message: 'Product not found' }
        });
      }

      // Verify category exists if being updated
      if (updates.categoryId) {
        const category = await prisma.category.findUnique({
          where: { id: parseInt(updates.categoryId) }
        });
        
        if (!category) {
          return res.status(400).json({ 
            error: { message: 'Invalid category ID' }
          });
        }
      }

      // Build update data
      const updateData = {};
      if (updates.productName !== undefined) updateData.productName = updates.productName;
      if (updates.imageUrl !== undefined) updateData.imageUrl = updates.imageUrl;
      if (updates.productDescription !== undefined) updateData.productDescription = updates.productDescription;
      if (updates.points !== undefined) updateData.points = parseInt(updates.points);
      if (updates.productType !== undefined) updateData.productType = updates.productType;
      if (updates.categoryId !== undefined) updateData.categoryId = updates.categoryId ? parseInt(updates.categoryId) : null;
      if (updates.available !== undefined) updateData.available = updates.available;

      const updatedProduct = await prisma.product.update({
        where: { id: parseInt(id) },
        data: updateData,
        include: {
          category: {
            select: {
              id: true,
              categoryName: true
            }
          }
        }
      });

      res.json({
        success: true,
        data: updatedProduct
      });

    } catch (error) {
      console.error('Update product error:', error);
      res.status(500).json({ 
        error: { message: 'Internal server error' }
      });
    }
  }

  // Delete product (admin only)
  static async deleteProduct(req, res) {
    try {
      const { id } = req.params;

      const product = await prisma.product.findUnique({
        where: { id: parseInt(id) }
      });

      if (!product) {
        return res.status(404).json({ 
          error: { message: 'Product not found' }
        });
      }

      // Check if product has been redeemed
      const redemptionCount = await prisma.redemption.count({
        where: { productId: parseInt(id) }
      });

      if (redemptionCount > 0) {
        // Don't delete, just mark as unavailable
        await prisma.product.update({
          where: { id: parseInt(id) },
          data: { available: false }
        });
        
        return res.json({
          success: true,
          data: { message: 'Product marked as unavailable due to existing redemptions' }
        });
      }

      await prisma.product.delete({
        where: { id: parseInt(id) }
      });

      res.json({
        success: true,
        data: { message: 'Product deleted successfully' }
      });

    } catch (error) {
      console.error('Delete product error:', error);
      res.status(500).json({ 
        error: { message: 'Internal server error' }
      });
    }
  }

  // Get product categories
  static async getCategories(req, res) {
    try {
      const categories = await prisma.category.findMany({
        orderBy: { categoryName: 'asc' }
      });

      res.json({
        success: true,
        data: categories
      });

    } catch (error) {
      console.error('Get categories error:', error);
      res.status(500).json({ 
        error: { message: 'Internal server error' }
      });
    }
  }
}

module.exports = ProductsController;