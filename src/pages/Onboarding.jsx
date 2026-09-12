import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Onboarding = () => {
  const { completeOnboarding } = useContext(AppContext);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'male',
    height: '',
    weight: '',
    goal: 'maintain',
    activity: '1.2',
    diet: 'any'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateTDEE = () => {
    let bmr = 10 * parseFloat(formData.weight) + 6.25 * parseFloat(formData.height) - 5 * parseInt(formData.age);
    bmr += formData.gender === 'male' ? 5 : -161;
    let tdee = bmr * parseFloat(formData.activity);
    
    if (formData.goal === 'lose') tdee -= 500;
    if (formData.goal === 'gain') tdee += 500;
    
    return Math.round(tdee);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      const tdee = calculateTDEE();
      completeOnboarding({ ...formData, tdee });
      navigate('/dashboard');
    }
  };

  return (
    <div className="auth-container" style={{ minHeight: '100vh', paddingTop: '100px' }}>
      <div className="auth-box glass" style={{ maxWidth: '500px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Welcome to BiteX</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '30px' }}>
          Step {step} of 3: Let's personalize your experience.
        </p>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="animate-fade-in">
              <div className="input-box">
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text)' }}>What should we call you?</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your Name" />
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div className="input-box" style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text)' }}>Age</label>
                  <input type="number" name="age" value={formData.age} onChange={handleChange} required placeholder="25" />
                </div>
                <div className="input-box" style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text)' }}>Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} style={{ width: '100%', padding: '16px', borderRadius: '14px', background: 'var(--bg-alt)', border: '1px solid var(--surface-border)', color: 'var(--text)' }}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <div style={{ display: 'flex', gap: '15px' }}>
                <div className="input-box" style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text)' }}>Height (cm)</label>
                  <input type="number" name="height" value={formData.height} onChange={handleChange} required placeholder="175" />
                </div>
                <div className="input-box" style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text)' }}>Weight (kg)</label>
                  <input type="number" name="weight" value={formData.weight} onChange={handleChange} required placeholder="70" />
                </div>
              </div>
              <div className="input-box">
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text)' }}>What is your goal?</label>
                <select name="goal" value={formData.goal} onChange={handleChange} style={{ width: '100%', padding: '16px', borderRadius: '14px', background: 'var(--bg-alt)', border: '1px solid var(--surface-border)', color: 'var(--text)' }}>
                  <option value="lose">Lose Weight</option>
                  <option value="maintain">Maintain Weight</option>
                  <option value="gain">Build Muscle / Gain Weight</option>
                </select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in">
              <div className="input-box">
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text)' }}>Activity Level</label>
                <select name="activity" value={formData.activity} onChange={handleChange} style={{ width: '100%', padding: '16px', borderRadius: '14px', background: 'var(--bg-alt)', border: '1px solid var(--surface-border)', color: 'var(--text)' }}>
                  <option value="1.2">Sedentary (Little to no exercise)</option>
                  <option value="1.375">Lightly Active (1-3 days/week)</option>
                  <option value="1.55">Moderately Active (3-5 days/week)</option>
                  <option value="1.725">Very Active (6-7 days/week)</option>
                </select>
              </div>
              <div className="input-box">
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text)' }}>Dietary Preference</label>
                <select name="diet" value={formData.diet} onChange={handleChange} style={{ width: '100%', padding: '16px', borderRadius: '14px', background: 'var(--bg-alt)', border: '1px solid var(--surface-border)', color: 'var(--text)' }}>
                  <option value="any">No Restrictions</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                </select>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
            {step > 1 && (
              <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setStep(step - 1)}>Back</button>
            )}
            <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
              {step === 3 ? 'Complete Setup' : 'Next'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
