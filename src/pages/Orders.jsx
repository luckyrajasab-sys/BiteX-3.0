import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { Package, RotateCcw, MapPin, Search } from 'lucide-react';

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
    <motion.section 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
      className="section" style={{ maxWidth: '800px', margin: '0 auto', minHeight: '80vh', padding: '120px 6% 90px' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '40px', margin: '0 0 10px' }}>Order History</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>Review your past meals and track current deliveries.</p>
      </div>
      
      {orders.length === 0 ? (
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="empty-state" style={{ textAlign: 'center', padding: '80px 20px', background: 'var(--bg-alt)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--surface-border)' }}>
          <div style={{ background: 'var(--surface)', width: '100px', height: '100px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 25px' }}>
            <Package size={40} color="var(--text-muted)" />
          </div>
          <h3 style={{ fontSize: '24px', margin: '0 0 10px' }}>No orders yet</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Your delicious history will appear here once you place an order.</p>
          <Link to="/explore">
            <button className="btn btn-primary hover-scale" style={{ padding: '16px 32px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 auto' }}>
              <Search size={18} /> Start Exploring
            </button>
          </Link>
        </motion.div>
      ) : (
        <div className="orders-list">
          {orders.map((order, idx) => (
            <motion.div 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: idx * 0.1 }}
              key={order.id} className="order-card glass hover-scale" style={{ marginBottom: '25px', padding: '30px', borderRadius: 'var(--radius-lg)' }}
            >
              <div className="order-card-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--surface-border)', paddingBottom: '20px', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ margin: '0 0 8px', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Package size={20} color="var(--accent)" /> Order {order.id}
                  </h3>
                  <p className="muted" style={{ fontSize: '14px', margin: 0, color: 'var(--text-muted)' }}>{new Date(order.date).toLocaleString()}</p>
                </div>
                <span style={{ 
                  background: order.status === 'Delivered' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)', 
                  color: order.status === 'Delivered' ? 'var(--success)' : '#F59E0B', 
                  padding: '8px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: 'bold' 
                }}>
                  {order.status}
                </span>
              </div>
              <div className="order-card-items" style={{ color: 'var(--text)', fontSize: '15px', marginBottom: '25px', lineHeight: '1.6' }}>
                {order.items.map((i) => (
                  <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span><span style={{ color: 'var(--text-muted)' }}>{i.quantity || 1}x</span> {i.name}</span>
                    <span style={{ color: 'var(--text-muted)' }}>₹{i.price * (i.quantity || 1)}</span>
                  </div>
                ))}
              </div>
              <div className="order-card-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1px dashed var(--surface-border)' }}>
                <strong style={{ fontSize: '24px' }}>₹{order.total}</strong>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button className="btn btn-secondary hover-scale" style={{ padding: '12px 20px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => handleReorder(order)}>
                    <RotateCcw size={16} /> Reorder
                  </button>
                  <Link to={`/track-order?id=${order.id}`}>
                    <button className="btn btn-primary hover-scale" style={{ padding: '12px 20px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <MapPin size={16} /> Track
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default Orders;
