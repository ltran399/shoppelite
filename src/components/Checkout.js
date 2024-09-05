import React, { useState, useContext } from 'react';
import './Checkout.css';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function Checkout() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    country: '',
    zip: '',
    creditCardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  const { clearCart } = useContext(CartContext); // Get the clearCart function from context
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearCart(); // Clear the cart after successful checkout
    navigate('/confirmation'); // Redirect to the confirmation page
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-section personal-info">
          <h2>Personal Information</h2>

          <div className="input-group">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group full-width">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="country">Country</label>
            <input
              id="country"
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="zip">Zip</label>
            <input
              id="zip"
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Credit Card Information</h2>

          <div className="input-group full-width">
            <label htmlFor="creditCardNumber">Credit Card Number</label>
            <input
              id="creditCardNumber"
              type="text"
              name="creditCardNumber"
              value={formData.creditCardNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="expirationDate">Expiration Date</label>
            <input
              id="expirationDate"
              type="text"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="cvv">CVV</label>
            <input
              id="cvv"
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="checkout-button">Checkout</button>
      </form>
    </div>
  );
}

export default Checkout;