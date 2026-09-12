import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import FoodCard from '../components/FoodCard';

const Favorites = () => {
  const { favorites } = useContext(AppContext);

  return (
    <section className="section" style={{ minHeight: '80vh' }}>
      <h2 className="section-title">Your Favorites</h2>
      
      {favorites.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">♡</div>
          <h3>No favorites yet</h3>
          <p>Tap the heart on any dish to save it here.</p>
          <Link to="/menu">
            <button className="btn btn-primary">Browse Menu</button>
          </Link>
        </div>
      ) : (
        <div className="food-grid" id="favorites-grid">
          {favorites.map((item, index) => (
            <FoodCard key={index} item={item} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Favorites;
