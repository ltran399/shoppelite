import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/images/logo.png';
import { FaUserCircle, FaShoppingCart, FaSearch, FaTachometerAlt } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';

function Header({ setSearchTerm }) {
  const { cart } = useContext(CartContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const adminStatus = localStorage.getItem('isAdmin');
    if (token) {
      setIsLoggedIn(true);
    }
    if (adminStatus === 'true') {
      setIsAdmin(true);
    }
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/">
          <img src={logo} alt="Shopee Logo" className="logo" />
        </Link>
        <div>Shopee</div>
      </div>

      <div className="header-center">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for products..."
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
            className="search-input"
          />
          <FaSearch className="search-icon" />
        </div>
      </div>

      <div className="header-right">
        {/* Conditionally render the account or login link based on isLoggedIn */}
        {isLoggedIn ? (
          <Link to="/account" className="account-button">
            <FaUserCircle className="header-icon account-icon" />
          </Link>
        ) : (
          <Link to="/login" className="account-button">
            <FaUserCircle className="header-icon account-icon" />
          </Link>
        )}

        {/* Admin Dashboard link visible only to admins */}
        {isAdmin && (
          <Link to="/admin/dashboard" className="admin-link" title="Admin Dashboard">
            <FaTachometerAlt className="header-icon admin-dashboard-icon" />
          </Link>
        )}

        {/* Shopping Cart */}
        <Link to="/cart" className="cart-link">
          <FaShoppingCart className="header-icon cart-icon" />
          {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
        </Link>
      </div>
    </header>
  );
}

export default Header;