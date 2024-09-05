// src/components/OrderList.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function OrderList({ userId }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5002/api/user/${userId}/orders`)
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(error => console.error('Error fetching orders:', error));
  }, [userId]);

  return (
    <div>
      <h2>Your Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            <a href={`/order/${order._id}`}>Order #{order._id} - {order.status}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderList;