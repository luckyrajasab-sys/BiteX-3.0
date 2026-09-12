import React, { useState } from 'react';

const Calculator = () => {
  const [formData, setFormData] = useState({
    age: 25,
    gender: 'male',
    height: 175,
    weight: 70,
    goal: 'maintain',
    activity: '1.2'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculate = () => {
    const w = parseFloat(formData.weight) || 0;
    const h = parseFloat(formData.height) || 0;
    const a = parseInt(formData.age) || 0;
    if (!w || !h || !a) return null;

    let bmr = 10 * w + 6.25 * h - 5 * a;
    bmr += formData.gender === 'male' ? 5 : -161;
    let tdee = bmr * parseFloat(formData.activity);
    
    if (formData.goal === 'lose') tdee -= 500;
    if (formData.goal === 'gain') tdee += 500;

    const bmi = (w / ((h / 100) * (h / 100))).toFixed(1);

    const protein = Math.round((tdee * 0.3) / 4);
    const carbs = Math.round((tdee * 0.4) / 4);
    const fat = Math.round((tdee * 0.3) / 9);

    return { bmr: Math.round(bmr), tdee: Math.round(tdee), bmi, protein, carbs, fat };
  };

  const results = calculate();

  return (
    <div style={{ padding: '140px 6% 90px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '40px' }}>Calorie Calculator</h1>
        <p style={{ color: 'var(--text-muted)' }}>Find your optimal daily targets for your specific goals.</p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
        <div className="glass" style={{ flex: '1 1 400px', padding: '30px', borderRadius: 'var(--radius-lg)' }}>
          <h3 style={{ marginBottom: '20px' }}>Your Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div className="input-box">
              <label style={{ display: 'block', marginBottom: '8px' }}>Age</label>
              <input type="number" name="age" value={formData.age} onChange={handleChange} />
            </div>
            <div className="input-box">
              <label style={{ display: 'block', marginBottom: '8px' }}>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} style={{ width: '100%', padding: '16px', borderRadius: '14px', background: 'var(--bg-alt)', border: '1px solid var(--surface-border)' }}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="input-box">
              <label style={{ display: 'block', marginBottom: '8px' }}>Height (cm)</label>
              <input type="number" name="height" value={formData.height} onChange={handleChange} />
            </div>
            <div className="input-box">
              <label style={{ display: 'block', marginBottom: '8px' }}>Weight (kg)</label>
              <input type="number" name="weight" value={formData.weight} onChange={handleChange} />
            </div>
          </div>
          <div className="input-box">
            <label style={{ display: 'block', marginBottom: '8px' }}>Activity Level</label>
            <select name="activity" value={formData.activity} onChange={handleChange} style={{ width: '100%', padding: '16px', borderRadius: '14px', background: 'var(--bg-alt)', border: '1px solid var(--surface-border)' }}>
              <option value="1.2">Sedentary (Little to no exercise)</option>
              <option value="1.375">Lightly Active (1-3 days/week)</option>
              <option value="1.55">Moderately Active (3-5 days/week)</option>
              <option value="1.725">Very Active (6-7 days/week)</option>
            </select>
          </div>
          <div className="input-box">
            <label style={{ display: 'block', marginBottom: '8px' }}>Goal</label>
            <select name="goal" value={formData.goal} onChange={handleChange} style={{ width: '100%', padding: '16px', borderRadius: '14px', background: 'var(--bg-alt)', border: '1px solid var(--surface-border)' }}>
              <option value="lose">Lose Weight</option>
              <option value="maintain">Maintain Weight</option>
              <option value="gain">Build Muscle / Gain Weight</option>
            </select>
          </div>
        </div>

        {results && (
          <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="glass" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', background: 'linear-gradient(135deg, var(--accent-2), var(--accent))', color: '#fff', textAlign: 'center' }}>
              <h4 style={{ opacity: 0.9, marginBottom: '10px' }}>Daily Calorie Target (TDEE)</h4>
              <div style={{ fontSize: '48px', fontWeight: '800', fontFamily: 'var(--font-display)' }}>{results.tdee} <span style={{ fontSize: '20px', fontWeight: '500' }}>kcal</span></div>
              <p style={{ opacity: 0.8, fontSize: '14px', marginTop: '10px' }}>Estimated maintenance BMR is {results.bmr} kcal. Your BMI is {results.bmi}.</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
              <div className="glass" style={{ padding: '20px', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--accent)' }}>{results.protein}g</div>
                <div style={{ fontSize: '13px', color: 'var(--bg)', marginTop: '5px' }}>Protein</div>
              </div>
              <div className="glass" style={{ padding: '20px', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--accent)' }}>{results.carbs}g</div>
                <div style={{ fontSize: '13px', color: 'var(--bg)', marginTop: '5px' }}>Carbs</div>
              </div>
              <div className="glass" style={{ padding: '20px', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--accent)' }}>{results.fat}g</div>
                <div style={{ fontSize: '13px', color: 'var(--bg)', marginTop: '5px' }}>Fat</div>
              </div>
            </div>

            <div className="glass" style={{ padding: '20px', borderRadius: 'var(--radius-md)', fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              <strong>Note:</strong> These calculations use the Mifflin-St Jeor equation and are estimates to help you plan your nutrition. They are not medical advice.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;
