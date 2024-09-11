import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Confirmation from './components/Confirmation';
import Header from './components/Header';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AdminDashboard from './components/AdminDashboard';
import OrderList from './components/OrderList';
import OrderDetails from './components/OrderDetails';
import AccountPage from './components/AccountPage';
import AdminOrders from './components/AdminOrders';
import AdminReviews from './components/AdminReviews';
import './App.css';

// Define the ProtectedRoute logic
const ProtectedRoute = ({ element, authRequired, adminRequired }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  if (authRequired && !isAuthenticated) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  if (adminRequired && !isAdmin) {
    return <Navigate to="/" />; // Redirect to home if not admin
  }

  return element;
};

function App() {
  const [searchTerm, setSearchTerm] = useState(''); // Define the searchTerm state

  return (
    <Router>
      <Header setSearchTerm={setSearchTerm} /> {/* Pass setSearchTerm to Header */}
      <div className="app-container">
        <Routes>
          <Route path="/" element={<ProductList searchTerm={searchTerm} />} /> {/* Pass searchTerm to ProductList */}
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Admin Route */}
          <Route
            path="/admin/dashboard"
            element={<ProtectedRoute element={<AdminDashboard />} authRequired={true} adminRequired={true} />}
          />

          {/* Protected Routes for Account and Orders */}
          <Route
            path="/orders"
            element={<ProtectedRoute element={<OrderList userId={localStorage.getItem('userId')} />} authRequired={true} />}
          />
          <Route
            path="/order/:orderId"
            element={<ProtectedRoute element={<OrderDetails />} authRequired={true} />}
          />
          <Route
            path="/account"
            element={<ProtectedRoute element={<AccountPage />} authRequired={true} />}
          />

          {/* Protected Admin Orders Route */}
          <Route
            path="/admin/orders"
            element={<ProtectedRoute element={<AdminOrders />} authRequired={true} adminRequired={true} />}
          />
          <Route
            path="/admin/reviews"
            element={<ProtectedRoute element={<AdminReviews />} authRequired={true} adminRequired={true} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;