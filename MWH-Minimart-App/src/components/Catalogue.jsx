import React, { useState, useMemo } from 'react';
import { FaSearch } from 'react-icons/fa';
import Header from './Header';
import Sidebar from './Sidebar';
import ProductCard from './ProductCard';
import Footer from './Footer';
import products from '../data/products.js';
import './Catalogue.css';

const Catalogue = () => {
  const allCategories = useMemo(() => [...new Set(products.map(p => p.category))], []);
  const allTypes = useMemo(() => [...new Set(products.map(p => p.type))], []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(['Games', 'Hygiene', 'Drinks']);
  const [selectedTypes, setSelectedTypes] = useState(['Showcase']);
  const [points, setPoints] = useState(4000);
  const [sortOrder, setSortOrder] = useState('');

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleTypeChange = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const filteredAndSortedProducts = useMemo(() => {
    let sortedProducts = [...products];

    if (sortOrder === 'asc') {
      sortedProducts.sort((a, b) => a.points - b.points);
    } else if (sortOrder === 'desc') {
      sortedProducts.sort((a, b) => b.points - a.points);
    }

    return sortedProducts.filter(product => {
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(product.type);
      const matchesPoints = product.points <= points;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesType && matchesPoints && matchesSearch;
    });
  }, [selectedCategories, selectedTypes, points, searchQuery, sortOrder]);

  return (
    <div className="catalogue-page">
      <Header />
      <div className="main-content">
        <Sidebar 
          allCategories={allCategories}
          selectedCategories={selectedCategories}
          handleCategoryChange={handleCategoryChange}
          allTypes={allTypes}
          selectedTypes={selectedTypes}
          handleTypeChange={handleTypeChange}
          points={points}
          setPoints={setPoints}
        />
        <main className="product-grid-container">
          <div className="controls">
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Search" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
              />
            </div>
            <div className="sort-buttons">
              <button 
                className={`sort-button ${sortOrder === 'asc' ? 'active' : ''}`}
                onClick={() => setSortOrder('asc')}
              >
                Point ascending
              </button>
              <button 
                className={`sort-button ${sortOrder === 'desc' ? 'active' : ''}`}
                onClick={() => setSortOrder('desc')}
              >
                Points descending
              </button>
            </div>
          </div>
          <div className="product-grid">
            {filteredAndSortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Catalogue; 