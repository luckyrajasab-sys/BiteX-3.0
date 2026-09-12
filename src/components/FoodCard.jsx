import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import DishModal from './DishModal';

const FoodCard = ({ item }) => {
  const { addToCart, toggleFavorite, isFavorite, logFood } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);

  const getScoreClass = (score) => {
    if (score >= 80) return 'high';
    if (score >= 60) return 'medium';
    return 'low';
  };

  const getMacroWidth = (val, max) => `${Math.min((val / max) * 100, 100)}%`;

  return (
    <>
      <div className="card glass food-card" style={{ cursor: 'pointer' }} onClick={() => setShowModal(true)}>
        <div style={{ position: 'relative' }}>
          <img src={item.img} alt={item.name} loading="lazy" style={{ height: '200px' }} />
          <div className={`health-score-badge ${getScoreClass(item.healthyScore)}`}>
            {item.healthyScore}
          </div>
        </div>
        
        <div className="card-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <h3>{item.name}</h3>
            <button 
              className="fav-btn"
              aria-label={isFavorite(item.id) ? "Remove from favorites" : "Add to favorites"}
              onClick={(e) => { e.stopPropagation(); toggleFavorite(item); }}
              style={{ color: isFavorite(item.id) ? 'var(--danger)' : 'var(--text-muted)' }}
            >
              ♥
            </button>
          </div>
          
          <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '15px' }}>
            {item.tags && item.tags.slice(0, 2).map((tag, idx) => (
              <span key={idx} className="food-tag">{tag}</span>
            ))}
          </div>

          <div className="macro-container">
            <div className="macro-bar">
              <div className="macro-fill macro-protein" style={{ width: getMacroWidth(item.protein, 50) }}></div>
            </div>
            <div className="macro-bar">
              <div className="macro-fill macro-carbs" style={{ width: getMacroWidth(item.carbs, 100) }}></div>
            </div>
            <div className="macro-bar">
              <div className="macro-fill macro-fat" style={{ width: getMacroWidth(item.fat, 40) }}></div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '15px' }}>
            <span>{item.protein}g P</span>
            <span>{item.carbs}g C</span>
            <span>{item.fat}g F</span>
          </div>

          <div className="card-bottom">
            <div>
              <span className="price">₹{item.price}</span>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>🔥 {item.calories} kcal</div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn btn-secondary" style={{ padding: '8px 12px', fontSize: '12px' }} onClick={(e) => { e.stopPropagation(); logFood(item); }}>Track</button>
              <button className="btn btn-primary" style={{ padding: '8px 12px', fontSize: '12px' }} onClick={(e) => { e.stopPropagation(); addToCart(item); }}>Add</button>
            </div>
          </div>
        </div>
      </div>
      
      {showModal && <DishModal item={item} onClose={() => setShowModal(false)} />}
    </>
  );
};

export default FoodCard;
