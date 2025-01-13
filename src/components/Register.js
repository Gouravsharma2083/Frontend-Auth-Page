import React, { useState } from "react";
import { register } from "../services/Auth.js";
import "../styles/Register.css"
import Astronaut from "../assets/Group.png";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password confirmation check
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await register({ name, email, password });

      if (response instanceof Error) {
        setError(response.message);
      } else {
        setSuccess(response.data.message); // Display success message
        setError(""); // Clear error
        setName(""); // Reset form fields
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Registration failed.";
      setError(errorMessage); // Display error
      setSuccess(""); // Clear success message
    }
  };

  return (
    <div className="register-container">
      <div className="left-section">
        <div className="welcome">
          <div className="astronaut">
            <img src={Astronaut} alt="Astronaut" />
          </div>
          <h2>Welcome aboard my friend</h2>
          <p>Just a couple of clicks and we start</p>
        </div>
      </div>
      <div className="right-section">
        <div className="form-container">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <div className="input-group">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
            <div className="input-group">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="register-btn">
              Register
            </button>
          </form>
          <p className="login-text">
            Have an account? <a href="/login">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
