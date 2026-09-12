import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import DishModal from './DishModal';
import { Star, Clock, Heart } from 'lucide-react';

const FoodCard = ({ item }) => {
  const { addToCart, toggleFavorite, isFavorite, logFood } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(item);
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 600);
  };

  const getScoreClass = (score) => {
    if (score >= 80) return 'high';
    if (score >= 60) return 'medium';
    return 'low';
  };

  const getMacroWidth = (val, max) => `${Math.min((val / max) * 100, 100)}%`;
  
  // Generating pseudo-random rating and prep time based on ID so it's consistent
  const numId = parseInt(item.id.replace(/\D/g, '')) || 1;
  const rating = (4.0 + (numId % 10) * 0.1).toFixed(1);
  const prepTime = 15 + (numId % 4) * 5;

  return (
    <>
      <div className="card glass food-card hover-scale" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }} onClick={() => setShowModal(true)}>
        <div style={{ position: 'relative' }}>
          <img src={item.img} alt={item.name} loading="lazy" style={{ height: '200px', objectFit: 'cover' }} />
          <div className={`health-score-badge ${getScoreClass(item.healthyScore)}`}>
            {item.healthyScore}
          </div>
          <button 
            className="fav-btn hover-scale"
            aria-label={isFavorite(item.id) ? "Remove from favorites" : "Add to favorites"}
            onClick={(e) => { e.stopPropagation(); toggleFavorite(item); }}
            style={{ 
              position: 'absolute', top: '10px', right: '10px', 
              background: 'rgba(255,255,255,0.9)', border: 'none', 
              borderRadius: '50%', width: '36px', height: '36px', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: isFavorite(item.id) ? 'var(--danger)' : 'var(--text-muted)',
              cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            <Heart size={18} fill={isFavorite(item.id) ? 'var(--danger)' : 'none'} />
          </button>
        </div>
        
        <div className="card-content" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', lineHeight: '1.3' }}>{item.name}</h3>
          </div>
          
          <div style={{ display: 'flex', gap: '15px', color: 'var(--text-muted)', fontSize: '13px', marginBottom: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Star size={14} fill="#F59E0B" color="#F59E0B" /> {rating}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={14} /> {prepTime} mins
            </span>
          </div>
          
          <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '15px' }}>
            {item.tags && item.tags.slice(0, 2).map((tag, idx) => (
              <span key={idx} className="food-tag">{tag}</span>
            ))}
          </div>

          <div style={{ marginTop: 'auto' }}>
            <div className="macro-container" style={{ marginBottom: '8px' }}>
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

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '15px', fontWeight: '500' }}>
              <span>{item.protein}g P</span>
              <span>{item.carbs}g C</span>
              <span>{item.fat}g F</span>
            </div>

            <div className="card-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid var(--surface-border)', paddingTop: '15px' }}>
              <div>
                <span className="price" style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text)' }}>₹{item.price}</span>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>🔥 {item.calories} kcal</div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn btn-secondary hover-scale" style={{ padding: '8px 12px', fontSize: '13px' }} onClick={(e) => { e.stopPropagation(); logFood(item); }}>Track</button>
                <button className={`btn btn-primary hover-scale ${isAdding ? 'cart-icon-pop' : ''}`} style={{ padding: '8px 16px', fontSize: '13px', minWidth: '70px' }} onClick={handleAdd}>
                  {isAdding ? 'Added' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showModal && <DishModal item={item} onClose={() => setShowModal(false)} />}
    </>
  );
};

export default FoodCard;
