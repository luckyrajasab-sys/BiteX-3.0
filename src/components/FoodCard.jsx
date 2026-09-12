import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const FoodCard = ({ item }) => {
  const { addToCart, toggleFavorite, isFavorite } = useContext(AppContext);

  return (
    <div className="card glass">
      <button 
        className={`fav-btn ${isFavorite(item.name) ? 'active' : ''}`}
        onClick={() => toggleFavorite(item)}
      >
        ♡
      </button>
      <img src={item.img} alt={item.name} />
      <h3>{item.name}</h3>
      <p>{item.desc || 'Delicious food from BiteX.'}</p>
      <div className="price">₹{item.price}</div>
      <div className="card-actions">
        <button className="btn btn-primary" onClick={() => addToCart(item)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default FoodCard;
