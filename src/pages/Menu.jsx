import React, { useState } from 'react';
import FoodCard from '../components/FoodCard';
import { menuData } from '../data/menu';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'pizza', label: 'Pizza' },
  { id: 'burger', label: 'Burgers' },
  { id: 'indian', label: 'Indian' },
  { id: 'chinese', label: 'Chinese' },
  { id: 'seafood', label: 'Seafood' },
  { id: 'salad', label: 'Salads' },
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'dessert', label: 'Desserts' },
  { id: 'drinks', label: 'Drinks' },
  { id: 'sides', label: 'Sides' }
];

const Menu = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredMenu = menuData.filter((item) => {
    const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <section className="section">
      <h2 className="section-title">Full Menu</h2>
      <p className="section-sub">100 dishes across 10 cuisines — search or filter to find exactly what you're craving.</p>

      <div className="menu-toolbar">
        <input
          id="menu-search"
          className="search-box"
          type="text"
          placeholder="Search 100+ dishes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="filter-chips">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-chip ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="food-grid">
        {filteredMenu.length > 0 ? (
          filteredMenu.map((item, index) => (
            <FoodCard key={index} item={item} />
          ))
        ) : (
          <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
            <div className="empty-icon">🍽️</div>
            <h3>No matches found</h3>
            <p>Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;
