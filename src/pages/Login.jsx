import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="auth-container">
      <div className="auth-box glass">
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
          <svg className="logo-mark" width="40" height="40" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        </Link>
        <h2>Welcome back</h2>
        <p>Enter your details to sign in to your account.</p>

        <form onSubmit={handleLogin}>
          <div className="input-box">
            <input type="email" placeholder="Email Address" required />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required />
          </div>
          <button type="submit" className="btn btn-primary auth-btn">Sign In</button>
        </form>

        <p style={{ marginTop: '25px', textAlign: 'center', fontSize: '14px' }}>
          Don't have an account? <Link to="/signup" style={{ color: 'var(--accent)', fontWeight: '600' }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
