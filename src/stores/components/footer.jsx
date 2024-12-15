import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Footer Logo and Description */}
        <div className="footer-logo-section">
          <h2>E-zone</h2>
          <p>Get to Know Us About e-zone CareersPress Releases</p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Email: ezone@gmail.com</p>
          <p>Phone: +91 12345 67890</p>
          <div className="footer-social-icons">
            <a href="https://facebook.com"><img src="assests/foot/facebook.png" alt="Facebook" /></a>
            <a href="https://instagram.com"><img src="assests/foot/instagram.png" alt="Instagram" /></a>
            <a href="https://twitter.com"><img src="assests/foot/twitter.png" alt="Twitter" /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 E-zone. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;