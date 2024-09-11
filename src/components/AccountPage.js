import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AccountPage.css';

function AccountPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetch(`http://localhost:5002/api/user/${userId}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch orders. Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.message === 'No orders found for this user') {
            setError('You have no orders yet.');
          } else {
            setOrders(data);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching orders:', error);
          setError('Failed to load orders. Please try again later.');
          setLoading(false);
        });
    }
  }, [userId, navigate, token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <div className="account-container">
      <h2>Your Orders</h2>

      {loading ? (
        <div className="loading">Loading your orders...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <div
                onClick={() => navigate(`/order/${order._id}`)}
                className="order-link"
              >
                Order #{order._id} - {order.status}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Logout button is always visible */}
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
}

export default AccountPage;