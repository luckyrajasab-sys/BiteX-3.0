import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { menuData } from '../data/menu';

const MealPlanner = () => {
  const { mealPlan, addFoodToMealPlan, removeFoodFromMealPlan } = useContext(AppContext);
  const [selectedMeal, setSelectedMeal] = useState('breakfast');
  const [selectedFoodId, setSelectedFoodId] = useState(menuData[0].id);

  const handleAdd = () => {
    const food = menuData.find(f => f.id === selectedFoodId);
    if (food) {
      addFoodToMealPlan(selectedMeal, food);
    }
  };

  const calculatePlanTotal = () => {
    let cal = 0, pro = 0;
    ['breakfast', 'lunch', 'snacks', 'dinner'].forEach(meal => {
      mealPlan[meal].forEach(item => {
        cal += item.calories || 0;
        pro += item.protein || 0;
      });
    });
    return { cal, pro };
  };

  const total = calculatePlanTotal();

  const renderMealSection = (mealType, title) => (
    <div className="dash-card" style={{ marginBottom: '20px' }}>
      <h3 style={{ marginBottom: '15px', textTransform: 'capitalize' }}>{title}</h3>
      {mealPlan[mealType].length === 0 ? (
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No foods added yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {mealPlan[mealType].map((item, idx) => (
            <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--surface-border)' }}>
              <div>
                <div>{item.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>🔥 {item.calories} kcal | 🥩 {item.protein}g</div>
              </div>
              <button className="btn-secondary" style={{ padding: '5px 10px', fontSize: '12px', height: 'fit-content' }} onClick={() => removeFoodFromMealPlan(mealType, idx)}>X</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div style={{ padding: '140px 6% 90px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '40px' }}>Meal Planner</h1>
        <p style={{ color: 'var(--text-muted)' }}>Plan your day. Hit your goals.</p>
      </div>

      <div className="glass" style={{ padding: '20px', borderRadius: 'var(--radius-md)', marginBottom: '30px', display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
        <select 
          value={selectedMeal} 
          onChange={(e) => setSelectedMeal(e.target.value)}
          style={{ padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--surface-border)', background: 'var(--bg-alt)', color: 'var(--text)' }}
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="snacks">Snacks</option>
          <option value="dinner">Dinner</option>
        </select>

        <select 
          value={selectedFoodId} 
          onChange={(e) => setSelectedFoodId(e.target.value)}
          style={{ padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--surface-border)', background: 'var(--bg-alt)', color: 'var(--text)', flex: 1 }}
        >
          {menuData.map(item => (
            <option key={item.id} value={item.id}>{item.name} ({item.calories} kcal)</option>
          ))}
        </select>

        <button className="btn btn-primary" onClick={handleAdd}>Add to Plan</button>
      </div>

      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <h3 style={{ color: 'var(--accent)' }}>Daily Planned: {total.cal} kcal | {total.pro}g Protein</h3>
      </div>

      <div className="dashboard-grid" style={{ marginTop: '0' }}>
        {renderMealSection('breakfast', 'Breakfast 🍳')}
        {renderMealSection('lunch', 'Lunch 🍱')}
        {renderMealSection('snacks', 'Snacks 🍎')}
        {renderMealSection('dinner', 'Dinner 🥗')}
      </div>
    </div>
  );
};

export default MealPlanner;
