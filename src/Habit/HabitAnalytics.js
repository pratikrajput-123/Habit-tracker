import React from "react";
import "./HabitAnalytics.css";

const HabitAnalytics = ({ habits }) => {
  const totalHabits = habits.length;

  const habitsByCategory = habits.reduce((acc, habit) => {
    acc[habit.category] = (acc[habit.category] || 0) + 1;
    return acc;
  }, {});

  const habitsByType = habits.reduce((acc, habit) => {
    acc[habit.type] = (acc[habit.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="analytics-container">
      <h3 className="analytics-title">Analytics</h3>
      <p className="analytics-text">Total Habits: {totalHabits}</p>
      <div className="analytics-category">
        <h4>Habits by Category</h4>
        {Object.entries(habitsByCategory).map(([category, count]) => (
          <p key={category}>{category}: {count}</p>
        ))}
      </div>
      <div className="analytics-type">
        <h4>Habits by Type</h4>
        {Object.entries(habitsByType).map(([type, count]) => (
          <p key={type}>{type}: {count}</p>
        ))}
      </div>
    </div>
  );
};

export default HabitAnalytics;
