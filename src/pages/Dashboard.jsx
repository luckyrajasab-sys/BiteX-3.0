import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: '120px', height: '120px', marginBottom: '10px' }}>
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="var(--surface-border)" strokeWidth="8" />
          <circle cx="60" cy="60" r="54" fill="none" stroke={color} strokeWidth="8" strokeDasharray="339.292" strokeDashoffset={339.292 - (339.292 * percent) / 100} strokeLinecap="round" transform="rotate(-90 60 60)" style={{ transition: 'stroke-dashoffset 1s ease-out' }} />
        </svg>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: '24px' }}>{icon}</div>
          <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{Math.round(percent)}%</div>
        </div>
      </div>
      <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{label}</div>
      <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{value} / {max}</div>
    </div>
  );

  return (
    <div style={{ padding: '140px 6% 90px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '36px' }}>
            Good morning, {userProfile?.name || 'Guest'}
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>Here is your daily nutrition summary.</p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <div className="glass" style={{ padding: '10px 20px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>🔥</span>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Streak</div>
              <div style={{ fontWeight: 'bold' }}>{streak} Days</div>
            </div>
          </div>
          <div className="glass" style={{ padding: '10px 20px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>🏅</span>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>BitePoints</div>
              <div style={{ fontWeight: 'bold' }}>{bitePoints} BP</div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass" style={{ padding: '40px', borderRadius: 'var(--radius-lg)', marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '30px', textAlign: 'center' }}>Today's Progress</h2>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '30px' }}>
          <CircularProgress percent={getPercent(macros.calories, targetCals)} color="var(--accent)" icon="⚡" label="Calories" value={macros.calories} max={`${targetCals} kcal`} />
          <CircularProgress percent={getPercent(macros.protein, targetProtein)} color="var(--info)" icon="🥩" label="Protein" value={macros.protein} max={`${targetProtein}g`} />
          <CircularProgress percent={getPercent(macros.carbs, targetCarbs)} color="var(--warning)" icon="🍞" label="Carbs" value={macros.carbs} max={`${targetCarbs}g`} />
          <CircularProgress percent={getPercent(waterGlasses, 8)} color="#38BDF8" icon="💧" label="Water" value={waterGlasses} max={`8 gls`} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
        <div className="glass" style={{ padding: '30px', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3>Water Tracker</h3>
            <button className="btn btn-secondary" onClick={logWater} style={{ padding: '8px 16px' }}>+1 Glass</button>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {[...Array(8)].map((_, i) => (
              <div key={i} style={{ flex: 1, height: '40px', background: i < waterGlasses ? '#38BDF8' : 'var(--surface-border)', borderRadius: '8px', transition: '0.3s' }}></div>
            ))}
          </div>
        </div>

        <div className="glass" style={{ padding: '30px', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3>Meals Logged ({consumedFoods.length})</h3>
            <button className="btn btn-secondary" onClick={resetDashboard} style={{ padding: '8px 16px' }}>End Day</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxHeight: '200px', overflowY: 'auto' }}>
            {consumedFoods.map((food, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: 'var(--bg-alt)', borderRadius: '10px' }}>
                <span style={{ fontWeight: '500' }}>{food.name}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{food.calories} kcal</span>
              </div>
            ))}
            {consumedFoods.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No meals logged yet today.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
