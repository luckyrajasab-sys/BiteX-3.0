import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { userProfile, logout, bitePoints, streak } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!userProfile) return null;

  return (
    <div style={{ padding: '140px 6% 90px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '40px' }}>My Profile</h1>
      </div>

      <div className="glass" style={{ padding: '40px', borderRadius: 'var(--radius-lg)', textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', color: '#fff', fontSize: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          {userProfile.name.charAt(0).toUpperCase()}
        </div>
        <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>{userProfile.name}</h2>
        <p style={{ color: 'var(--text-muted)' }}>{userProfile.age} yrs • {userProfile.gender} • Goal: {userProfile.goal}</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '30px' }}>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{userProfile.tdee}</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Daily kcal</div>
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{streak}</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Day Streak</div>
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{bitePoints}</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>BitePoints</div>
          </div>
        </div>
      </div>

      <div className="glass" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '20px' }}>Personal Information</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Height</div>
            <div style={{ fontWeight: '500' }}>{userProfile.height} cm</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Weight</div>
            <div style={{ fontWeight: '500' }}>{userProfile.weight} kg</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Activity Level</div>
            <div style={{ fontWeight: '500' }}>{userProfile.activity} Multiplier</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Diet Preference</div>
            <div style={{ fontWeight: '500', textTransform: 'capitalize' }}>{userProfile.diet}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <button className="btn btn-secondary" onClick={() => navigate('/onboarding')} style={{ width: '100%' }}>Edit Profile Metrics</button>
        <button className="btn" style={{ width: '100%', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', border: 'none' }} onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
};

export default Profile;
