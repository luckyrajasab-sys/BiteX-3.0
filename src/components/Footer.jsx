import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div>© 2026 BiteX. All rights reserved.</div>
      <div className="footer-links">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/orders">Orders</Link>
      </div>
    </footer>
  );
};

export default Footer;
