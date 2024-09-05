import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { useNavigate } from 'react-router-dom';
function Login() {
const [formData, setFormData] = useState({
  email: '',
  password: '',
});

const navigate = useNavigate();

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:5002/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId); 
      localStorage.setItem('isAdmin', data.isAdmin); // Store admin status
      navigate(data.isAdmin ? '/admin/dashboard' : '/account'); // Redirect based on admin status// Save user ID for later use
      alert('Login successful!');
      navigate('/account'); // Redirect to the account page
    } else {
      alert('Login failed. Please check your credentials.');
    }
  } catch (err) {
    console.error('Error:', err);
    alert('Login failed due to a server error.');
  }
};

return (  
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="login-button">Login</button>
      </form>

      <div className="create-account-link">
        <p>Don't have an account?</p>
        <Link to="/signup" className="signup-link">Create an Account</Link>
      </div>
    </div>
  );
}

export default Login;