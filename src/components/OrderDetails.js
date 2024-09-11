import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import './OrderDetails.css'; // Optional CSS for styling

function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5002/api/order/${orderId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error fetching order details');
        }
        return response.json();
      })
      .then(data => {
        setOrder(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [orderId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!order) return <div>No order found.</div>;

  return (
    <div className="order-details-container">
      <h2>Order Details</h2>
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
      <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>

      <h3>Items</h3>
      {order.items.length === 0 ? (
        <p>No items in this order.</p>
      ) : (
        <ul className="order-items-list">
          {order.items.map(item => (
            <li key={item.productId}>
              {item.name} - Quantity: {item.quantity} - Price: ${item.price}
            </li>
          ))}
        </ul>
      )}

      {/* Render ReviewForm and pass the first product's productId and the orderId */}
      {order.items.length > 0 && <ReviewForm productId={order.items[0].productId} orderId={order._id} />}
    </div>
  );
}

export default OrderDetails;