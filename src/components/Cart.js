import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './Cart.css';
import {Link} from 'react-router-dom';

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  if (cart.length === 0) {
    return <h2>Your cart is empty</h2>;
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-info">
              <h2>{item.name}</h2>
              <p>{item.originalPrice}đ</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <Link to="/checkout" className="checkout-button">Proceed to Checkout</Link>    </div>
  );
}

export default Cart;