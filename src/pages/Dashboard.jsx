import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Flame, Award, Droplets, Target, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { userProfile, consumedFoods, waterGlasses, logWater, resetDashboard, calculateDailyMacros, streak, bitePoints } = useContext(AppContext);
  const macros = calculateDailyMacros();

  // Mock targets based on TDEE (or default 2000)
  const targetCals = userProfile?.tdee || 2000;
  const targetProtein = Math.round((targetCals * 0.3) / 4);
  const targetCarbs = Math.round((targetCals * 0.4) / 4);
  const targetFat = Math.round((targetCals * 0.3) / 9);

  const getPercent = (current, max) => Math.min((current / max) * 100, 100);

  const CircularProgress = ({ percent, color, icon, label, value, max }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className="hover-scale">
      <div style={{ position: 'relative', width: '120px', height: '120px', marginBottom: '15px' }}>
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="var(--surface-border)" strokeWidth="8" />
          <circle cx="60" cy="60" r="54" fill="none" stroke={color} strokeWidth="8" strokeDasharray="339.292" strokeDashoffset={339.292 - (339.292 * percent) / 100} strokeLinecap="round" transform="rotate(-90 60 60)" style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)' }} />
        </svg>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ color: color, marginBottom: '2px' }}>{icon}</div>
          <div style={{ fontSize: '18px', fontWeight: '800' }}>{Math.round(percent)}%</div>
        </div>
      </div>
      <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{label}</div>
      <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{value} / {max}</div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ padding: '120px 6% 90px', maxWidth: '1200px', margin: '0 auto' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '40px', margin: '0 0 5px' }}>
            Good morning, {userProfile?.name || 'Guest'}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', margin: 0 }}>Here is your daily nutrition summary.</p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <div className="glass hover-scale" style={{ padding: '12px 24px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '8px', borderRadius: '50%' }}>
              <Flame size={20} color="#F59E0B" />
            </div>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1 }}>Streak</div>
              <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{streak} Days</div>
            </div>
          </div>
          <div className="glass hover-scale" style={{ padding: '12px 24px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '8px', borderRadius: '50%' }}>
              <Award size={20} color="var(--success)" />
            </div>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1 }}>BitePoints</div>
              <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{bitePoints} BP</div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass" style={{ padding: '40px', borderRadius: 'var(--radius-lg)', marginBottom: '30px' }}>
        <h2 style={{ marginBottom: '40px', textAlign: 'center', fontFamily: 'var(--font-display)', fontSize: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <Activity color="var(--accent)" /> Today's Progress
        </h2>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '30px' }}>
          <CircularProgress percent={getPercent(macros.calories, targetCals)} color="var(--accent)" icon={<Target size={24}/>} label="Calories" value={macros.calories} max={`${targetCals} kcal`} />
          <CircularProgress percent={getPercent(macros.protein, targetProtein)} color="var(--info)" icon={<div style={{fontWeight: 'bold'}}>P</div>} label="Protein" value={macros.protein} max={`${targetProtein}g`} />
          <CircularProgress percent={getPercent(macros.carbs, targetCarbs)} color="var(--warning)" icon={<div style={{fontWeight: 'bold'}}>C</div>} label="Carbs" value={macros.carbs} max={`${targetCarbs}g`} />
          <CircularProgress percent={getPercent(waterGlasses, 8)} color="#38BDF8" icon={<Droplets size={24}/>} label="Water" value={waterGlasses} max={`8 gls`} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
        <div className="glass hover-scale" style={{ padding: '30px', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
              <Droplets color="#38BDF8" /> Water Tracker
            </h3>
            <button className="btn btn-secondary hover-scale" onClick={logWater} style={{ padding: '8px 16px', borderRadius: '100px' }}>+1 Glass</button>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {[...Array(8)].map((_, i) => (
              <div key={i} style={{ flex: 1, height: '48px', background: i < waterGlasses ? '#38BDF8' : 'var(--surface-border)', borderRadius: '8px', transition: '0.3s ease' }}></div>
            ))}
          </div>
        </div>

        <div className="glass hover-scale" style={{ padding: '30px', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
            <h3 style={{ margin: 0 }}>Meals Logged ({consumedFoods.length})</h3>
            <button className="btn btn-secondary hover-scale" onClick={resetDashboard} style={{ padding: '8px 16px', borderRadius: '100px' }}>End Day</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '200px', overflowY: 'auto', paddingRight: '5px' }}>
            {consumedFoods.map((food, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--bg)', borderRadius: '12px', border: '1px solid var(--surface-border)' }}>
                <span style={{ fontWeight: '600' }}>{food.name}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '500' }}>{food.calories} kcal</span>
              </div>
            ))}
            {consumedFoods.length === 0 && <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>No meals logged yet today.</p>}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
