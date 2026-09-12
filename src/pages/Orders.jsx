import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Orders = () => {
  const { orders } = useContext(AppContext);

  return (
    <section className="section" style={{ maxWidth: '800px', margin: '0 auto', minHeight: '80vh' }}>
      <h2 className="section-title">Order History</h2>
      
      {orders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h3>No orders yet</h3>
          <p>Your past orders will show up here.</p>
          <Link to="/menu">
            <button className="btn btn-primary">Order Now</button>
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card glass">
              <div className="order-card-top">
                <div>
                  <h3>Order {order.id}</h3>
                  <p className="muted">{new Date(order.date).toLocaleString()}</p>
                </div>
                <span className={`status-pill status-${order.status.toLowerCase().replace(' ', '-')}`}>
                  {order.status}
                </span>
              </div>
              <div className="order-card-items">
                {order.items.map((i) => i.name).join(' · ')}
              </div>
              <div className="order-card-bottom">
                <strong>₹{order.total}</strong>
                <Link to={`/track-order?id=${order.id}`}>
                  <button className="btn btn-dark">Track Order</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Orders;
