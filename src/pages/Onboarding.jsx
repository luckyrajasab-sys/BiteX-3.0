import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';

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

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  return (
    <div style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '90px', paddingLeft: '6%', paddingRight: '6%', display: 'flex', justifyContent: 'center' }}>
      
      {/* Background decoration */}
      <div style={{ position: 'fixed', top: '10%', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%)', borderRadius: '50%', zIndex: -1, pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '10%', right: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(245, 158, 11, 0.05) 0%, transparent 70%)', borderRadius: '50%', zIndex: -1, pointerEvents: 'none' }} />

      <div className="glass" style={{ maxWidth: '500px', width: '100%', padding: '40px', borderRadius: 'var(--radius-lg)', position: 'relative', overflow: 'hidden' }}>
        
        {/* Progress Bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'var(--surface-border)' }}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.3 }}
            style={{ height: '100%', background: 'var(--accent)' }}
          />
        </div>

        <h2 style={{ textAlign: 'center', marginBottom: '10px', fontFamily: 'var(--font-display)', fontSize: '32px' }}>Welcome to BiteX</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '30px' }}>
          Step {step} of 3: Let's personalize your experience.
        </p>

        <form onSubmit={handleSubmit} style={{ minHeight: '260px' }}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>What should we call you?</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your Name" style={{ width: '100%', padding: '16px', borderRadius: '12px', background: 'var(--bg-alt)', border: '1px solid var(--surface-border)', color: 'var(--text)', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Age</label>
                    <input type="number" name="age" value={formData.age} onChange={handleChange} required placeholder="25" min="12" max="120" style={{ width: '100%', padding: '16px', borderRadius: '12px', background: 'var(--bg-alt)', border: '1px solid var(--surface-border)', color: 'var(--text)', outline: 'none' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} style={{ width: '100%', padding: '16px', borderRadius: '12px', background: 'var(--bg-alt)', border: '1px solid var(--surface-border)', color: 'var(--text)', outline: 'none' }}>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Height (cm)</label>
                    <input type="number" name="height" value={formData.height} onChange={handleChange} required placeholder="175" min="100" max="250" style={{ width: '100%', padding: '16px', borderRadius: '12px', background: 'var(--bg-alt)', border: '1px solid var(--surface-border)', color: 'var(--text)', outline: 'none' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Weight (kg)</label>
                    <input type="number" name="weight" value={formData.weight} onChange={handleChange} required placeholder="70" min="30" max="300" style={{ width: '100%', padding: '16px', borderRadius: '12px', background: 'var(--bg-alt)', border: '1px solid var(--surface-border)', color: 'var(--text)', outline: 'none' }} />
                  </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>What is your goal?</label>
                  <select name="goal" value={formData.goal} onChange={handleChange} style={{ width: '100%', padding: '16px', borderRadius: '12px', background: 'var(--bg-alt)', border: '1px solid var(--surface-border)', color: 'var(--text)', outline: 'none' }}>
                    <option value="lose">Lose Weight</option>
                    <option value="maintain">Maintain Weight</option>
                    <option value="gain">Build Muscle / Gain Weight</option>
                  </select>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Activity Level</label>
                  <select name="activity" value={formData.activity} onChange={handleChange} style={{ width: '100%', padding: '16px', borderRadius: '12px', background: 'var(--bg-alt)', border: '1px solid var(--surface-border)', color: 'var(--text)', outline: 'none' }}>
                    <option value="1.2">Sedentary (Little to no exercise)</option>
                    <option value="1.375">Lightly Active (1-3 days/week)</option>
                    <option value="1.55">Moderately Active (3-5 days/week)</option>
                    <option value="1.725">Very Active (6-7 days/week)</option>
                    <option value="1.9">Extra Active (Physical job)</option>
                  </select>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Dietary Preference</label>
                  <select name="diet" value={formData.diet} onChange={handleChange} style={{ width: '100%', padding: '16px', borderRadius: '12px', background: 'var(--bg-alt)', border: '1px solid var(--surface-border)', color: 'var(--text)', outline: 'none' }}>
                    <option value="any">Anything</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="pescatarian">Pescatarian</option>
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '15px', marginTop: '30px' }}>
            {step > 1 ? (
              <button 
                type="button" 
                className="btn btn-secondary hover-scale" 
                onClick={() => setStep(step - 1)}
                style={{ padding: '16px 20px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <ArrowLeft size={18} /> Back
              </button>
            ) : <div />}
            
            <button 
              type="submit" 
              className="btn btn-primary hover-scale"
              style={{ padding: '16px 30px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              {step < 3 ? (
                <>Next Step <ArrowRight size={18} /></>
              ) : (
                <>Complete <CheckCircle size={18} /></>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
