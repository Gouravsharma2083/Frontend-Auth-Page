import React, { useState } from 'react';
import { login } from '../services/Auth.js';
import Astronaut from '../assets/Group.png';
import "../styles/Login.css"


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await login({ email, password });

      if (response instanceof Error) {
        setError(response.message);
      } else {
        setSuccess('Login successful!');
        setError('');
        setEmail('');
        setPassword('');
        localStorage.setItem('token', response.data.token);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
      setSuccess('');
    }
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <div className="welcome">
          <div className="astronaut">
            <img src={Astronaut} alt="Astronaut" />
          </div>
          <h2>Welcome back</h2>
          <p>Let's get you logged in</p>
        </div>
      </div>
      <div className="right-section">
        <div className="form-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
          <p className="register-text">
            Don't have an account? <a href="/register">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
