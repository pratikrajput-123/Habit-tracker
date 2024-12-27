import React, { useState } from "react";
import "./HabitTracker.css";
import { X, Edit2, Trash2 } from 'lucide-react';

const HabitTracker = () => {
  const [habitsByMonth, setHabitsByMonth] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [newHabit, setNewHabit] = useState({ name: "", goal: 0 });
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  // Helper function to format month as a string
  const getMonthName = (monthIndex) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[monthIndex];
  };

  // Adds a new habit to the selected month's list of habits
  const addHabit = () => {
    const monthName = getMonthName(selectedMonth.getMonth());
    const updatedHabits = [...(habitsByMonth[monthName] || [])];
    updatedHabits.push({
      name: newHabit.name,
      goal: parseInt(newHabit.goal),
      achieved: 0,
      days: Array(31).fill(false), // 31 days, all unmarked
      scores: Array(31).fill(0), // 31 days, scores initialized to 0
      archived: false, // New habit starts as active
      percentage: 0, // New percentage field
    });
    setHabitsByMonth({
      ...habitsByMonth,
      [monthName]: updatedHabits,
    });
    setNewHabit({ name: "", goal: 0 });
    setShowModal(false);
  };

  // Toggles day completion for a habit
  const toggleDay = (habitIndex, dayIndex, monthName) => {
    const updatedHabits = [...habitsByMonth[monthName]];
    const habit = updatedHabits[habitIndex];
    habit.days[dayIndex] = !habit.days[dayIndex];

    // Recalculate achieved goals and percentage
    habit.achieved = habit.days.filter((day) => day).length;
    habit.percentage = habit.goal > 0 ? Math.floor((habit.achieved / habit.goal) * 100) : 0;

    setHabitsByMonth({
      ...habitsByMonth,
      [monthName]: updatedHabits,
    });
  };

  // Updates score for a specific day
  const updateScore = (habitIndex, dayIndex, value, monthName) => {
    const updatedHabits = [...habitsByMonth[monthName]];
    const habit = updatedHabits[habitIndex];
    habit.scores[dayIndex] = parseInt(value) || 0;

    setHabitsByMonth({
      ...habitsByMonth,
      [monthName]: updatedHabits,
    });
  };

  // Delete habit
  const deleteHabit = (habitIndex, monthName) => {
    const updatedHabits = habitsByMonth[monthName].filter((_, index) => index !== habitIndex);
    setHabitsByMonth({
      ...habitsByMonth,
      [monthName]: updatedHabits,
    });
  };

  // Edit habit
  const editHabit = (habitIndex, monthName) => {
    const habit = habitsByMonth[monthName][habitIndex];
    if (!habit.archived) { // Only allow edit if the habit is not archived
      setNewHabit({ name: habit.name, goal: habit.goal });
      deleteHabit(habitIndex, monthName); // Remove the habit first to update it
      setShowModal(true); // Open modal to edit
    }
  };

 
  // Generate days in the month (1 to 31)
  const daysInMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0).getDate();

  // Helper function to divide days into weeks (to show days correctly)
  const getWeeks = () => {
    const weeks = [];
    const days = [...Array(daysInMonth).keys()].map(day => day + 1);
    while (days.length) {
      weeks.push(days.splice(0, 7)); // Split days into chunks of 7
    }
    return weeks;
  };

  const weeks = getWeeks();
  const monthName = getMonthName(selectedMonth.getMonth());

  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [editingNoteIndex, setEditingNoteIndex] = useState(null);

  const formatDateTime = (date) => {
    const options = { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    return new Date(date).toLocaleString('en-US', options);
  };

  const handleSave = () => {
    if (noteText.trim()) {
      const currentTime = new Date().toISOString();
      
      if (editingNoteIndex !== null) {
        // Edit existing note
        const updatedNotes = [...notes];
        updatedNotes[editingNoteIndex] = {
          ...updatedNotes[editingNoteIndex],
          content: noteText,
          updatedAt: currentTime
        };
        setNotes(updatedNotes);
        setEditingNoteIndex(null);
      } else {
        // Add new note
        setNotes([...notes, {
          content: noteText,
          createdAt: currentTime,
          updatedAt: currentTime
        }]);
      }
      setNoteText('');
      setIsNoteDialogOpen(false);
    }
  };

  const handleEditNote = (index) => {
    setNoteText(notes[index].content);
    setEditingNoteIndex(index);
    setIsNoteDialogOpen(true);
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  const handleCloseModal = () => {
    setIsNoteDialogOpen(false);
    setNoteText('');
    setEditingNoteIndex(null);
  };

  return (
    <div className="habit-tracker">
      <div className="header">
        <button
          className="month-btn"
          onClick={() =>
            setSelectedMonth(
              new Date(selectedMonth.setMonth(selectedMonth.getMonth() - 1))
            )
          }
        >
          {"<"}
        </button>
        <h3>
          {selectedMonth.toLocaleString("default", { month: "long" })},{" "}
          {selectedMonth.getFullYear()}
        </h3>
        <button
          className="month-btn"
          onClick={() =>
            setSelectedMonth(
              new Date(selectedMonth.setMonth(selectedMonth.getMonth() + 1))
            )
          }
        >
          {">"}
        </button>
      </div>

      <table className="calendar">
        <thead>
          <tr>
            <th style={{ width: "140px" }}>Habits</th>
            {/* Days of the month (1 to 31) */}
            {[...Array(31).keys()].map((day) => (
              <th key={day} className="date-header">{day + 1}</th>
            ))}
            <th>Goal</th>
            <th style={{width:"30px"}}>Ach</th>
            <th style={{width:"40px"}}>%</th> {/* New Percentage Column */}
          </tr>
        </thead>
        <tbody>
          {habitsByMonth[monthName]?.map((habit, habitIndex) => (
            !habit.archived && (
              <React.Fragment key={habitIndex}>
                {/* Row for checkboxes */}
                <tr className="habit-row">
                  <td className="habit-name">
                    {habit.name}
                    <div className="habit-options">
                      {!habit.archived && (
                        <i
                          className="fas fa-edit edit-icon"
                          onClick={() => editHabit(habitIndex, monthName)}
                        />
                      )}
                      <i
                        className="fas fa-trash delete-icon"
                        onClick={() => deleteHabit(habitIndex, monthName)}
                      />
                      
                    </div>
                  </td>
                  {/* Render the days of the habit */}
                  {[...Array(31).keys()].map((dayIndex) => (
                    <td
                      key={dayIndex}
                      className={`day-cell ${habit.days[dayIndex] ? "completed" : ""}`}
                      onClick={() => toggleDay(habitIndex, dayIndex, monthName)}
                    >
                      {habit.days[dayIndex] && "✔"}
                    </td>
                  ))}
                  <td>{habit.goal}</td>
                  <td>{habit.achieved}</td>
                  <td>{habit.percentage}%</td> {/* Display Percentage */}
                </tr>
                {/* Row for scores */}
                <tr>
                  <td>Scores(Out of 10)</td>
                  {habit.scores.map((score, dayIndex) => (
                    <td key={dayIndex}>
                      <input
                        type="number"
                        className="score-input"
                        value={score}
                        min="0"
                        max="10"
                        step="1"
                        onChange={(e) =>
                          updateScore(habitIndex, dayIndex, e.target.value, monthName)
                        }
                      />
                    </td>
                  ))}
                </tr>
              </React.Fragment>
            )
          ))}
        </tbody>
      </table>

      <button className="add-habit-btn" onClick={() => setShowModal(true)}>
        + New Habit
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>{newHabit.name ? "Edit Habit" : "Add New Habit"}</h3>
            <input
              type="text"
              placeholder="Habit Name"
              value={newHabit.name}
              onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Goal (e.g., 10)"
              value={newHabit.goal}
              onChange={(e) => setNewHabit({ ...newHabit, goal: e.target.value })}
            />
            <button onClick={addHabit}>Add Habit</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="notes-container">
        <div className="notes-header">
          <h1 className="notes-title">Notes</h1>
        </div>

        <div className="notes-content">
          {notes.length === 0 ? (
            <div className="notes-empty-state">
              <p className="empty-state-text">
                Create your first note by clicking on + New Note
              </p>
              <button
                onClick={() => setIsNoteDialogOpen(true)}
                className="new-note-button"
              >
                + New Note
              </button>
            </div>
          ) : (
            <div className="notes-list-container">
              <div className="notes-list">
                {notes.map((note, index) => (
                  <div key={index} className="note-item">
                    <div className="note-main-content">
                      <div className="note-timestamps">
                        <span className="timestamp created-at">
                          Created: {formatDateTime(note.createdAt)}
                        </span>
                        {note.updatedAt !== note.createdAt && (
                          <span className="timestamp updated-at">
                            Updated: {formatDateTime(note.updatedAt)}
                          </span>
                        )}
                      </div>
                      <div className="note-content">{note.content}</div>
                    </div>
                    <div className="note-actions">
                      <button
                        onClick={() => handleEditNote(index)}
                        className="note-action-button"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteNote(index)}
                        className="note-action-button"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="add-note-container">
                <button
                  onClick={() => setIsNoteDialogOpen(true)}
                  className="new-note-button"
                >
                  + New Note
                </button>
              </div>
            </div>
          )}
        </div>

        {isNoteDialogOpen && (
          <div className="notes-modal-overlay">
            <div className="notes-modal">
              <div className="modal-header">
                <h2 className="modal-title">
                  {editingNoteIndex !== null ? 'Edit Note' : 'Create New Note'}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="close-button"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="modal-content">
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Write your thoughts"
                  className="note-textarea"
                />
                
                <div className="save-button-container">
                  <button onClick={handleSave} className="save-button">
                    {editingNoteIndex !== null ? 'Update' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default HabitTracker;