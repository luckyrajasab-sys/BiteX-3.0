import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Orders = () => {
  const { orders, addToCart } = useContext(AppContext);
  const navigate = useNavigate();

  const handleReorder = (order) => {
    order.items.forEach(item => {
      addToCart(item, item.quantity || 1);
    });
    navigate('/checkout');
  };

  return (
    <section className="section" style={{ maxWidth: '800px', margin: '0 auto', minHeight: '80vh', padding: '140px 6% 90px' }}>
      <h2 className="section-title">Order History</h2>
      
      {orders.length === 0 ? (
        <div className="empty-state" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div className="empty-icon" style={{ fontSize: '60px', marginBottom: '20px' }}>📦</div>
          <h3>No orders yet</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Your past orders will show up here.</p>
          <Link to="/explore">
            <button className="btn btn-primary">Start Exploring</button>
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card glass" style={{ marginBottom: '20px', padding: '20px', borderRadius: 'var(--radius-md)' }}>
              <div className="order-card-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--surface-border)', paddingBottom: '15px', marginBottom: '15px' }}>
                <div>
                  <h3 style={{ margin: 0 }}>Order {order.id}</h3>
                  <p className="muted" style={{ fontSize: '12px', marginTop: '5px' }}>{new Date(order.date).toLocaleString()}</p>
                </div>
                <span className={`status-pill status-${order.status.toLowerCase().replace(' ', '-')}`} style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '5px 10px', borderRadius: '20px', fontSize: '12px' }}>
                  {order.status}
                </span>
              </div>
              <div className="order-card-items" style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '15px' }}>
                {order.items.map((i) => `${i.quantity || 1}x ${i.name}`).join(' · ')}
              </div>
              <div className="order-card-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '18px' }}>₹{order.total}</strong>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="btn btn-secondary" style={{ padding: '8px 12px', fontSize: '12px' }} onClick={() => handleReorder(order)}>Reorder</button>
                  <Link to={`/track-order?id=${order.id}`}>
                    <button className="btn btn-dark" style={{ padding: '8px 12px', fontSize: '12px' }}>Track Order</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Orders;
