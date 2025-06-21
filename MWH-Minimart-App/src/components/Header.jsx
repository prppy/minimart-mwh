import React from 'react';
import { FaShoppingCart, FaRegSmile, FaMedal, FaUser } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <img src="/mwh-logo.svg" alt="MWH Logo" className="logo" />
      </div>
      <div className="header-right">
        <button className="header-button catalogue-button">
          <FaShoppingCart />
          <span>Catalogue</span>
        </button>
        <button className="header-button feedback-button">
          <FaRegSmile />
          <span>Feedback</span>
        </button>
        <button className="header-button leaderboard-button">
          <FaMedal />
          <span>Leaderboard</span>
        </button>
        <button className="header-button signin-button">
          <FaUser />
          <span>Sign in</span>
        </button>
      </div>
    </header>
  );
};

export default Header; 