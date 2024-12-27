import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import './App.css';
import Home from './Home/Home';
import Pricing from './Pricing/Pricing'
import Habit from './Habit/HabitTracker';
import {useState} from 'react';
import HabitTracker from './Habit/HabitTracker';
const App = () => {

  return (
    <div>
      <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/habit-tracker" element={<HabitTracker />} />
          </Routes>
      </Router>
    </div>
  );
};

export default App;
