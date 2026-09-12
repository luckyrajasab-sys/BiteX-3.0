import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { rewardsData } from '../data/rewards';
import { Gift, Lock, Unlock, Zap, Trophy, Star, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Rewards = () => {
  const { bitePoints, setBitePoints, showToast } = useContext(AppContext);

  const getLevel = (pts) => {
    if (pts >= 5000) return { title: "BiteX Champion", icon: <Trophy color="#FBBF24" /> };
    if (pts >= 2500) return { title: "Wellness Master", icon: <Shield color="#34D399" /> };
    if (pts >= 1000) return { title: "Nutrition Pro", icon: <Zap color="#60A5FA" /> };
    if (pts >= 500) return { title: "Healthy Explorer", icon: <Star color="#A78BFA" /> };
    return { title: "Starter", icon: <Star color="#9CA3AF" /> };
  };

  const handleRedeem = (reward) => {
    if (bitePoints >= reward.cost) {
      setBitePoints(prev => prev - reward.cost);
      showToast(`Successfully redeemed ${reward.title}!`, 'success');
    } else {
      showToast(`You need ${reward.cost - bitePoints} more points for this.`, 'warning');
    }
  };

  const currentLevel = getLevel(bitePoints);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
      style={{ padding: '120px 6% 90px', maxWidth: '1200px', margin: '0 auto' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '16px', borderRadius: '50%' }}>
            <Gift size={40} color="#F59E0B" />
          </div>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '48px', margin: '0 0 10px' }}>Rewards Center</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '18px' }}>Earn BitePoints for healthy choices and unlock exclusive perks.</p>
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
        className="glass" 
        style={{ padding: '50px', borderRadius: 'var(--radius-lg)', textAlign: 'center', marginBottom: '50px', background: 'linear-gradient(135deg, var(--accent-2), var(--accent))', color: '#fff', position: 'relative', overflow: 'hidden' }}
      >
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h3 style={{ opacity: 0.9, fontSize: '18px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Your Balance</h3>
          <div style={{ fontSize: '72px', fontWeight: '800', fontFamily: 'var(--font-display)', lineHeight: 1 }}>
            {bitePoints} <span style={{ fontSize: '24px', fontWeight: '500', opacity: 0.8 }}>BP</span>
          </div>
          <div style={{ marginTop: '20px', fontSize: '18px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'rgba(255,255,255,0.2)', padding: '10px 24px', borderRadius: '100px', display: 'inline-flex' }}>
            {currentLevel.icon} Current Level: {currentLevel.title}
          </div>
        </div>
        {/* Decorative background circles */}
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '-20px', width: '150px', height: '150px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />
      </motion.div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', margin: 0, fontSize: '32px' }}>Available Rewards</h2>
      </div>
      
      <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
        {rewardsData.map((reward, idx) => {
          const isUnlocked = bitePoints >= reward.cost;
          return (
            <motion.div 
              key={reward.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`card glass ${isUnlocked ? 'hover-scale' : ''}`} 
              style={{ display: 'flex', flexDirection: 'column', height: '100%', opacity: isUnlocked ? 1 : 0.7, padding: '30px', position: 'relative' }}
            >
              {!isUnlocked && (
                <div style={{ position: 'absolute', top: '15px', right: '15px', color: 'var(--text-faint)' }}>
                  <Lock size={20} />
                </div>
              )}
              {isUnlocked && (
                <div style={{ position: 'absolute', top: '15px', right: '15px', color: 'var(--accent)' }}>
                  <Unlock size={20} />
                </div>
              )}
              
              <div style={{ fontSize: '50px', marginBottom: '20px' }}>{reward.icon}</div>
              <h3 style={{ fontSize: '22px', margin: '0 0 10px', lineHeight: '1.3' }}>{reward.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px', flex: 1, margin: '0 0 25px', lineHeight: '1.5' }}>{reward.desc}</p>
              
              <button 
                className={`btn ${isUnlocked ? 'btn-primary hover-scale' : 'btn-secondary'}`} 
                style={{ 
                  width: '100%', 
                  padding: '14px',
                  borderRadius: '100px',
                  background: isUnlocked ? '' : 'var(--surface-border)', 
                  color: isUnlocked ? '' : 'var(--text-muted)',
                  border: 'none',
                  display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px',
                  cursor: isUnlocked ? 'pointer' : 'not-allowed'
                }}
                onClick={() => isUnlocked && handleRedeem(reward)}
                disabled={!isUnlocked}
              >
                {isUnlocked ? `Redeem • ${reward.cost} BP` : `Locked • ${reward.cost} BP`}
              </button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Rewards;
