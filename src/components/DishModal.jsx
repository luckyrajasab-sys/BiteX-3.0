import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const DishModal = ({ item, onClose }) => {
  const { addToCart } = useContext(AppContext);

  if (!item) return null;

  const mockRating = (Math.random() * (5 - 4) + 4).toFixed(1);
  const mockReviews = Math.floor(Math.random() * 200) + 50;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(5px)',
      display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }} onClick={onClose}>
      <div style={{
        background: 'var(--bg)', borderRadius: 'var(--radius-md)', width: '90%', maxWidth: '500px',
        overflow: 'hidden', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        animation: 'slideUp 0.3s ease-out'
      }} onClick={e => e.stopPropagation()} className="modal-content">
        
        <button onClick={onClose} aria-label="Close modal" style={{
          position: 'absolute', top: '15px', right: '15px', background: 'rgba(0,0,0,0.5)', border: 'none',
          color: '#fff', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', zIndex: 10
        }}>✕</button>

        <div style={{ width: '100%', height: '250px' }}>
          <img src={item.img} alt={item.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div style={{ padding: '25px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', margin: 0, fontSize: '24px' }}>{item.name}</h2>
            <div className="health-score-badge high" style={{ position: 'relative', margin: 0 }}>{item.healthyScore}</div>
          </div>
          
          <div style={{ display: 'flex', gap: '15px', marginTop: '10px', fontSize: '14px', color: 'var(--text-muted)' }}>
            <span>⭐ {mockRating} ({mockReviews} reviews)</span>
            <span>₹{item.price}</span>
          </div>

          <p style={{ marginTop: '15px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            {item.description || "A delicious, healthy option prepared fresh with premium ingredients. Perfectly balanced to meet your nutritional goals."}
          </p>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ marginBottom: '10px' }}>Ingredients</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
              {item.ingredients ? item.ingredients.join(', ') : 'Fresh local ingredients, secret spices.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginTop: '20px', textAlign: 'center', fontSize: '12px' }}>
            <div style={{ background: 'var(--bg-alt)', padding: '10px 5px', borderRadius: '8px' }}><div>🔥</div>{item.calories}</div>
            <div style={{ background: 'var(--bg-alt)', padding: '10px 5px', borderRadius: '8px', color: 'var(--macro-protein)' }}><div>🥩</div>{item.protein}g</div>
            <div style={{ background: 'var(--bg-alt)', padding: '10px 5px', borderRadius: '8px', color: 'var(--macro-carbs)' }}><div>🍞</div>{item.carbs}g</div>
            <div style={{ background: 'var(--bg-alt)', padding: '10px 5px', borderRadius: '8px', color: 'var(--macro-fat)' }}><div>🥑</div>{item.fat}g</div>
            <div style={{ background: 'var(--bg-alt)', padding: '10px 5px', borderRadius: '8px', color: 'var(--macro-fibre)' }}><div>🥦</div>{item.fibre}g</div>
          </div>

          <div style={{ marginTop: '25px', display: 'flex', gap: '15px' }}>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => { addToCart(item); onClose(); }}>Add to Cart - ₹{item.price}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishModal;
