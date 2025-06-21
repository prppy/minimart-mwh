import React from 'react';
import { FaTimes } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({
  allCategories,
  selectedCategories,
  handleCategoryChange,
  allTypes,
  selectedTypes,
  handleTypeChange,
  points,
  setPoints
}) => {
  return (
    <aside className="sidebar">
      <div className="filter-section">
        <h3 className="filter-title">Category</h3>
        <div className="selected-filters">
          {selectedCategories.map(category => (
            <span key={category} className="filter-tag" onClick={() => handleCategoryChange(category)}>
              {category} <FaTimes />
            </span>
          ))}
        </div>
        <div className="filter-options">
          {allCategories.map(category => (
            <label key={category}>
              <input 
                type="checkbox" 
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              /> {category}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Type</h3>
        <div className="selected-filters">
          {selectedTypes.map(type => (
            <span key={type} className="filter-tag" onClick={() => handleTypeChange(type)}>
              {type} <FaTimes />
            </span>
          ))}
        </div>
        <div className="filter-options">
          {allTypes.map(type => (
            <label key={type}>
              <input 
                type="checkbox" 
                checked={selectedTypes.includes(type)}
                onChange={() => handleTypeChange(type)}
              /> {type}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Points</h3>
        <div className="points-slider">
          <input 
            type="range" 
            min="0" 
            max="4000" 
            value={points} 
            onChange={(e) => setPoints(Number(e.target.value))}
            className="slider" 
          />
          <div className="points-range">
            <span>0</span>
            <span>{points}pts</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 