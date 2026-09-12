import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { menuData } from '../data/menu';
import FoodCard from '../components/FoodCard';
import { Sparkles, Calendar, Save } from 'lucide-react';
import { motion } from 'framer-motion';

const DietPlan = () => {
  const { userProfile, replaceWeeklyPlan } = useContext(AppContext);
  const [days, setDays] = useState(1);
  const [generatedPlan, setGeneratedPlan] = useState(null);

  const generatePlan = () => {
    // Generate a basic mock plan pulling from menuData based on TDEE
    const target = userProfile?.tdee || 2000;
    
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
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
      style={{ padding: '120px 6% 90px', maxWidth: '1200px', margin: '0 auto' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '16px', borderRadius: '50%' }}>
            <Sparkles size={40} color="var(--accent)" />
          </div>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '48px', margin: '0 0 10px' }}>AI Diet Plan Generator</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '18px' }}>Get a personalized meal plan tailored to your target macros and calories.</p>
      </div>

      {!userProfile && (
        <div className="glass" style={{ padding: '20px', textAlign: 'center', borderRadius: 'var(--radius-md)', marginBottom: '30px', color: 'var(--warning)', background: 'var(--bg-alt)' }}>
          Please complete your onboarding profile to get accurate TDEE-based recommendations.
        </div>
      )}

      <div className="glass hover-scale" style={{ padding: '30px 40px', borderRadius: 'var(--radius-lg)', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '50px' }}>
        <div style={{ flex: 1, minWidth: '250px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontWeight: 'bold' }}>
            <Calendar size={18} color="var(--text-muted)" /> Plan Duration
          </label>
          <select value={days} onChange={(e) => setDays(Number(e.target.value))} style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid var(--surface-border)', background: 'var(--bg-alt)', outline: 'none' }}>
            <option value={1}>1-Day Power Plan</option>
            <option value={3}>3-Day Kickstart Plan</option>
            <option value={7}>7-Day Complete Plan</option>
          </select>
        </div>
        <button className="btn btn-primary hover-scale" style={{ padding: '16px 40px', marginTop: '30px', borderRadius: '100px' }} onClick={generatePlan}>
          Generate Plan
        </button>
      </div>

      {generatedPlan && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', margin: 0 }}>Your Custom Plan</h2>
            <button className="btn btn-secondary hover-scale" onClick={saveToPlanner} style={{ display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '100px', padding: '10px 20px' }}>
              <Save size={18} /> Save to Planner
            </button>
          </div>
          
          {Object.keys(generatedPlan).map((day, dIdx) => (
            <motion.div 
              key={day} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: dIdx * 0.1 }}
              className="glass" 
              style={{ padding: '40px', borderRadius: 'var(--radius-lg)', marginBottom: '40px' }}
            >
              <h3 style={{ fontSize: '28px', margin: '0 0 30px', color: 'var(--accent)', borderBottom: '2px solid var(--surface-border)', paddingBottom: '15px' }}>{day}</h3>
              
              {['breakfast', 'lunch', 'snacks', 'dinner'].map((mealType, mIdx) => (
                <div key={mealType} style={{ marginBottom: '35px' }}>
                  <h4 style={{ textTransform: 'capitalize', margin: '0 0 20px', color: 'var(--text-muted)', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--surface-border)' }} />
                    {mealType}
                  </h4>
                  <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                    {generatedPlan[day][mealType].map((item, idx) => (
                      <FoodCard key={`${item.id}-${idx}`} item={item} />
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default DietPlan;
