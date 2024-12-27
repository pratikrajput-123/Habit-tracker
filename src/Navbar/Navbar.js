import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/logo.png" alt="Habit Tracker Logo" className="logo" />
        <h1>HABIT TRACKER</h1>
      </div>
      <ul className="navbar-links">
        <li><a href="#home">HOME</a></li>
        <li><a href="#testimonials">TESTIMONIALS</a></li>
        <li><a href="#features">FEATURES</a></li>
        <li><a href="#services">SERVICES</a></li>
        <li><a href="#pricing">PRICING</a></li>
      </ul>
      <button className="track-button"><Link to="/habit-tracker">TRACK MY HABITS</Link></button>
    </nav>
  );
};

export default Navbar;
