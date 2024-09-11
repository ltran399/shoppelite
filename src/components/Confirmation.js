import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Confirmation.css';

function Confirmation() {
  const [orderDetails, setOrderDetails] = useState(null);
  const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')); // Retrieve cart from localStorage
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId || !cart || cart.length === 0) {
      navigate('/cart'); // Redirect to cart if no user or cart items
      return;
    }

    const postOrder = async () => {
      try {
        const response = await fetch('http://localhost:5002/api/place-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId,
            items: cart,
            status: 'Pending',
          }),
        });

        const data = await response.json();
        if (response.ok) {
          setOrderDetails(data.order); // Store order details
          localStorage.removeItem('cart'); // Clear cart items
        } else {
          console.error('Failed to place order:', data);
        }
      } catch (error) {
        console.error('Error placing order:', error);
      }
    };

    postOrder();
  }, [userId, cart, token, navigate]);

  return (
    <div className="confirmation-container">
      <h1>Congratulations, your order is placed!</h1>
      <p>Thank you for shopping with us.</p>
      {orderDetails && (
        <div className="order-summary">
          <h2>Order Summary</h2>
          <ul>
            {orderDetails.items.map((item) => (
              <li key={item.productId}>
                {item.name} - {item.quantity} x ${item.price}
              </li>
            ))}
          </ul>
          <p>Total: ${orderDetails.totalAmount}</p>
        </div>
      )}
    </div>
  );
}

export default Confirmation;