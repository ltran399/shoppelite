import React from 'react';
import ReactDOM from 'react-dom';
import { CartProvider } from './context/CartContext';
import './styles.css'; // Ensure this line is correct
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
