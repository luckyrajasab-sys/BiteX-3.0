import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const safeParse = (key, fallback) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (e) {
      return fallback;
    }
  };

  // Auth & General
  const [userProfile, setUserProfile] = useState(() => safeParse('userProfile', null)); // null means not onboarded
  const [toast, setToast] = useState(null);

  // E-commerce (Cart, Favorites, Orders)
  const [cart, setCart] = useState(() => safeParse('cart', []));
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [favorites, setFavorites] = useState(() => safeParse('favorites', []));
  const [orders, setOrders] = useState(() => safeParse('orders', []));
  const [lastOrder, setLastOrder] = useState(() => localStorage.getItem('lastOrder') || '');

  // Gamification (BitePoints, Streaks)
  const [bitePoints, setBitePoints] = useState(() => {
    const bp = localStorage.getItem('bitePoints');
    return bp ? parseInt(bp) : 0;
  });
  const [streak, setStreak] = useState(() => {
    const s = localStorage.getItem('streak');
    return s ? parseInt(s) : 0;
  });

  // Health Tracking (Dashboard, Weekly Planner)
  const defaultWeeklyPlan = {
    Monday: { breakfast: [], lunch: [], snacks: [], dinner: [] },
    Tuesday: { breakfast: [], lunch: [], snacks: [], dinner: [] },
    Wednesday: { breakfast: [], lunch: [], snacks: [], dinner: [] },
    Thursday: { breakfast: [], lunch: [], snacks: [], dinner: [] },
    Friday: { breakfast: [], lunch: [], snacks: [], dinner: [] },
    Saturday: { breakfast: [], lunch: [], snacks: [], dinner: [] },
    Sunday: { breakfast: [], lunch: [], snacks: [], dinner: [] },
  };
  const [weeklyPlan, setWeeklyPlan] = useState(() => safeParse('weeklyPlan', defaultWeeklyPlan));
  const [consumedFoods, setConsumedFoods] = useState(() => safeParse('consumedFoods', []));
  const [waterGlasses, setWaterGlasses] = useState(() => {
    const w = localStorage.getItem('waterGlasses');
    return w ? parseInt(w) : 0;
  });

  // Effects to sync with LocalStorage
  useEffect(() => { localStorage.setItem('userProfile', JSON.stringify(userProfile)); }, [userProfile]);
  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('favorites', JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem('orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('lastOrder', lastOrder); }, [lastOrder]);
  useEffect(() => { localStorage.setItem('bitePoints', bitePoints); }, [bitePoints]);
  useEffect(() => { localStorage.setItem('streak', streak); }, [streak]);
  useEffect(() => { localStorage.setItem('weeklyPlan', JSON.stringify(weeklyPlan)); }, [weeklyPlan]);
  useEffect(() => { localStorage.setItem('consumedFoods', JSON.stringify(consumedFoods)); }, [consumedFoods]);
  useEffect(() => { localStorage.setItem('waterGlasses', waterGlasses); }, [waterGlasses]);

  // Methods
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2600);
  };

  const addBitePoints = (amount, reason) => {
    setBitePoints(prev => prev + amount);
    showToast(`+${amount} BitePoints: ${reason}`, 'success');
  };

  // Auth Methods
  const completeOnboarding = (profileData) => {
    setUserProfile(profileData);
    addBitePoints(50, 'Profile Completed');
  };
  const logout = () => {
    setUserProfile(null);
    showToast('Logged out successfully', 'info');
  };

  // Cart Methods
  const addToCart = (item, quantity = 1, notes = '') => {
    setCart((prev) => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        showToast(`Updated quantity for ${item.name}`);
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + quantity, notes: notes || i.notes } : i);
      }
      showToast(`${item.name} added to cart`);
      return [...prev, { ...item, quantity, notes }];
    });
  };
  const updateCartQuantity = (id, change) => {
    setCart((prev) => prev.map(item => {
      if (item.id === id) {
        const newQ = item.quantity + change;
        return newQ > 0 ? { ...item, quantity: newQ } : item;
      }
      return item;
    }));
  };
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter(i => i.id !== id));
    showToast('Item removed from cart');
  };
  const clearCart = () => setCart([]);

  const toggleFavorite = (item) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === item.id);
      if (exists) {
        showToast(`${item.name} removed from favorites`, 'warning');
        return prev.filter((f) => f.id !== item.id);
      } else {
        showToast(`${item.name} saved to favorites`);
        return [...prev, item];
      }
    });
  };
  const isFavorite = (id) => favorites.some((f) => f.id === id);

  const placeOrder = (paymentMethod, address) => {
    if (cart.length === 0) return false;
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + 40; 
    
    const newOrder = {
      id: 'BX' + Math.floor(100000 + Math.random() * 900000),
      items: cart,
      subtotal,
      deliveryFee: 40,
      total,
      paymentMethod,
      address,
      date: new Date().toISOString(),
      status: 'Placed',
    };
    setOrders((prev) => [newOrder, ...prev]);
    setLastOrder(newOrder.id);
    clearCart();
    return newOrder.id;
  };

  // Weekly Planner Methods
  const addFoodToWeeklyPlan = (day, mealType, item) => {
    setWeeklyPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: [...prev[day][mealType], item]
      }
    }));
    showToast(`${item.name} added to ${day}'s ${mealType}`);
  };
  const removeFoodFromWeeklyPlan = (day, mealType, index) => {
    setWeeklyPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: prev[day][mealType].filter((_, i) => i !== index)
      }
    }));
  };
  const replaceWeeklyPlan = (newPlan) => {
    setWeeklyPlan(newPlan);
    showToast('Diet plan successfully generated!');
  };

  // Health Logging
  const logFood = (item) => {
    setConsumedFoods(prev => [...prev, { ...item, loggedAt: new Date().toISOString() }]);
    addBitePoints(10, 'Meal Logged');
  };
  
  const logWater = () => {
    setWaterGlasses(prev => {
      if (prev + 1 === 8) addBitePoints(20, 'Daily Water Goal Met!');
      return prev + 1;
    });
  };

  const resetDashboard = () => {
    setConsumedFoods([]);
    setWaterGlasses(0);
    setStreak(prev => prev + 1);
    addBitePoints(5, 'New Day Streak');
  };

  const calculateDailyMacros = () => {
    return consumedFoods.reduce((acc, curr) => {
      return {
        calories: acc.calories + (curr.calories || 0),
        protein: acc.protein + (curr.protein || 0),
        carbs: acc.carbs + (curr.carbs || 0),
        fat: acc.fat + (curr.fat || 0),
        fibre: acc.fibre + (curr.fibre || 0),
      };
    }, { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 });
  };

  return (
    <AppContext.Provider
      value={{
        userProfile, setUserProfile, completeOnboarding, logout,
        bitePoints, setBitePoints, addBitePoints,
        streak, setStreak,
        cart, addToCart, updateCartQuantity, removeFromCart, clearCart,
        isCartOpen, setIsCartOpen,
        favorites, toggleFavorite, isFavorite,
        orders, placeOrder, lastOrder,
        toast, showToast,
        weeklyPlan, addFoodToWeeklyPlan, removeFoodFromWeeklyPlan, replaceWeeklyPlan,
        consumedFoods, logFood,
        waterGlasses, logWater,
        resetDashboard, calculateDailyMacros
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
