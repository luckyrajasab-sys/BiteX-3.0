import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, Bell, CheckCircle } from 'lucide-react';

const TrackOrder = () => {
  const { lastOrder } = useContext(AppContext);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id') || lastOrder || 'BX000000';

  const [currentStep, setCurrentStep] = useState(0);
  const [activeNotifications, setActiveNotifications] = useState([]);

  const steps = [
    { title: 'Order Confirmed', desc: 'We have received your order.', time: '10:00 AM' },
    { title: 'Preparing', desc: 'Your food is being prepared by the chef.', time: '10:15 AM' },
    { title: 'On the Way', desc: 'Your delivery partner is on the way.', time: '10:30 AM' },
    { title: 'Delivered', desc: 'Enjoy your meal!', time: '10:45 AM' }
  ];

  const triggerNotification = (type, message, delay = 0) => {
    setTimeout(() => {
      const notifId = Date.now() + Math.random();
      setActiveNotifications(prev => [...prev, { id: notifId, type, message }]);
      
      // Auto dismiss after 5 seconds
      setTimeout(() => {
        setActiveNotifications(prev => prev.filter(n => n.id !== notifId));
      }, 5000);
    }, delay);
  };

  useEffect(() => {
    if (currentStep === 0) {
      triggerNotification('email', `Receipt for order ${id} from BiteX. Total: ₹450.`);
      triggerNotification('app', 'Order Confirmed! The restaurant is reviewing your order.', 1000);
    } else if (currentStep === 1) {
      triggerNotification('app', 'The chef has started preparing your food.');
    } else if (currentStep === 2) {
      triggerNotification('sms', `BiteX: Your order ${id} is out for delivery. Track it live on the app!`);
      triggerNotification('app', 'Your delivery partner has picked up the order.', 1500);
    } else if (currentStep === 3) {
      triggerNotification('app', 'Your order has been delivered. Enjoy your meal!');
      triggerNotification('sms', 'BiteX: Delivered! Rate your experience on the app.', 1000);
    }
  }, [currentStep, id]);

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
    }, 4000); // 4 seconds between steps for demo purposes

    return () => clearInterval(interval);
  }, [currentStep, steps.length]);

  const getIconForNotification = (type) => {
    if (type === 'email') return <Mail color="#3B82F6" size={20} />;
    if (type === 'sms') return <MessageSquare color="#10B981" size={20} />;
    return <Bell color="#F59E0B" size={20} />;
  };

  const getTitleForNotification = (type) => {
    if (type === 'email') return 'New Email';
    if (type === 'sms') return 'New Text Message';
    return 'BiteX App';
  };

  return (
    <div style={{ padding: '120px 6% 90px', maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
      
      {/* Mock Notification Overlay Engine */}
      <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <AnimatePresence>
          {activeNotifications.map(notif => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--surface-border)',
                borderRadius: '16px',
                padding: '16px 20px',
                width: '320px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                display: 'flex',
                gap: '15px',
                alignItems: 'flex-start'
              }}
            >
              <div style={{ background: 'var(--bg)', padding: '10px', borderRadius: '50%' }}>
                {getIconForNotification(notif.type)}
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 5px', fontSize: '14px', color: 'var(--text-muted)' }}>{getTitleForNotification(notif.type)}</h4>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', lineHeight: '1.4' }}>{notif.message}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', margin: '0 0 10px' }}>Track Your Order</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>Order ID: <span style={{ color: 'var(--text)', fontWeight: 600 }}>{id}</span></p>
      </div>
      
      <div className="glass" style={{ padding: '40px', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ position: 'relative', paddingLeft: '40px' }}>
          {/* Vertical Line */}
          <div style={{ position: 'absolute', left: '19px', top: '20px', bottom: '20px', width: '2px', background: 'var(--surface-border)', zIndex: 0 }} />
          
          {/* Animated Progress Line */}
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5 }}
            style={{ position: 'absolute', left: '19px', top: '20px', width: '2px', background: 'var(--accent)', zIndex: 1 }} 
          />

          {steps.map((step, index) => {
            const isCompleted = index <= currentStep;
            const isActive = index === currentStep;

            return (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                style={{ position: 'relative', zIndex: 2, marginBottom: index === steps.length - 1 ? 0 : '40px', display: 'flex', gap: '20px' }}
              >
                {/* Dot */}
                <motion.div 
                  animate={{ 
                    backgroundColor: isCompleted ? 'var(--accent)' : 'var(--bg-alt)',
                    borderColor: isCompleted ? 'var(--accent)' : 'var(--surface-border)',
                    scale: isActive ? 1.2 : 1
                  }}
                  style={{ 
                    width: '40px', height: '40px', borderRadius: '50%', border: '2px solid',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: isCompleted ? '#fff' : 'var(--text-muted)', marginLeft: '-40px',
                    boxShadow: isActive ? '0 0 0 8px rgba(16, 185, 129, 0.2)' : 'none'
                  }}
                >
                  {isCompleted ? <CheckCircle size={20} /> : index + 1}
                </motion.div>
                
                {/* Content */}
                <div style={{ flex: 1, paddingTop: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h4 style={{ margin: 0, fontSize: '18px', color: isCompleted ? 'var(--text)' : 'var(--text-muted)' }}>{step.title}</h4>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{step.time}</span>
                  </div>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '15px' }}>{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
