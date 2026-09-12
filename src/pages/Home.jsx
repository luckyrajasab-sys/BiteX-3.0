import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="hero">
      <div className="hero-text">
        <span className="eyebrow">🔥 Now on BiteX 3.0</span>
        <h1>
          Cravings, <em>met</em><br />
          in 30 minutes.
        </h1>
        <p>
          Hand-picked kitchens, real-time tracking and a menu that actually looks as good as the food tastes. Welcome to the new BiteX.
        </p>
        <div className="hero-cta">
          <Link to="/menu">
            <button className="btn btn-primary">Explore Menu</button>
          </Link>
          <Link to="/restaurants">
            <button className="btn btn-secondary">Browse Restaurants</button>
          </Link>
        </div>
      </div>
      <div className="hero-image">
        <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop" alt="Hero" />
        <div className="hero-stat-card glass">
          <div className="num">40+</div>
          <div className="label">cities served,<br />sub-30 min avg</div>
        </div>
      </div>
    </section>
  );
};

export default Home;
