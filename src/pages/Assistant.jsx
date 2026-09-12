import React, { useState } from 'react';
import FoodCard from '../components/FoodCard';
import { menuData } from '../data/menu';

const Assistant = () => {
  const [query, setQuery] = useState('');
  const [chatLog, setChatLog] = useState([
    { role: 'assistant', text: 'Hi! I am your nutrition assistant. Ask me things like "Give me a high protein lunch" or "What is a healthy alternative to fries?"', items: [] }
  ]);

  const handleSend = () => {
    if (!query.trim()) return;

    const userMessage = { role: 'user', text: query, items: [] };
    const newLog = [...chatLog, userMessage];
    
    // Simple mock intent matching
    const q = query.toLowerCase();
    let replyText = "I'm not sure about that. Try asking for 'high protein', 'low calorie', 'Indian', or 'healthy alternative to burger'.";
    let replyItems = [];

    if (q.includes('protein')) {
      replyText = "Here are some high protein options for you to build muscle and stay full!";
      replyItems = menuData.filter(m => m.tags?.includes('High Protein')).slice(0, 2);
    } else if (q.includes('low calorie') || q.includes('lose fat') || q.includes('500 calorie')) {
      replyText = "Here are some great low-calorie options that won't break your diet.";
      replyItems = menuData.filter(m => m.tags?.includes('Low Calorie') || m.calories < 400).slice(0, 2);
    } else if (q.includes('indian')) {
      replyText = "Indian cuisine has amazing healthy options. Here are some of my favorites!";
      replyItems = menuData.filter(m => m.tags?.includes('Indian')).slice(0, 2);
    } else if (q.includes('alternative') || q.includes('swap') || q.includes('instead of')) {
      replyText = "Small swaps can make a big difference! Check these out.";
      replyItems = menuData.filter(m => m.healthyScore > 80).slice(0, 2);
    }

    const assistantMessage = { role: 'assistant', text: replyText, items: replyItems };
    
    setChatLog([...newLog, assistantMessage]);
    setQuery('');
  };

  return (
    <div style={{ padding: '140px 6% 90px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '36px' }}>AI Nutrition Assistant</h1>
      </div>

      <div className="glass" style={{ borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', height: '60vh' }}>
        
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {chatLog.map((msg, idx) => (
            <div key={idx} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
              <div style={{
                background: msg.role === 'user' ? 'var(--accent)' : 'var(--bg-alt)',
                color: '#fff',
                padding: '12px 16px',
                borderRadius: '16px',
                borderBottomRightRadius: msg.role === 'user' ? '4px' : '16px',
                borderBottomLeftRadius: msg.role === 'assistant' ? '4px' : '16px',
                border: msg.role === 'assistant' ? '1px solid var(--surface-border)' : 'none'
              }}>
                {msg.text}
              </div>
              
              {msg.items.length > 0 && (
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
                  {msg.items.map(item => (
                    <div key={item.id} style={{ minWidth: '220px', flex: '0 0 auto' }}>
                      <FoodCard item={item} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ padding: '15px', borderTop: '1px solid var(--surface-border)', display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Ask your nutrition assistant..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            style={{ padding: '12px 15px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--surface-border)', background: 'var(--bg)', color: 'var(--text)', flex: 1 }}
          />
          <button className="btn btn-primary" onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
