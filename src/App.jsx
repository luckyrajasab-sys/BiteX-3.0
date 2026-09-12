import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';

// Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import Explore from './pages/Explore';
import SmartSwaps from './pages/SmartSwaps';
import Dashboard from './pages/Dashboard';
import MealPlanner from './pages/MealPlanner';
import WhatCanIMake from './pages/WhatCanIMake';
import Assistant from './pages/Assistant';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import TrackOrder from './pages/TrackOrder';
import Login from './pages/Login';
import Signup from './pages/Signup';
import OrderSuccess from './pages/OrderSuccess';

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {!isAuthPage && <Navbar />}
      
      <main style={{ paddingTop: isAuthPage ? '0' : '90px', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/smart-swaps" element={<SmartSwaps />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/meal-planner" element={<MealPlanner />} />
          <Route path="/what-can-i-make" element={<WhatCanIMake />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}
      <Toast />
    </>
  );
};

const App = () => {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
};

export default App;
