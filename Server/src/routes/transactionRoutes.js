// routes/transactions.js
const express = require('express');
const { body, param, query } = require('express-validator');
const TransactionsController = require('../controllers/transactionsController');
const { authenticateToken, requireOfficerOrAdmin, requireOwnershipOrStaff } = require('../middleware/auth');

const transactionRouter = express.Router();

// Validation middleware
const redemptionValidation = [
  body('userId')
    .isInt({ min: 1 })
    .withMessage('User ID must be a positive integer'),
  body('products')
    .isArray({ min: 1 })
    .withMessage('Products must be a non-empty array'),
  body('products.*.id')
    .isInt({ min: 1 })
    .withMessage('Product ID must be a positive integer'),
  body('products.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be a positive integer')
];

const completionValidation = [
  body('userId')
    .isInt({ min: 1 })
    .withMessage('User ID must be a positive integer'),
  body('tasks')
    .isArray({ min: 1 })
    .withMessage('Tasks must be a non-empty array'),
  body('tasks.*.id')
    .isInt({ min: 1 })
    .withMessage('Task ID must be a positive integer')
];

// Routes
transactionRouter.get('/', authenticateToken, requireOfficerOrAdmin, TransactionsController.getAllTransactions);
transactionRouter.get('/user/:userId', authenticateToken, requireOwnershipOrStaff, TransactionsController.getUserTransactions);
transactionRouter.get('/user/:userId/summary', authenticateToken, requireOwnershipOrStaff, TransactionsController.getPointsSummary);
transactionRouter.post('/redemption', authenticateToken, requireOfficerOrAdmin, redemptionValidation, TransactionsController.createRedemption);
transactionRouter.post('/completion', authenticateToken, requireOfficerOrAdmin, completionValidation, TransactionsController.createCompletion);