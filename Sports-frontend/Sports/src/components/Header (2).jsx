import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check if the user is signed in
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const lowerCaseTerm = searchTerm.toLowerCase();
    if (lowerCaseTerm === 'men') {
      navigate('/men');
    } else if (lowerCaseTerm === 'women') {
      navigate('/women');
    } else if (lowerCaseTerm === 'kids') {
      navigate('/kid');
    } else if (lowerCaseTerm === 'sports') {
      navigate('/sport');
    } else {
      alert('No matching page found.');
    }
  };

  const handleLogout = () => {
    // Clear username from local storage and state
    localStorage.removeItem('username');
    setUsername('');
    // Redirect to home or sign-in page
    navigate('/');
  };

  return (
    <div>
      <div className="Header">
        <img src="./images/logo.jpg" width="90px" height="90px" alt="Logo" />
        <form onSubmit={handleSearchSubmit}>
          <input 
            type="text" 
            name="Search" 
            placeholder="Search" 
            value={searchTerm}
            onChange={handleSearchChange} 
          />
          <button type="submit">Search</button>
        </form>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          {username ? (
            <React.Fragment>
              <li>
                Hello, {username}
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li>
                <Link to="/signin">Sign-in</Link>
              </li>
              {/* <li>
                <Link to="/register">Register</Link>
              </li> */}
            </React.Fragment>
          )}
          <li>
            <Link to="/shopping">
              <FontAwesomeIcon icon={faShoppingCart} size="lg" /><span>Cart</span>
            </Link>
            
          </li>
        </ul>
      </div>
      <div className="List">
        <ul>
          <li>
            <a href="#">Sportopia Fashion</a>
          </li>
          <li>
            <a href="/men">Men</a>
          </li>
          <li>
            <a href="/women">Women</a>
          </li>
          <li>
            <a href="/kid">Kids</a>
          </li>
          <li>
            <a href="/sport">Sports Equipment</a>
          </li>
          <li>
            <a href="#">30 Day Returns Restriction Apply</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;