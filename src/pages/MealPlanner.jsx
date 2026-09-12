import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const MealPlanner = () => {
  const { weeklyPlan, removeFoodFromWeeklyPlan, calculateDailyMacros } = useContext(AppContext);
  const [activeDay, setActiveDay] = useState('Monday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealTypes = ['breakfast', 'lunch', 'snacks', 'dinner'];

  const currentPlan = weeklyPlan[activeDay];

  const getDayTotalCals = () => {
    let total = 0;
    mealTypes.forEach(type => {
      currentPlan[type].forEach(item => total += item.calories);
    });
    return total;
  };

  return (
    <div style={{ padding: '140px 6% 90px', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '40px' }}>Weekly Meal Planner</h1>
        <p style={{ color: 'var(--text-muted)' }}>Plan your week, hit your macros, and generate your grocery list.</p>
      </div>

      {/* Day Selector */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '15px', marginBottom: '30px' }}>
        {days.map(day => (
          <button 
            key={day}
            className={`btn ${activeDay === day ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '10px 20px', borderRadius: '30px', flexShrink: 0 }}
            onClick={() => setActiveDay(day)}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="glass" style={{ padding: '20px', borderRadius: 'var(--radius-lg)', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--accent-soft)', color: 'var(--accent-2)' }}>
        <h3 style={{ margin: 0 }}>{activeDay}'s Target</h3>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--accent)' }}>{getDayTotalCals()} kcal</div>
      </div>

      <div className="planner-grid" style={{ display: 'grid', gap: '30px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {mealTypes.map((type) => (
          <div key={type} className="meal-section glass" style={{ padding: '25px', borderRadius: 'var(--radius-lg)' }}>
            <h3 style={{ textTransform: 'capitalize', marginBottom: '15px', borderBottom: '1px solid var(--surface-border)', paddingBottom: '10px' }}>
              {type}
            </h3>
            
            {currentPlan[type].length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-faint)', background: 'var(--bg-alt)', borderRadius: 'var(--radius-md)', fontSize: '14px' }}>
                No meals added yet.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {currentPlan[type].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'var(--bg-alt)', padding: '15px', borderRadius: '12px' }}>
                    <img src={item.img} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '10px' }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '15px', marginBottom: '4px' }}>{item.name}</h4>
                      <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{item.calories} kcal · {item.protein}g P</p>
                    </div>
                    <button 
                      onClick={() => removeFoodFromWeeklyPlan(activeDay, type, idx)}
                      style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', transition: '0.2s' }}
                    >✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealPlanner;
