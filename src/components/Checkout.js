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

  const [loading, setLoading] = useState(false); // Loading state
  const { cart, clearCart } = useContext(CartContext); // Access cart and clearCart from context
  const navigate = useNavigate();

  // Retrieve userId from localStorage
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  // Update form data when input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form fields (example)
  const validateFields = () => {
    const { creditCardNumber, expirationDate, cvv } = formData;

    // Simple regex validation for credit card, expiration (MM/YY), and CVV
    const cardRegex = /^[0-9]{16}$/;
    const expirationRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    const cvvRegex = /^[0-9]{3,4}$/;

    if (!cardRegex.test(creditCardNumber)) {
      alert('Invalid credit card number.');
      return false;
    }
    if (!expirationRegex.test(expirationDate)) {
      alert('Invalid expiration date. Use MM/YY format.');
      return false;
    }
    if (!cvvRegex.test(cvv)) {
      alert('Invalid CVV.');
      return false;
    }
    return true;
  };

  // Submit order when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure userId exists, if not, redirect to login
    if (!userId) {
      alert('User is not logged in.');
      navigate('/login'); // Redirect to login page
      return;
    }

    // Ensure cart exists
    if (cart && cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    // Validate form fields
    if (!validateFields()) {
      return;
    }

    // Create the order object to send to the backend
    const orderDetails = {
      userId,
      items: cart,
      totalAmount: cart?.reduce((total, item) => total + item.price * item.quantity, 0),
      shippingAddress: `${formData.address}, ${formData.country}, ZIP: ${formData.zip}`,
      status: 'Pending',
    };

    setLoading(true); // Show loading state

    try {
      const response = await fetch('http://localhost:5002/api/place-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderDetails),
      });

      const data = await response.json();
      setLoading(false); // Hide loading state

      if (response.ok) {
        console.log('Order placed successfully:', data);

        // Clear the cart after order placement
        clearCart();

        // Redirect to confirmation page
        navigate('/confirmation');
      } else {
        console.error('Order placement failed:', data);
        alert('Order placement failed. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while placing the order. Please try again.');
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit} className="checkout-form">
        {/* Personal Information Section */}
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
            <label htmlFor="zip">Zip Code</label>
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

        {/* Credit Card Information Section */}
        <div className="form-section">
          <h2>Credit Card Information</h2>

          <div className="input-group full-width">
            <label htmlFor="creditCardNumber">Credit Card Number</label>
            <input
              id="creditCardNumber"
              type="password" // Mask credit card number
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
              placeholder="MM/YY"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="cvv">CVV</label>
            <input
              id="cvv"
              type="password" // Mask CVV
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {loading && <p>Placing your order...</p>}

        {/* Submit Button */}
        <button type="submit" className="checkout-button" disabled={loading}>
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}

export default Checkout;