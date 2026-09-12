import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const { cart } = useContext(AppContext);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <svg className="logo-mark" width="32" height="32" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="17" cy="17" r="15" fill="url(#biteGrad)"/>
          <circle cx="25" cy="9" r="7.5" fill="#181220"/>
          <path d="M24 5 L25.6 8 L28.8 6.4 L27 9.4 L30 10.6 L26.6 11.4 L27 14.6 L24.7 12.2 L22.3 14.6 L22.7 11.4 L19.4 10.6 L22.4 9.4 L20.6 6.4 Z" fill="#FF3D57"/>
          <defs>
            <linearGradient id="biteGrad" x1="2" y1="2" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFB648"/>
              <stop offset="1" stopColor="#FF5A36"/>
            </linearGradient>
          </defs>
        </svg>
        <span>Bite<span className="accent-x">X</span></span>
        <span className="version-pill">3.0</span>
      </Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/restaurants">Restaurants</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/cart">Cart <span className="cart-badge" style={{ display: cart.length > 0 ? 'inline-flex' : 'none' }}>{cart.length}</span></Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;
