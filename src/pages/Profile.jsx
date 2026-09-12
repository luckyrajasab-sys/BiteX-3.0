import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div className="cart-container" style={{ padding: '140px 6% 90px' }}>
      <div className="cart-items glass">
        <h2>Your Profile</h2>
        <br />
        <div className="profile-details">
          <div className="summary-row">
            <span>Name</span>
            <span>John Doe</span>
          </div>
          <div className="summary-row">
            <span>Email</span>
            <span>john.doe@example.com</span>
          </div>
          <div className="summary-row">
            <span>Phone</span>
            <span>+91 98765 43210</span>
          </div>
        </div>
        <br />
        <Link to="/orders">
          <button className="btn btn-secondary" style={{ marginRight: '10px' }}>View Orders</button>
        </Link>
        <Link to="/favorites">
          <button className="btn btn-secondary">View Favorites</button>
        </Link>
      </div>

      <div className="summary glass">
        <h2>Settings</h2>
        <div className="summary-row" style={{ marginTop: '20px' }}>
          <span>Notifications</span>
          <span>Enabled</span>
        </div>
        <div className="summary-row">
          <span>Dark Mode</span>
          <span>System Default</span>
        </div>
        <hr style={{ borderColor: 'var(--surface-border)', margin: '15px 0' }} />
        <Link to="/login">
          <button className="btn btn-dark" style={{ width: '100%' }}>Logout</button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
