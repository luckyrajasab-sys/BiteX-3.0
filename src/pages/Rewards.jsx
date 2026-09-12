import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { rewardsData } from '../data/rewards';

const Rewards = () => {
  const { bitePoints, setBitePoints, showToast } = useContext(AppContext);

  const getLevel = (pts) => {
    if (pts >= 5000) return "BiteX Champion 🏆";
    if (pts >= 2500) return "Wellness Master 🌟";
    if (pts >= 1000) return "Nutrition Pro ⚡";
    if (pts >= 500) return "Healthy Explorer 🧭";
    return "Starter 🌱";
  };

  const handleRedeem = (reward) => {
    if (bitePoints >= reward.cost) {
      setBitePoints(prev => prev - reward.cost);
      showToast(`Successfully redeemed ${reward.title}!`, 'success');
    } else {
      showToast(`You need ${reward.cost - bitePoints} more points for this.`, 'warning');
    }
  };

  return (
    <div style={{ padding: '140px 6% 90px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '40px' }}>Rewards Center</h1>
        <p style={{ color: 'var(--text-muted)' }}>Earn BitePoints for healthy choices and redeem them here.</p>
      </div>

      <div className="glass" style={{ padding: '40px', borderRadius: 'var(--radius-lg)', textAlign: 'center', marginBottom: '40px', background: 'linear-gradient(135deg, var(--accent-2), var(--accent))', color: '#fff' }}>
        <h3 style={{ opacity: 0.9 }}>Your Balance</h3>
        <div style={{ fontSize: '64px', fontWeight: '800', fontFamily: 'var(--font-display)' }}>
          {bitePoints} <span style={{ fontSize: '24px', fontWeight: '500' }}>BP</span>
        </div>
        <div style={{ marginTop: '10px', fontSize: '18px', fontWeight: '600' }}>
          Current Level: {getLevel(bitePoints)}
        </div>
      </div>

      <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '20px' }}>Available Rewards</h2>
      
      <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {rewardsData.map(reward => (
          <div key={reward.id} className="card glass" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ fontSize: '50px', marginBottom: '15px' }}>{reward.icon}</div>
            <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{reward.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', flex: 1, marginBottom: '20px' }}>{reward.desc}</p>
            <button 
              className="btn btn-primary" 
              style={{ width: '100%', background: bitePoints >= reward.cost ? '' : 'var(--surface-strong)', color: bitePoints >= reward.cost ? '' : 'var(--text-muted)', boxShadow: 'none' }}
              onClick={() => handleRedeem(reward)}
            >
              {bitePoints >= reward.cost ? `Redeem • ${reward.cost} BP` : `Locked • ${reward.cost} BP`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rewards;
