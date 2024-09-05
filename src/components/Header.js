import React, {useContext} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Header.css';
import logo from '../assets/images/logo.png';
import { FaUserCircle, FaShoppingCart, FaSearch } from 'react-icons/fa'; // Importing the search icon
import { CartContext } from '../context/CartContext';
function Header({ setSearchTerm }) {
  const { cart } = useContext(CartContext); // Use CartContext to access the cart
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check if user is logged in
  const [isAdmin, setIsAdmin] = useState(false); // State to check if the user is an admin

  useEffect(() => {
    const token = localStorage.getItem('token'); // Check if the user is logged in
    const adminStatus = localStorage.getItem('isAdmin'); // Check if the user is an admin
    if (token) {
      setIsLoggedIn(true);
    }
    if (adminStatus === 'true') {
      setIsAdmin(true);
    }
  }, []);

  // Handle account icon click based on login status
  const handleAccountClick = () => {
    if (isLoggedIn) {
      navigate('/account');
    } else {
      navigate('/login');
    }
  };

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
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <FaSearch className="search-icon" />
        </div>
      </div>

      <div className="header-right">
        {/* Account button */}
        <button 
          onClick={handleAccountClick} 
          style={{
            backgroundColor: '#ff5722',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
          }}
        >
          <FaUserCircle className="header-icon account-icon" />
        </button>

        {/* Admin dashboard link visible only to admins */}
        {isAdmin && (
          <Link to="/admin/dashboard" className="admin-link">
            Admin Dashboard
          </Link>
        )}

        {/* Shopping cart icon */}
        <Link to="/cart" className="cart-link">
          <FaShoppingCart className="header-icon cart-icon" />
          {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
        </Link>
      </div>
    </header>
  );
}

export default Header;