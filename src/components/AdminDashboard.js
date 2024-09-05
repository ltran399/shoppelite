import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get the token from localStorage

    if (!token) {
      navigate('/login'); // Redirect to login if no token is found
      return;
    }

    // Check if the user is an admin
    fetch('http://localhost:5002/api/admin/check', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Send the token in the Authorization header
      },
    })
      .then(response => {
        if (response.status === 403) {
          navigate('/'); // Redirect non-admins to the homepage
        }
      })
      .catch(() => navigate('/login')); // Redirect to login on error
  }, [navigate]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <Link to="/admin/orders">Manage Orders</Link>
        <br />
        <Link to="/admin/reviews">Manage Reviews</Link>
      </nav>
    </div>
  );
}

export default AdminDashboard;