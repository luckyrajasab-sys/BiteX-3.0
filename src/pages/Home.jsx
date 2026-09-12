import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <section className="hero">
        <div className="hero-text">
          <div className="eyebrow">✨ BiteX 3.0</div>
          <h1>Eat Smart.<br/><em>Live Better.</em></h1>
          <p>Personalized nutrition, healthy food and smarter choices — built around you.</p>
          <div className="hero-cta">
            <Link to="/explore">
              <button className="btn btn-primary">Explore Food</button>
            </Link>
            <Link to="/onboarding">
              <button className="btn btn-secondary">Build My Plan</button>
            </Link>
          </div>
        </div>
        
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop" alt="Fresh healthy bowl" style={{ objectFit: 'cover' }} />
          
          <div className="hero-stat-card glass" style={{ top: '10%', left: '-30px', animationDelay: '0s' }}>
            <div className="num">42g</div>
            <div className="label">Protein<br/>Packed</div>
          </div>
          
          <div className="hero-stat-card glass" style={{ bottom: '15%', right: '-30px', animationDelay: '1.5s', flexDirection: 'row-reverse' }}>
            <div className="num">350</div>
            <div className="label" style={{ textAlign: 'right' }}>Low<br/>Calories</div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-alt)' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 className="section-title">Your Nutrition Hub</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>Tools designed to help you hit your goals and stay consistent.</p>
        </div>
        
        <div className="grid">
          <div className="card glass" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '20px' }}>🧮</div>
            <h3>Calorie Calculator</h3>
            <p>Find your exact daily requirements.</p>
            <Link to="/calculator" style={{ color: 'var(--accent)', fontWeight: 'bold', marginTop: '10px', display: 'inline-block' }}>Calculate Now →</Link>
          </div>
          <div className="card glass" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '20px' }}>🥗</div>
            <h3>Personalized Diet</h3>
            <p>AI-generated meal plans for you.</p>
            <Link to="/diet-plan" style={{ color: 'var(--accent)', fontWeight: 'bold', marginTop: '10px', display: 'inline-block' }}>Get Plan →</Link>
          </div>
          <div className="card glass" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '20px' }}>🏅</div>
            <h3>Earn Rewards</h3>
            <p>Get BitePoints for eating healthy.</p>
            <Link to="/rewards" style={{ color: 'var(--accent)', fontWeight: 'bold', marginTop: '10px', display: 'inline-block' }}>View Rewards →</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
