import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import FoodCard from '../components/FoodCard';
import { menuData } from '../data/menu';
import { AppContext } from '../context/AppContext';

const Home = () => {
  const { userGoal } = useContext(AppContext);

  // Simple filtering for display sections
  const highProtein = menuData.filter(item => item.tags?.includes('High Protein')).slice(0, 4);
  const indianFoods = menuData.filter(item => item.tags?.includes('Indian')).slice(0, 4);
  const recommended = menuData.filter(item => item.healthyScore >= 85).slice(0, 4);
  const popular = menuData.slice(4, 8);

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <span className="eyebrow" style={{ color: 'var(--success)' }}>🌱 The New BiteX</span>
          <h1>
            Eat Smart.<br />
            <em>Bite Better.</em>
          </h1>
          <p>
            Discover food that fits your goals, lifestyle, and nutrition. Your journey to a healthier you starts with every bite.
          </p>
          <div className="hero-cta">
            <Link to="/explore">
              <button className="btn btn-primary" style={{ background: 'var(--success)' }}>Explore Healthy Foods</button>
            </Link>
            <Link to="/meal-planner">
              <button className="btn btn-secondary">Build My Meal Plan</button>
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop" alt="Healthy Food Hero" />
          <div className="hero-stat-card glass">
            <div className="num" style={{ color: 'var(--success)', fontSize: '24px' }}>Goal:</div>
            <div className="label">{userGoal}</div>
          </div>
        </div>
      </section>

      <section className="menu-grid" style={{ padding: '0 6% 60px' }}>
        <h2 className="section-title">Recommended For You</h2>
        <div className="grid">
          {recommended.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="menu-grid" style={{ padding: '0 6% 60px' }}>
        <h2 className="section-title">Indian Healthy Foods</h2>
        <div className="grid">
          {indianFoods.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="menu-grid" style={{ padding: '0 6% 60px' }}>
        <h2 className="section-title">High Protein Meals</h2>
        <div className="grid">
          {highProtein.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </section>
      
      <section className="menu-grid" style={{ padding: '0 6% 60px' }}>
        <h2 className="section-title">Popular This Week</h2>
        <div className="grid">
          {popular.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
