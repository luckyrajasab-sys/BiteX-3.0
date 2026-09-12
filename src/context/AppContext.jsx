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

  const [cart, setCart] = useState(() => safeParse('cart', []));
  const [favorites, setFavorites] = useState(() => safeParse('favorites', []));
  const [orders, setOrders] = useState(() => safeParse('orders', []));
  const [lastOrder, setLastOrder] = useState(() => localStorage.getItem('lastOrder') || '');
  const [toast, setToast] = useState(null); // { message, type }

  // New states for BiteX 3.0
  const [userGoal, setUserGoal] = useState(() => localStorage.getItem('userGoal') || 'Eat Healthier');
  
  const defaultMealPlan = { breakfast: [], lunch: [], snacks: [], dinner: [] };
  const [mealPlan, setMealPlan] = useState(() => safeParse('mealPlan', defaultMealPlan));
  
  const [consumedFoods, setConsumedFoods] = useState(() => safeParse('consumedFoods', []));
  const [waterGlasses, setWaterGlasses] = useState(() => {
    const w = localStorage.getItem('waterGlasses');
    return w ? parseInt(w) : 0;
  });

  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('favorites', JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem('orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('lastOrder', lastOrder); }, [lastOrder]);
  useEffect(() => { localStorage.setItem('userGoal', userGoal); }, [userGoal]);
  useEffect(() => { localStorage.setItem('mealPlan', JSON.stringify(mealPlan)); }, [mealPlan]);
  useEffect(() => { localStorage.setItem('consumedFoods', JSON.stringify(consumedFoods)); }, [consumedFoods]);
  useEffect(() => { localStorage.setItem('waterGlasses', waterGlasses); }, [waterGlasses]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2600);
  };

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
    showToast(`${item.name} added to cart`);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
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

  const placeOrder = () => {
    if (cart.length === 0) {
      showToast('Your cart is empty', 'danger');
      return false;
    }
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const newOrder = {
      id: 'BX' + Math.floor(100000 + Math.random() * 900000),
      items: cart,
      total,
      date: new Date().toISOString(),
      status: 'Preparing',
    };
    setOrders((prev) => [newOrder, ...prev]);
    setLastOrder(newOrder.id);
    clearCart();
    return true;
  };

  // New context methods
  const addFoodToMealPlan = (mealType, item) => {
    setMealPlan(prev => ({
      ...prev,
      [mealType]: [...prev[mealType], item]
    }));
    showToast(`${item.name} added to ${mealType}`);
  };

  const removeFoodFromMealPlan = (mealType, index) => {
    setMealPlan(prev => ({
      ...prev,
      [mealType]: prev[mealType].filter((_, i) => i !== index)
    }));
  };

  const logFood = (item) => {
    setConsumedFoods(prev => [...prev, { ...item, loggedAt: new Date().toISOString() }]);
    showToast(`Logged ${item.name} to Dashboard`);
  };

  const resetDashboard = () => {
    setConsumedFoods([]);
    setWaterGlasses(0);
    showToast('Dashboard reset for a new day!', 'info');
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
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        favorites,
        toggleFavorite,
        isFavorite,
        orders,
        placeOrder,
        lastOrder,
        toast,
        showToast,
        userGoal,
        setUserGoal,
        mealPlan,
        addFoodToMealPlan,
        removeFoodFromMealPlan,
        consumedFoods,
        logFood,
        waterGlasses,
        setWaterGlasses,
        resetDashboard,
        calculateDailyMacros
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
