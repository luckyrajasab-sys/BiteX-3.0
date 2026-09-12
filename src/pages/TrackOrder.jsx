import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TrackOrder = () => {
  const { lastOrder } = useContext(AppContext);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id') || lastOrder || 'BX000000';

  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: 'Order Confirmed', desc: 'We have received your order.' },
    { title: 'Preparing', desc: 'Your food is being prepared.' },
    { title: 'On the Way', desc: 'Your delivery partner is on the way.' },
    { title: 'Delivered', desc: 'Enjoy your meal!' }
  ];

  useEffect(() => {
    if (currentStep >= steps.length - 1) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 2200);

    return () => clearInterval(interval);
  }, [currentStep, steps.length]);

  return (
    <div className="tracking-box">
      <div className="tracking-header">
        <h2>Track Order</h2>
        <p className="muted">Order ID: <span id="tracking-id" style={{ color: 'var(--text)', fontWeight: 600 }}>{id}</span></p>
      </div>
      
      <div className="track-steps glass">
        {steps.map((step, index) => {
          let stepClass = 'track-step';
          if (index < currentStep) stepClass += ' done';
          else if (index === currentStep) stepClass += ' active';

          return (
            <div key={index} className={stepClass}>
              <div className="dot">{index < currentStep ? '✓' : index + 1}</div>
              <div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackOrder;
