import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { restaurantsData } from '../data/restaurants';
import { menuData } from '../data/menu';
import FoodCard from '../components/FoodCard';

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const res = restaurantsData.find(r => r.id === parseInt(id));
    if (res) {
      setRestaurant(res);
      // Pseudo-random assignment of dishes to this restaurant ID
      const assignedDishes = menuData.filter((item, index) => (index % 6) + 1 === res.id);
      setMenu(assignedDishes);
    } else {
      navigate('/restaurants'); // Redirect if not found
    }
  }, [id, navigate]);

  if (!restaurant) return null;

  return (
    <div style={{ padding: '140px 6% 90px' }}>
      <div className="glass" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '40px' }}>
        <div style={{ width: '100%', height: '300px', position: 'relative' }}>
          <img src={restaurant.img} alt={restaurant.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', padding: '30px' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', margin: 0, color: '#fff' }}>{restaurant.name}</h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '5px' }}>{restaurant.desc}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '20px', padding: '20px 30px', background: 'var(--bg-alt)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--success)' }}>
            <strong>★ {restaurant.rating}</strong> Rating
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)' }}>
            <span>⏱ {restaurant.time}</span> Delivery Time
          </div>
        </div>
      </div>

      <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '20px' }}>Menu</h2>
      
      <div className="grid">
        {menu.map((item) => (
          <FoodCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantDetail;
