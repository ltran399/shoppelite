import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AccountPage.css';

function AccountPage() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');  // Get the logged-in user's ID
  const token = localStorage.getItem('token');    // Check if user is logged in

  useEffect(() => {
    if (!token) {
      navigate('/login'); // If not logged in, redirect to login
    } else {
      fetch(`http://localhost:5002/api/user/${userId}/orders`)
        .then(response => response.json())
        .then(data => setOrders(data))
        .catch(error => console.error('Error fetching orders:', error));
    }
  }, [userId, navigate, token]);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token');    // Remove token
    localStorage.removeItem('userId');   // Remove user ID
    navigate('/login');                  // Redirect to login page
  };

  return (
    <div className="account-container">
      <h2>Your Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            <div onClick={() => navigate(`/order/${order._id}`)}>
              Order #{order._id} - {order.status}
            </div>
          </li>
        ))}
      </ul>

      {/* Logout button */}
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
}

export default AccountPage;