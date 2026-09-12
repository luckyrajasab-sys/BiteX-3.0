import React, { useState, useEffect } from 'react';
import FoodCard from '../components/FoodCard';
import { menuData } from '../data/menu';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const isSearching = debouncedSearch.length > 0;
  
  // Filter for search mode
  const searchResults = isSearching ? menuData.filter(item => 
    item.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    (item.tags && item.tags.some(t => t.toLowerCase().includes(debouncedSearch.toLowerCase())))
  ) : [];

  // Grouped sections when NOT searching
  const sections = [
    {
      title: '🌟 Popular & Trending',
      subtitle: 'Most ordered meals by BiteX users today',
      items: menuData.slice(0, 6) // Mocking popular items
    },
    {
      title: '💪 High Protein Power',
      subtitle: 'Fuel your muscles with 30g+ protein meals',
      items: menuData.filter(i => i.protein >= 30 || (i.tags && i.tags.includes('High Protein'))).slice(0, 6)
    },
    {
      title: '🍛 Authentic Indian',
      subtitle: 'Healthy twists on classic Indian flavors',
      items: menuData.filter(i => i.category === 'indian' || (i.tags && i.tags.includes('Indian'))).slice(0, 6)
    },
    {
      title: '🥗 Low Calorie Light Bites',
      subtitle: 'Delicious meals under 400 calories',
      items: menuData.filter(i => i.calories <= 400).slice(0, 6)
    }
  ];

  return (
    <div style={{ position: 'relative', minHeight: '100vh', paddingBottom: '90px' }}>
      
      {/* Ambient Parallax Background */}
      <div 
        style={{ 
          position: 'fixed', 
          top: 0, left: 0, width: '100%', height: '100vh', 
          backgroundImage: 'url(https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=2000&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: 0.08,
          zIndex: -1,
          pointerEvents: 'none'
        }} 
      />

      {/* Content Wrapper */}
      <div style={{ paddingTop: '120px', paddingLeft: '6%', paddingRight: '6%', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header & Search */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '48px', margin: '0 0 10px' }}>Explore the Menu</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '18px', maxWidth: '500px', margin: '0 auto 30px' }}>
            Discover hundreds of nutritious, chef-prepared meals tailored to your diet.
          </p>
          
          <div 
            className="glass hover-scale" 
            style={{ 
              position: 'sticky', top: '80px', zIndex: 100,
              display: 'flex', alignItems: 'center', maxWidth: '600px', margin: '0 auto',
              padding: '12px 24px', borderRadius: '100px', border: '1px solid var(--surface-border)'
            }}
          >
            <Search size={20} color="var(--text-muted)" style={{ marginRight: '15px' }} />
            <input 
              type="text" 
              placeholder="Search by name, cuisine, or tag..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ 
                border: 'none', background: 'transparent', color: 'var(--text)', 
                fontSize: '16px', outline: 'none', flex: 1 
              }}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                style={{ background: 'var(--surface)', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', color: 'var(--text)' }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* View Mode: Search Results OR Categorized Sections */}
        {isSearching ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 style={{ marginBottom: '30px' }}>Search Results for "{debouncedSearch}"</h2>
            <div className="food-grid">
              {searchResults.length > 0 ? searchResults.map(item => (
                <FoodCard key={item.id} item={item} />
              )) : (
                <div className="empty-state" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px' }}>
                  <div style={{ fontSize: '60px', marginBottom: '20px' }}>🔍</div>
                  <h3>No matching foods found</h3>
                  <p style={{ color: 'var(--text-muted)' }}>Try searching for "Chicken", "Vegan", or "Salad".</p>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
            {sections.map((section, idx) => (
              <motion.section 
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-display)', margin: 0, fontSize: '28px' }}>{section.title}</h2>
                    <p style={{ color: 'var(--text-muted)', margin: '5px 0 0' }}>{section.subtitle}</p>
                  </div>
                  <button style={{ background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 'bold', cursor: 'pointer' }} className="hover-scale">
                    See All →
                  </button>
                </div>
                
                {/* Horizontal Scroll Container */}
                <div style={{ 
                  display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '20px', 
                  scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', margin: '0 -20px', padding: '10px 20px'
                }}>
                  {section.items.map(item => (
                    <div key={item.id} style={{ minWidth: '300px', maxWidth: '320px', scrollSnapAlign: 'start' }}>
                      <FoodCard item={item} />
                    </div>
                  ))}
                  {section.items.length === 0 && (
                     <div style={{ padding: '20px', color: 'var(--text-muted)' }}>No items in this category yet.</div>
                  )}
                </div>
              </motion.section>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Explore;
