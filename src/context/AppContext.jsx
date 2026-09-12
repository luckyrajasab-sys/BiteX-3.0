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

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('lastOrder', lastOrder);
  }, [lastOrder]);

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
      const exists = prev.some((f) => f.name === item.name);
      if (exists) {
        showToast(`${item.name} removed from favorites`, 'warning');
        return prev.filter((f) => f.name !== item.name);
      } else {
        showToast(`${item.name} saved to favorites`);
        return [...prev, { name: item.name, price: item.price, img: item.img }];
      }
    });
  };

  const isFavorite = (name) => favorites.some((f) => f.name === name);

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
