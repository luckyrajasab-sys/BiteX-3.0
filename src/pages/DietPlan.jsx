import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { menuData } from '../data/menu';
import FoodCard from '../components/FoodCard';

const DietPlan = () => {
  const { userProfile, replaceWeeklyPlan } = useContext(AppContext);
  const [days, setDays] = useState(1);
  const [generatedPlan, setGeneratedPlan] = useState(null);

  const generatePlan = () => {
    // Generate a basic mock plan pulling from menuData based on TDEE (mocked logic for frontend)
    const target = userProfile?.tdee || 2000;
    
    // Simplistic assignment
    const bfastItems = menuData.filter(i => i.tags?.includes('High Protein') || i.calories < 400);
    const lunchItems = menuData.filter(i => i.calories > 400 && i.calories < 700);
    const dinnerItems = menuData.filter(i => i.calories < 600);
    const snackItems = menuData.filter(i => i.calories < 250);

    const randomPick = (arr) => arr[Math.floor(Math.random() * arr.length)] || menuData[0];

    const plan = {};
    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    for (let i = 0; i < days; i++) {
      const dayName = weekDays[i];
      plan[dayName] = {
        breakfast: [randomPick(bfastItems)],
        lunch: [randomPick(lunchItems)],
        snacks: [randomPick(snackItems), randomPick(snackItems)],
        dinner: [randomPick(dinnerItems)]
      };
    }
    setGeneratedPlan(plan);
  };

  const saveToPlanner = () => {
    if (generatedPlan) {
      // Merge into the default weekly structure
      const defaultWeeklyPlan = {
        Monday: { breakfast: [], lunch: [], snacks: [], dinner: [] },
        Tuesday: { breakfast: [], lunch: [], snacks: [], dinner: [] },
        Wednesday: { breakfast: [], lunch: [], snacks: [], dinner: [] },
        Thursday: { breakfast: [], lunch: [], snacks: [], dinner: [] },
        Friday: { breakfast: [], lunch: [], snacks: [], dinner: [] },
        Saturday: { breakfast: [], lunch: [], snacks: [], dinner: [] },
        Sunday: { breakfast: [], lunch: [], snacks: [], dinner: [] },
      };
      const merged = { ...defaultWeeklyPlan, ...generatedPlan };
      replaceWeeklyPlan(merged);
    }
  };

  return (
    <div style={{ padding: '140px 6% 90px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '40px' }}>AI Diet Plan Generator</h1>
        <p style={{ color: 'var(--text-muted)' }}>Get a personalized meal plan tailored to your target calories.</p>
      </div>

      {!userProfile && (
        <div className="glass" style={{ padding: '20px', textAlign: 'center', borderRadius: 'var(--radius-md)', marginBottom: '30px', color: 'var(--warning)', background: 'var(--bg-alt)' }}>
          Please complete your onboarding profile to get accurate TDEE-based recommendations.
        </div>
      )}

      <div className="glass" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Plan Duration</label>
          <select value={days} onChange={(e) => setDays(Number(e.target.value))} style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid var(--surface-border)', background: 'var(--bg-alt)' }}>
            <option value={1}>1-Day Plan</option>
            <option value={3}>3-Day Plan</option>
            <option value={7}>7-Day Plan</option>
          </select>
        </div>
        <button className="btn btn-primary" style={{ padding: '16px 30px', marginTop: '28px' }} onClick={generatePlan}>
          Generate Plan
        </button>
      </div>

      {generatedPlan && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>Your Custom Plan</h2>
            <button className="btn btn-secondary" onClick={saveToPlanner}>Save to Planner</button>
          </div>
          
          {Object.keys(generatedPlan).map(day => (
            <div key={day} className="glass" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', marginBottom: '30px' }}>
              <h3 style={{ fontSize: '24px', marginBottom: '20px', color: 'var(--accent)', borderBottom: '1px solid var(--surface-border)', paddingBottom: '10px' }}>{day}</h3>
              
              {['breakfast', 'lunch', 'snacks', 'dinner'].map(mealType => (
                <div key={mealType} style={{ marginBottom: '25px' }}>
                  <h4 style={{ textTransform: 'capitalize', marginBottom: '15px', color: 'var(--text-muted)' }}>{mealType}</h4>
                  <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                    {generatedPlan[day][mealType].map((item, idx) => (
                      <FoodCard key={`${item.id}-${idx}`} item={item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DietPlan;
