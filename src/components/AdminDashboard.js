import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css'; // Import the CSS file

function AdminDashboard() {
  return (
    <div className="admin-dashboard-container">
      <h1>Admin Dashboard</h1>
      <nav className="admin-nav">
        <ul>
          <li>
            <Link to="/admin/orders">
              <i className="fas fa-boxes"></i> Manage Orders
            </Link>
          </li>
          <li>
            <Link to="/admin/reviews">
              <i className="fas fa-comments"></i> Manage Reviews
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AdminDashboard;