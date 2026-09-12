import React, { useState, useEffect } from 'react';
import FoodCard from '../components/FoodCard';
import { menuData } from '../data/menu';

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('score-desc');

  const filters = ['All', 'High Protein', 'Vegan', 'Vegetarian', 'Indian', 'Europe', 'East Asia', 'Pescatarian', 'Low Calorie'];

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  let filtered = menuData.filter(item => {
    if (activeFilter !== 'All') {
      if (!item.tags || !item.tags.includes(activeFilter)) return false;
    }
    if (debouncedSearch) {
      if (!item.name.toLowerCase().includes(debouncedSearch.toLowerCase())) return false;
    }
    return true;
  });

  filtered.sort((a, b) => {
    if (sortBy === 'score-desc') return (b.healthyScore || 0) - (a.healthyScore || 0);
    if (sortBy === 'cal-asc') return (a.calories || 0) - (b.calories || 0);
    if (sortBy === 'protein-desc') return (b.protein || 0) - (a.protein || 0);
    return 0;
  });

  return (
    <div style={{ padding: '140px 6% 90px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '40px' }}>Explore Healthy Foods</h1>
        <p style={{ color: 'var(--text-muted)' }}>Find the perfect meal to hit your daily macros.</p>
      </div>

      <div className="glass" style={{ padding: '20px', borderRadius: 'var(--radius-md)', marginBottom: '30px', display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
        <input 
          type="text" 
          placeholder="Search foods..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px 15px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--surface-border)', background: 'var(--bg-alt)', color: 'var(--text)', flex: 1, minWidth: '200px' }}
        />
        
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '5px' }}>
          {filters.map(f => (
            <button 
              key={f} 
              className={`food-tag ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
              style={{ cursor: 'pointer', background: activeFilter === f ? 'var(--accent)' : 'var(--surface)', color: activeFilter === f ? '#fff' : 'var(--text-muted)' }}
            >
              {f}
            </button>
          ))}
        </div>

        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          style={{ padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--surface-border)', background: 'var(--bg-alt)', color: 'var(--text)' }}
        >
          <option value="score-desc">Sort by: Healthy Score</option>
          <option value="cal-asc">Sort by: Lowest Calories</option>
          <option value="protein-desc">Sort by: Highest Protein</option>
        </select>
      </div>

      <div className="grid">
        {filtered.length > 0 ? filtered.map((item) => (
          <FoodCard key={item.id} item={item} />
        )) : (
          <div className="empty-state" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>🔍</div>
            <h3>No matching foods found</h3>
            <p style={{ color: 'var(--text-muted)' }}>Try adjusting your filters or search term.</p>
            <button className="btn btn-secondary" style={{ marginTop: '20px' }} onClick={() => { setSearchTerm(''); setActiveFilter('All'); }}>Clear Filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
