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
        {restaurantsData.map(restaurant => (
          <Link to={`/restaurant/${restaurant.id}`} key={restaurant.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card glass restaurant-card" style={{ cursor: 'pointer', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-5px)' } }}>
              <img src={restaurant.img} alt={restaurant.name} loading="lazy" style={{ height: '200px', objectFit: 'cover', width: '100%' }} />
              <div className="restaurant-info" style={{ padding: '20px' }}>
                <h3 style={{ marginBottom: '5px' }}>{restaurant.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '15px' }}>{restaurant.desc}</p>
                <div className="restaurant-meta" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span className="rating-pill" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '4px 8px', borderRadius: 'var(--radius-sm)' }}>★ {restaurant.rating}</span>
                  <span style={{ color: 'var(--text-muted)' }}>{restaurant.time}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Restaurants;
