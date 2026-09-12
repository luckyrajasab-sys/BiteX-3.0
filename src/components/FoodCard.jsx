import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const FoodCard = ({ item }) => {
  const { addToCart, toggleFavorite, isFavorite, logFood } = useContext(AppContext);

  const getScoreClass = (score) => {
    if (!score) return '';
    if (score >= 80) return 'high';
    if (score >= 50) return 'med';
    return 'low';
  };

  return (
    <div className="card glass" style={{ position: 'relative' }}>
      {item.healthyScore && (
        <div className={`health-score-badge ${getScoreClass(item.healthyScore)}`}>
          Score: {item.healthyScore}
        </div>
      )}
      <button 
        className={`fav-btn ${isFavorite(item.id) ? 'active' : ''}`}
        onClick={() => toggleFavorite(item)}
      >
        ♡
      </button>
      <img src={item.img} alt={item.name} />
      <h3>{item.name}</h3>
      <p>{item.desc || 'Delicious food from BiteX.'}</p>
      
      {item.calories && (
        <div className="macro-bar">
          <div className="macro-item"><span className="macro-dot dot-p"></span> {item.protein}g P</div>
          <div className="macro-item"><span className="macro-dot dot-c"></span> {item.carbs}g C</div>
          <div className="macro-item"><span className="macro-dot dot-f"></span> {item.fat}g F</div>
          <div className="macro-item">🔥 {item.calories} kcal</div>
        </div>
      )}

      {item.tags && (
        <div className="tags-container">
          {item.tags.slice(0, 3).map(tag => (
            <span key={tag} className="food-tag">{tag}</span>
          ))}
        </div>
      )}

      <div className="price" style={{ marginTop: '10px' }}>₹{item.price}</div>
      <div className="card-actions" style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
        <button className="btn-secondary" style={{ flex: 1, padding: '8px', fontSize: '14px' }} onClick={() => logFood(item)}>Track</button>
        <button className="btn btn-primary" style={{ flex: 1, padding: '8px', fontSize: '14px' }} onClick={() => addToCart(item)}>Cart</button>
      </div>
    </div>
  );
};

export default FoodCard;
