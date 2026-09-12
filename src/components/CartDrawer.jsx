import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CartDrawer = () => {
  const { cart, updateCartQuantity, removeFromCart, isCartOpen, setIsCartOpen } = useContext(AppContext);
  const navigate = useNavigate();

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = cart.length > 0 ? 40 : 0;
  const grandTotal = total + deliveryFee;

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(4px)',
              zIndex: 2000
            }}
            onClick={() => setIsCartOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 0, right: 0, bottom: 0,
              width: '100%',
              maxWidth: '450px',
              backgroundColor: 'var(--bg-alt)',
              zIndex: 2001,
              boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Header */}
            <div style={{ padding: '24px', borderBottom: '1px solid var(--surface-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShoppingBag size={24} /> Your Cart
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShoppingBag size={40} color="var(--text-muted)" />
                  </div>
                  <h3>Your cart is empty</h3>
                  <p style={{ color: 'var(--text-muted)' }}>Add some healthy options from the menu.</p>
                  <button 
                    className="btn btn-primary" 
                    onClick={() => { setIsCartOpen(false); navigate('/explore'); }}
                    style={{ marginTop: '10px' }}
                  >
                    Explore Foods
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {cart.map((item) => (
                    <motion.div 
                      key={item.id} 
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      style={{ display: 'flex', gap: '15px', padding: '16px', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-md)', background: 'var(--bg)' }}
                    >
                      <img src={item.img} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '12px' }} />
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <h3 style={{ fontSize: '16px', margin: 0 }}>{item.name}</h3>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', opacity: 0.6 }}
                            className="hover-scale"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>₹{item.price}</p>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg-alt)', padding: '4px 8px', borderRadius: '8px', border: '1px solid var(--surface-border)' }}>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }} onClick={() => updateCartQuantity(item.id, -1)}>
                              <Minus size={14} />
                            </button>
                            <span style={{ fontWeight: '600', fontSize: '14px' }}>{item.quantity}</span>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }} onClick={() => updateCartQuantity(item.id, 1)}>
                              <Plus size={14} />
                            </button>
                          </div>
                          <span style={{ fontWeight: 'bold', color: 'var(--text)' }}>
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer / Summary */}
            {cart.length > 0 && (
              <div style={{ padding: '24px', borderTop: '1px solid var(--surface-border)', background: 'var(--bg)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: 'var(--text-muted)' }}>
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', color: 'var(--text-muted)' }}>
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '20px', fontWeight: 'bold' }}>
                  <span>Total</span>
                  <span style={{ color: 'var(--accent)' }}>₹{grandTotal}</span>
                </div>
                
                <button
                  className="btn btn-primary hover-scale"
                  style={{ width: '100%', padding: '16px', fontSize: '16px', borderRadius: '100px' }}
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
