import React from "react";
import "./HabitList.css";

const HabitList = ({ habits, onDeleteHabit, onEditHabit }) => {
  return (
    <div className="habit-list">
      <h3>Your Habits</h3>
      {habits.length === 0 ? (
        <p>No habits added yet.</p>
      ) : (
        habits.map((habit) => (
          <div className="habit-card" key={habit.id}>
            <h4>{habit.name}</h4>
            <p>{habit.description}</p>
            <p>
              <strong>Category:</strong> {habit.category}
            </p>
            <p>
              <strong>Type:</strong> {habit.type}
            </p>
            <p>
              <strong>Target:</strong> {habit.target}
            </p>
            <button onClick={() => onEditHabit(habit)}>Edit</button>
            <button onClick={() => onDeleteHabit(habit.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default HabitList;
