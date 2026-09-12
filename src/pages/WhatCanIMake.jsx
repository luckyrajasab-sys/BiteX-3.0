import React, { useState } from 'react';
import FoodCard from '../components/FoodCard';
import { menuData } from '../data/menu';

const WhatCanIMake = () => {
  const [ingredients, setIngredients] = useState('');
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    setHasSearched(true);
    if (!ingredients.trim()) {
      setResults([]);
      return;
    }

    const keywords = ingredients.toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
    
    const matched = menuData.filter(item => {
      if (!item.ingredients) return false;
      const itemIngStr = item.ingredients.join(' ').toLowerCase();
      // Check if any entered keyword is in the item's ingredients
      return keywords.some(kw => itemIngStr.includes(kw));
    });

    // Sort by number of matching keywords
    matched.sort((a, b) => {
      const aStr = a.ingredients.join(' ').toLowerCase();
      const bStr = b.ingredients.join(' ').toLowerCase();
      const aMatches = keywords.filter(kw => aStr.includes(kw)).length;
      const bMatches = keywords.filter(kw => bStr.includes(kw)).length;
      return bMatches - aMatches;
    });

    setResults(matched);
  };

  return (
    <div style={{ padding: '140px 6% 90px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '40px' }}>What Can I Make?</h1>
        <p style={{ color: 'var(--text-muted)' }}>Enter ingredients you have, and we'll suggest healthy meals.</p>
      </div>

      <div className="glass" style={{ maxWidth: '600px', margin: '0 auto 40px', padding: '20px', borderRadius: 'var(--radius-md)', display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          placeholder="e.g. Paneer, Tomato, Onion" 
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          style={{ padding: '12px 15px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--surface-border)', background: 'var(--bg-alt)', color: 'var(--text)', flex: 1 }}
        />
        <button className="btn btn-primary" onClick={handleSearch}>Find Meals</button>
      </div>

      <div className="grid">
        {results.length > 0 ? results.map((item) => (
          <FoodCard key={item.id} item={item} />
        )) : (
          hasSearched && <p style={{ textAlign: 'center', width: '100%', color: 'var(--text-muted)' }}>No exact matches found. Try entering simple ingredients like "Chicken", "Paneer", "Rice".</p>
        )}
      </div>
    </div>
  );
};

export default WhatCanIMake;
