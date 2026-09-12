import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Dashboard = () => {
  const { consumedFoods, waterGlasses, setWaterGlasses, resetDashboard, calculateDailyMacros, userGoal } = useContext(AppContext);
  const macros = calculateDailyMacros();

  // Basic recommended daily targets (can be personalized further later)
  const targets = {
    calories: userGoal === 'Lose Fat' ? 1800 : userGoal === 'Build Muscle' ? 2800 : 2200,
    protein: userGoal === 'Build Muscle' ? 150 : 70,
    carbs: 250,
    fat: 70,
    fibre: 30
  };

  const getProgress = (current, target) => Math.min((current / target) * 100, 100);

  return (
    <div style={{ padding: '140px 6% 90px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '40px' }}>Nutrition Dashboard</h1>
        <p style={{ color: 'var(--text-muted)' }}>Goal: <strong>{userGoal}</strong></p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <button className="btn btn-secondary" onClick={resetDashboard}>Reset Day</button>
      </div>

      <div className="dashboard-grid">
        <div className="dash-card">
          <div className="dash-header">Calories 🔥</div>
          <div className="dash-stat">{macros.calories} <span style={{ fontSize: '16px', color: 'var(--text-muted)' }}>/ {targets.calories} kcal</span></div>
          <div style={{ width: '100%', height: '8px', background: 'var(--surface)', borderRadius: '4px', marginTop: '15px' }}>
            <div style={{ width: `${getProgress(macros.calories, targets.calories)}%`, height: '100%', background: 'var(--accent)', borderRadius: '4px' }}></div>
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-header">Protein 🥩</div>
          <div className="dash-stat" style={{ color: 'var(--macro-protein)' }}>{macros.protein} <span style={{ fontSize: '16px', color: 'var(--text-muted)' }}>/ {targets.protein} g</span></div>
          <div style={{ width: '100%', height: '8px', background: 'var(--surface)', borderRadius: '4px', marginTop: '15px' }}>
            <div style={{ width: `${getProgress(macros.protein, targets.protein)}%`, height: '100%', background: 'var(--macro-protein)', borderRadius: '4px' }}></div>
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-header">Carbs 🍞</div>
          <div className="dash-stat" style={{ color: 'var(--macro-carbs)' }}>{macros.carbs} <span style={{ fontSize: '16px', color: 'var(--text-muted)' }}>/ {targets.carbs} g</span></div>
          <div style={{ width: '100%', height: '8px', background: 'var(--surface)', borderRadius: '4px', marginTop: '15px' }}>
            <div style={{ width: `${getProgress(macros.carbs, targets.carbs)}%`, height: '100%', background: 'var(--macro-carbs)', borderRadius: '4px' }}></div>
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-header">Fat 🥑</div>
          <div className="dash-stat" style={{ color: 'var(--macro-fat)' }}>{macros.fat} <span style={{ fontSize: '16px', color: 'var(--text-muted)' }}>/ {targets.fat} g</span></div>
          <div style={{ width: '100%', height: '8px', background: 'var(--surface)', borderRadius: '4px', marginTop: '15px' }}>
            <div style={{ width: `${getProgress(macros.fat, targets.fat)}%`, height: '100%', background: 'var(--macro-fat)', borderRadius: '4px' }}></div>
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-header">Fibre 🥦</div>
          <div className="dash-stat" style={{ color: 'var(--macro-fibre)' }}>{macros.fibre} <span style={{ fontSize: '16px', color: 'var(--text-muted)' }}>/ {targets.fibre} g</span></div>
          <div style={{ width: '100%', height: '8px', background: 'var(--surface)', borderRadius: '4px', marginTop: '15px' }}>
            <div style={{ width: `${getProgress(macros.fibre, targets.fibre)}%`, height: '100%', background: 'var(--macro-fibre)', borderRadius: '4px' }}></div>
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-header">Water 💧</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button className="btn btn-secondary" onClick={() => setWaterGlasses(Math.max(0, waterGlasses - 1))}>-</button>
            <div className="dash-stat" style={{ color: 'var(--accent-2)' }}>{waterGlasses} <span style={{ fontSize: '16px', color: 'var(--text-muted)' }}>/ 8 glasses</span></div>
            <button className="btn btn-secondary" onClick={() => setWaterGlasses(waterGlasses + 1)}>+</button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '50px' }}>
        <h2>Foods Logged Today</h2>
        {consumedFoods.length > 0 ? (
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {consumedFoods.map((food, idx) => (
              <div key={idx} className="glass" style={{ padding: '15px', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between' }}>
                <span>{food.name}</span>
                <span style={{ color: 'var(--accent)' }}>🔥 {food.calories} kcal</span>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--text-muted)', marginTop: '20px' }}>No foods logged yet. Go to Explore or Menu to add foods!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
