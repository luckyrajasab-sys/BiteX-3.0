import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const OrderSuccess = () => {
  const { lastOrder } = useContext(AppContext);

  return (
    <div className="cart-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="summary glass" style={{ textAlign: 'center', padding: '60px 40px', maxWidth: '500px' }}>
        <div style={{ fontSize: '60px', marginBottom: '20px' }}>🎉</div>
        <h2>Order Placed Successfully!</h2>
        <p style={{ color: 'var(--text-muted)', margin: '15px 0 30px' }}>
          Your order <strong>{lastOrder || 'BX000000'}</strong> is confirmed and we're getting it ready for you.
        </p>
        
        <Link to={`/track-order?id=${lastOrder}`}>
          <button className="btn btn-primary" style={{ width: '100%', marginBottom: '15px' }}>
            Track Order
          </button>
        </Link>
        <Link to="/">
          <button className="btn btn-secondary" style={{ width: '100%' }}>
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
