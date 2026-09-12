import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Cart = () => {
  const { cart, updateCartQuantity, removeFromCart } = useContext(AppContext);
  const navigate = useNavigate();

  const handleCheckout = (e) => {
    e.preventDefault();
    navigate('/checkout');
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="cart-container" style={{ padding: '140px 6% 90px', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }}>
      <div className="cart-items glass" style={{ padding: '30px', borderRadius: 'var(--radius-md)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '20px' }}>Your Cart</h2>
        
        {cart.length === 0 ? (
          <div className="empty-state" style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div className="empty-icon" style={{ fontSize: '60px', marginBottom: '20px' }}>🛒</div>
            <h3>Your cart is empty</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Add some healthy options from the menu.</p>
            <Link to="/explore">
              <button className="btn btn-primary">Explore Foods</button>
            </Link>
          </div>
        ) : (
          <div id="cart-items" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {cart.map((item) => (
              <div key={item.id} className="cart-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-sm)', background: 'var(--bg-alt)' }}>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <img src={item.img} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                  <div>
                    <h3 style={{ fontSize: '18px', marginBottom: '5px' }}>{item.name}</h3>
                    <p style={{ color: 'var(--text-muted)' }}>₹{item.price} each</p>
                    {item.notes && <p style={{ fontSize: '12px', color: 'var(--accent)', marginTop: '5px' }}>Note: {item.notes}</p>}
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--surface)', padding: '5px 10px', borderRadius: 'var(--radius-sm)' }}>
                    <button style={{ background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer', fontSize: '18px' }} onClick={() => updateCartQuantity(item.id, -1)}>-</button>
                    <span style={{ fontWeight: 'bold' }}>{item.quantity}</span>
                    <button style={{ background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer', fontSize: '18px' }} onClick={() => updateCartQuantity(item.id, 1)}>+</button>
                  </div>
                  
                  <div style={{ fontWeight: 'bold', minWidth: '60px', textAlign: 'right' }}>
                    ₹{item.price * item.quantity}
                  </div>
                  
                  <button
                    className="btn btn-secondary"
                    style={{ padding: '8px 12px', fontSize: '12px' }}
                    onClick={() => removeFromCart(item.id)}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="summary glass" style={{ padding: '30px', borderRadius: 'var(--radius-md)', height: 'fit-content' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '20px' }}>Order Summary</h2>
        <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
          <span>₹{total}</span>
        </div>
        <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <span style={{ color: 'var(--text-muted)' }}>Delivery Fee</span>
          <span>₹{cart.length > 0 ? 40 : 0}</span>
        </div>
        <hr style={{ borderColor: 'var(--surface-border)', margin: '15px 0' }} />
        <div className="summary-row total" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 'bold' }}>
          <span>Total</span>
          <span id="total">₹{cart.length > 0 ? total + 40 : 0}</span>
        </div>
        
        {cart.length > 0 && (
          <button
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '25px', padding: '15px' }}
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;
