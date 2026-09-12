import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const { cart } = useContext(AppContext);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <div className="navbar-wrapper">
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="logo">
          <svg className="logo-mark" width="32" height="32" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 2L30 9.5V24.5L17 32L4 24.5V9.5L17 2Z" fill="url(#hexGrad)" />
            <path d="M17 7C17 7 24 10 24 17C24 24 17 27 17 27C17 27 10 24 10 17C10 10 17 7 17 7Z" fill="#FFFFFF" opacity="0.9"/>
            <path d="M17 12V27" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/>
            <defs>
              <linearGradient id="hexGrad" x1="4" y1="2" x2="30" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#10B981"/>
                <stop offset="1" stopColor="#059669"/>
              </linearGradient>
            </defs>
          </svg>
          <span style={{ color: 'var(--text)' }}>Bite<span className="accent-x">X</span></span>
        </Link>

        {/* Desktop Links */}
        <div className="nav-links desktop-nav">
          <Link to="/">Home</Link>
          <Link to="/explore">Explore</Link>
          <Link to="/calculator">Calculator</Link>
          <Link to="/diet-plan">Diet Plans</Link>
          <Link to="/meal-planner">Planner</Link>
          <Link to="/dashboard">Nutrition</Link>
          <Link to="/rewards">Rewards</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/cart" style={{ display: 'flex', alignItems: 'center' }}>
            Cart
            {cart.length > 0 && <span className="cart-badge" style={{ display: 'inline-flex' }}>{cart.length}</span>}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: 'var(--text)' }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="mobile-nav glass" style={{
            position: 'absolute', top: '100%', left: '0', width: '100%',
            padding: '20px', borderRadius: '20px', marginTop: '10px',
            display: 'flex', flexDirection: 'column', gap: '15px'
          }}>
            <Link to="/">Home</Link>
            <Link to="/explore">Explore</Link>
            <Link to="/calculator">Calculator</Link>
            <Link to="/diet-plan">Diet Plans</Link>
            <Link to="/meal-planner">Planner</Link>
            <Link to="/dashboard">Nutrition</Link>
            <Link to="/rewards">Rewards</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/cart">Cart {cart.length > 0 && `(${cart.length})`}</Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
