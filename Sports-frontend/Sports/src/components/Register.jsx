import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [register, setRegister] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = e => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('https://sports-kya6.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(register)
      });
      if (response.ok) {
        alert("User registered!!");
        setRegister({
          username: '',
          email: '',
          password: ''
        });
        window.location = "/signin";
      } else {
        alert("Error occurred. Failed to Register!");
      }
    } catch (error) {
      console.error('Error adding User:', error);
      alert('Error. Please try again later.');
    }
  }

  return (
    <div className="centered-container">
      <div className="registration-container">
        <div className="logo-container">
          <img src="./images/logo.jpg" alt="Logo" width="90px" height="90px" />
        </div>
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={register.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={register.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={register.password}
              onChange={handleChange}
              required
            />
            <small>Passwords must be at least 6 characters.</small>
          </div>
          <button type="submit" className="register-button">Register</button>
        </form>
        <div className="extra-info">
          <p>Already have an account? <Link to="/signin">Sign in</Link></p>
          <p>By creating an account or logging in, you agree to Sportopia's <a href="#">Conditions of Use</a> and <a href="#">Privacy Policy</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default Register;

