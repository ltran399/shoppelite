import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Confirmation from './components/Confirmation';
import Header from './components/Header';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { CartProvider } from './context/CartContext';
import './App.css';
import OrderList from './components/OrderList';   // Ensure this import is correct
import OrderDetails from './components/OrderDetails';   // Ensure this import is correct
import AccountPage from './components/AccountPage';  // Import the AccountPage component

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} /> {/* Route for signup page */}
            <Route path="/orders" element={<OrderList userId={localStorage.getItem('userId')} />} />
            <Route path="/order/:orderId" element={<OrderDetails />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/reviews" element={<AdminReviews />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;