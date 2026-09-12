import React from 'react';
import { Link } from 'react-router-dom';
import { restaurantsData } from '../data/restaurants';

const Restaurants = () => {
  return (
    <section className="section" style={{ padding: '140px 6% 90px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '40px' }}>Healthy Restaurants Near You</h1>
        <p style={{ color: 'var(--text-muted)' }}>Top-rated spots tailored for your nutrition goals.</p>
      </div>

      <div className="food-grid">
        {restaurantsData && restaurantsData.length > 0 ? (
          restaurantsData.map(restaurant => (
            <Link to={`/restaurant/${restaurant.id}`} key={restaurant.id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="card glass restaurant-card hover-scale" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <img src={restaurant.img} alt={restaurant.name} loading="lazy" style={{ height: '200px', objectFit: 'cover', width: '100%', borderRadius: 'var(--radius-md) var(--radius-md) 0 0' }} />
                <div className="restaurant-info" style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ marginBottom: '5px', fontSize: '18px' }}>{restaurant.name}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '15px', flex: 1 }}>{restaurant.desc}</p>
                  <div className="restaurant-meta" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', alignItems: 'center' }}>
                    <span className="rating-pill" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '6px 12px', borderRadius: '100px', fontWeight: '600' }}>★ {restaurant.rating}</span>
                    <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ fontSize: '16px' }}>🕒</span> {restaurant.time}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="empty-state" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: '60px', marginBottom: '20px', background: 'var(--surface)', width: '120px', height: '120px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🛵</div>
            <h3 style={{ fontSize: '24px' }}>No restaurants in your area</h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '10px 0 20px' }}>We are expanding rapidly! Check back soon or change your delivery location.</p>
            <button className="btn btn-secondary hover-scale" style={{ padding: '12px 24px' }}>Change Location</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Restaurants;
