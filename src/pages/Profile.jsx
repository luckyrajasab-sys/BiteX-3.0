import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Profile = () => {
  const { userGoal, setUserGoal } = useContext(AppContext);

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
        
        <div style={{ marginTop: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-muted)' }}>Personal Goal</label>
          <select 
            value={userGoal} 
            onChange={(e) => setUserGoal(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '10px', 
              background: 'var(--bg)', 
              color: 'var(--text)', 
              border: '1px solid var(--surface-border)',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <option value="Lose Fat">Lose Fat</option>
            <option value="Build Muscle">Build Muscle</option>
            <option value="Maintain Weight">Maintain Weight</option>
            <option value="Eat Healthier">Eat Healthier</option>
          </select>
        </div>

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
