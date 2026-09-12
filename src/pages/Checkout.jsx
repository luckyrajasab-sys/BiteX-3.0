import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Checkout = () => {
  const { cart, placeOrder } = useContext(AppContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState('card');
  const [errors, setErrors] = useState({});

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const finalTotal = total + 40;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address.trim()) {
      setErrors({ address: 'Delivery address is required' });
      return;
    }

    const orderId = placeOrder(payment, address);
    if (orderId) {
      navigate('/order-success');
    }
  };

  if (cart.length === 0) {
    return (
      <div style={{ padding: '140px 6% 90px', textAlign: 'center' }}>
        <h2>Your cart is empty</h2>
        <button className="btn btn-primary" onClick={() => navigate('/explore')} style={{ marginTop: '20px' }}>Explore Menu</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '140px 6% 90px', maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }}>
      <div className="glass" style={{ padding: '30px', borderRadius: 'var(--radius-md)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '30px' }}>Checkout Details</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-muted)' }}>Delivery Address</label>
            <textarea 
              value={address}
              onChange={(e) => { setAddress(e.target.value); setErrors({}); }}
              placeholder="Enter your full delivery address..."
              rows="3"
              style={{ width: '100%', padding: '15px', borderRadius: 'var(--radius-sm)', border: errors.address ? '1px solid var(--danger)' : '1px solid var(--surface-border)', background: 'var(--bg-alt)', color: 'var(--text)' }}
            ></textarea>
            {errors.address && <span style={{ color: 'var(--danger)', fontSize: '12px', marginTop: '5px', display: 'block' }}>{errors.address}</span>}
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-muted)' }}>Delivery Estimate</label>
            <div style={{ padding: '15px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--success)', borderRadius: 'var(--radius-sm)', color: 'var(--success)', fontWeight: 'bold' }}>
              ⚡ 25 - 35 Minutes
            </div>
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-muted)' }}>Payment Method</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['card', 'upi', 'cod'].map(method => (
                <label key={method} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-sm)', background: 'var(--bg-alt)', cursor: 'pointer' }}>
                  <input type="radio" name="payment" value={method} checked={payment === method} onChange={() => setPayment(method)} />
                  <span style={{ textTransform: 'uppercase' }}>{method === 'cod' ? 'Cash on Delivery' : method}</span>
                </label>
              ))}
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '15px' }}>Place Order - ₹{finalTotal}</button>
        </form>
      </div>

      <div className="glass" style={{ padding: '30px', borderRadius: 'var(--radius-md)', height: 'fit-content' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '20px' }}>Order Summary</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px' }}>
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
              <span>{item.quantity}x {item.name}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>
        
        <hr style={{ borderColor: 'var(--surface-border)', margin: '15px 0' }} />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: 'var(--text-muted)' }}>
          <span>Subtotal</span>
          <span>₹{total}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: 'var(--text-muted)' }}>
          <span>Delivery Fee</span>
          <span>₹40</span>
        </div>
        
        <hr style={{ borderColor: 'var(--surface-border)', margin: '15px 0' }} />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 'bold' }}>
          <span>Total</span>
          <span>₹{finalTotal}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
