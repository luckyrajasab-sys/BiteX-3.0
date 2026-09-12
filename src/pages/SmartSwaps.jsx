import React, { useContext } from 'react';
import { menuData } from '../data/menu';
import { AppContext } from '../context/AppContext';

const SmartSwaps = () => {
  const { logFood, addToCart } = useContext(AppContext);

  const swaps = [
    {
      bad: menuData.find(m => m.name.includes('Classic Cheeseburger')),
      good: menuData.find(m => m.name.includes('Grilled Chicken Burger'))
    },
    {
      bad: menuData.find(m => m.name.includes('French Fries')),
      good: menuData.find(m => m.name.includes('Baked Sweet Potato Wedges'))
    },
    {
      bad: menuData.find(m => m.name.includes('Cold Coffee')),
      good: menuData.find(m => m.name.includes('Fresh Lime Water'))
    },
    {
      bad: menuData.find(m => m.name.includes('Margherita Classic Pizza')),
      good: menuData.find(m => m.name.includes('Cauliflower Crust Veggie Pizza'))
    }
  ];

  return (
    <div style={{ padding: '140px 6% 90px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '40px' }}>Smart Food Swaps</h1>
        <p style={{ color: 'var(--text-muted)' }}>Small changes make a big difference. Swap to healthier alternatives.</p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {swaps.map((swap, index) => {
          if (!swap.bad || !swap.good) return null;
          
          const calDiff = swap.bad.calories - swap.good.calories;

          return (
            <div key={index} className="swap-card glass">
              <div className="swap-item" style={{ textAlign: 'center' }}>
                <img src={swap.bad.img} alt={swap.bad.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%', margin: '0 auto 10px' }} />
                <h4>{swap.bad.name}</h4>
                <div style={{ color: 'var(--danger)', fontSize: '14px', marginTop: '5px' }}>🔥 {swap.bad.calories} kcal</div>
              </div>
              
              <div className="swap-arrow">
                →
                <div style={{ fontSize: '12px', color: 'var(--success)', marginTop: '10px', textAlign: 'center' }}>Save {calDiff} kcal</div>
              </div>

              <div className="swap-item" style={{ textAlign: 'center' }}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <img src={swap.good.img} alt={swap.good.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%', margin: '0 auto 10px', border: '3px solid var(--success)' }} />
                  <div className="health-score-badge high" style={{ top: '-10px', right: '-20px', padding: '2px 6px', fontSize: '10px' }}>{swap.good.healthyScore}</div>
                </div>
                <h4>{swap.good.name}</h4>
                <div style={{ color: 'var(--success)', fontSize: '14px', marginTop: '5px' }}>🔥 {swap.good.calories} kcal</div>
                
                <div style={{ marginTop: '15px', display: 'flex', gap: '5px', justifyContent: 'center' }}>
                  <button className="btn-secondary" style={{ padding: '5px 10px', fontSize: '12px' }} onClick={() => logFood(swap.good)}>Track</button>
                  <button className="btn btn-primary" style={{ padding: '5px 10px', fontSize: '12px' }} onClick={() => addToCart(swap.good)}>Cart</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SmartSwaps;
