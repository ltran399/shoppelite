import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminOrders.css'; // Import the CSS file

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isAdminValue = localStorage.getItem('isAdmin') === 'true';

    if (!token) {
      navigate('/login');
      return;
    }

    if (!isAdminValue) {
      navigate('/');
      return;
    }

    fetch('http://localhost:5002/api/admin/orders', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Send the token in the Authorization header
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 403) {
          navigate('/');
        } else {
          throw new Error('Failed to fetch orders.');
        }
      })
      .then((data) => {
        setOrders(data); // Store the orders in state
      })
      .catch((err) => {
        console.error('Error fetching orders:', err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false); // Set loading to false when the request is complete
      });
  }, [navigate]);

  const handleStatusChange = async (orderId, newStatus) => {
    const token = localStorage.getItem('token'); // Get token for authentication

    try {
      const response = await fetch(`http://localhost:5002/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Send the token in the Authorization header
        },
        body: JSON.stringify({ status: newStatus }), // Send the new status to the server
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        // Update the order in the state with the new status
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === updatedOrder.order._id ? updatedOrder.order : order
          )
        );
      } else {
        throw new Error('Failed to update order status.');
      }
    } catch (err) {
      console.error('Error updating order status:', err);
      setError(err.message); // Handle any errors
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="admin-orders-container">
      <h1>Admin Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="admin-orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Change Status</th>
              <th>Created At</th>
              <th>Shipping Address</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user?.username || 'Unknown'}</td>
                <td>${order.totalAmount}</td>
                <td>{order.status}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>{order.shippingAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminOrders;