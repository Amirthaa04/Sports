import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-top-content">
          <a href="#top" className="footer-top-link">Back to top</a>
        </div>
      </div>
      <div className="footer-main">
        <div className="footer-column">
          <h3>Get to Know Us</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/press">Press Releases</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Connect with Us</h3>
          <ul>
            <li><a href="https://www.facebook.com">Facebook</a></li>
            <li><a href="https://www.twitter.com">Twitter</a></li>
            <li><a href="https://www.instagram.com">Instagram</a></li>
            <li><a href="https://www.linkedin.com">LinkedIn</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Make Money with Us</h3>
          <ul>
            <li><a href="/sell">Sell on Our Platform</a></li>
            <li><a href="/affiliate">Become an Affiliate</a></li>
            <li><a href="/advertise">Advertise Your Products</a></li>
            <li><a href="/business">Business Accounts</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Let Us Help You</h3>
          <ul>
            <li><a href="/help">Help Center</a></li>
            <li><a href="/returns">Returns</a></li>
            <li><a href="/shipping">Shipping Rates & Policies</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-logo">
          <img src="./images/logo.jpg" alt="Logo" />
        </div>
        <div className="footer-bottom-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
