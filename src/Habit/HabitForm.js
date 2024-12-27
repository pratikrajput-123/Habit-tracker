import React, { useState, useEffect } from "react";
import "./HabitForm.css";

const HabitForm = ({ onAddHabit, onEditHabit, editingHabit }) => {
  const [habitData, setHabitData] = useState({
    id: "",
    name: "",
    description: "",
    category: "Meditation",
    type: "numeric",
    target: "",
  });

  useEffect(() => {
    if (editingHabit) {
      setHabitData(editingHabit);
    }
  }, [editingHabit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHabitData({ ...habitData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingHabit) {
      onEditHabit(habitData);
    } else {
      onAddHabit({ ...habitData, id: Date.now() });
    }
    setHabitData({
      id: "",
      name: "",
      description: "",
      category: "Meditation",
      type: "numeric",
      target: "",
    });
  };

  return (
    <form className="habit-form" onSubmit={handleSubmit}>
  <h3 className="habit-form__title">{editingHabit ? "Edit Habit" : "Add Habit"}</h3>
  <input 
    type="text"
    name="name"
    value={habitData.name}
    onChange={handleChange}
    placeholder="Habit Name"
    className="habit-form__input habit-form__input--text"
    required
  />
  <textarea
    name="description"
    value={habitData.description}
    onChange={handleChange}
    placeholder="Description"
    className="habit-form__textarea"
  ></textarea>
  <select
    name="category"
    value={habitData.category}
    onChange={handleChange}
    className="habit-form__select"
  >
    <option value="Meditation">Meditation</option>
    <option value="Sports">Sports</option>
    <option value="Work">Work</option>
    <option value="Home">Home</option>
  </select>
  <select
    name="type"
    value={habitData.type}
    onChange={handleChange}
    className="habit-form__select"
  >
    <option value="numeric">Numeric</option>
    <option value="yes-no">Yes/No</option>
    <option value="timer">Timer</option>
  </select>
  <input
    type="text"
    name="target"
    value={habitData.target}
    onChange={handleChange}
    placeholder={
      habitData.type === "numeric"
        ? "Target (e.g., 10 times)"
        : habitData.type === "timer"
        ? "Time (e.g., 30 mins)"
        : "Yes or No"
    }
    className="habit-form__input habit-form__input--target"
    required
  />
  <button type="submit" className="habit-form__button">
    {editingHabit ? "Save Changes" : "Add Habit"}
  </button>
</form>

  );
};

export default HabitForm;
