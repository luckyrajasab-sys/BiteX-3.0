import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Explore from './pages/Explore';
import SmartSwaps from './pages/SmartSwaps';
import Dashboard from './pages/Dashboard';
import MealPlanner from './pages/MealPlanner';
import WhatCanIMake from './pages/WhatCanIMake';
import Assistant from './pages/Assistant';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import TrackOrder from './pages/TrackOrder';
import OrderSuccess from './pages/OrderSuccess';
import Favorites from './pages/Favorites';
import Restaurants from './pages/Restaurants';
import RestaurantDetail from './pages/RestaurantDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Toast from './components/Toast';

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/smart-swaps" element={<SmartSwaps />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/meal-planner" element={<MealPlanner />} />
          <Route path="/what-can-i-make" element={<WhatCanIMake />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Toast />
      </Router>
    </AppProvider>
  );
};

export default App;
