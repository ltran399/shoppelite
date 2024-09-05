
// src/components/OrderDetails.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from './ReviewForm';

function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5002/api/order/${orderId}`)
      .then(response => response.json())
      .then(data => setOrder(data))
      .catch(error => console.error('Error fetching order details:', error));
  }, [orderId]);

  if (!order) return <div>Loading...</div>;

  return (
    <div>
      <h2>Order Details</h2>
      <p>Order ID: {order._id}</p>
      <p>Status: {order.status}</p>
      <p>Total Amount: ${order.totalAmount}</p>
      <p>Shipping Address: {order.shippingAddress}</p>
      <h3>Items</h3>
      <ul>
        {order.items.map(item => (
          <li key={item.productId}>
            {item.name} - Quantity: {item.quantity} - Price: ${item.price}
          </li>
        ))}
      </ul>
      <ReviewForm productId={order.items[0].productId} />
    </div>
  );
}

export default OrderDetails;