import { useState, useEffect } from 'react';
import './Upcoming.css';

export default function UpcomingTasks() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');

  // Generate week days with dates
  const generateWeekDays = (date) => {
    const days = [];
    const currentDay = new Date(date);
    // Find Monday of the current week
    const dayOfWeek = currentDay.getDay();
    const diff = currentDay.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust for Sunday
    currentDay.setDate(diff);
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(currentDay);
      day.setDate(currentDay.getDate() + i);
      days.push(day);
    }
    return days;
  };

  // Format date as "DD Mon"
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  };

  // Format weekday with date as "Mon 1"
  const formatWeekdayWithDate = (date) => {
    const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
    const day = date.getDate();
    return `${weekday} ${day}`;
  };

  // Initialize or update days data
  useEffect(() => {
    const weekDays = generateWeekDays(currentDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const initialDays = weekDays.map((day) => {
      const isToday = day.toDateString() === today.toDateString();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const isTomorrow = day.toDateString() === tomorrow.toDateString();

      return {
        date: formatDate(day),
        title: isToday ? 'Today' : isTomorrow ? 'Tomorrow' : day.toLocaleDateString('en-US', { weekday: 'long' }),
        dateObj: new Date(day),
        tasks: [],
        showAdd: false
      };
    });

    // Sample tasks for demonstration
    if (initialDays.length > 0) {
      initialDays[0].tasks = [
        { id: 1, text: 'Research content ideas', done: false },
        { id: 2, text: 'Create a database of guest authors', done: false },
        { id: 3, text: "Renew driver's license", done: false, details: "5/22/2023 Subtasks Personal" }
      ];
    }
    if (initialDays.length > 1) {
      initialDays[1].tasks = [
        { id: 4, text: 'Consult accountant', done: false, details: "Subtasks List" },
        { id: 5, text: 'Print business card', done: false }
      ];
    }

    setDays(initialDays);
  }, [currentDate]);

  const toggleTask = (dayIndex, taskId) => {
    setDays(prevDays => prevDays.map((day, dIndex) => {
      if (dIndex === dayIndex) {
        return {
          ...day,
          tasks: day.tasks.map(task => 
            task.id === taskId ? { ...task, done: !task.done } : task
          )
        };
      }
      return day;
    }));
  };

  const addTask = (dayIndex) => {
    if (newTaskText.trim()) {
      setDays(prevDays => prevDays.map((day, dIndex) => {
        if (dIndex === dayIndex) {
          return {
            ...day,
            tasks: [
              ...day.tasks,
              {
                id: Date.now(),
                text: newTaskText,
                done: false,
                date: day.dateObj
              }
            ],
            showAdd: false
          };
        }
        return day;
      }));
      setNewTaskText('');
    }
  };

  const showAddTaskInput = (dayIndex) => {
    setDays(prevDays => prevDays.map((day, dIndex) => ({
      ...day,
      showAdd: dIndex === dayIndex
    })));
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  return (
    <div className="upcoming-tasks">
      <div className="header-container">
        <h1>Upcoming</h1>
        <div className="week-navigation">
          <button onClick={() => navigateWeek('prev')}>← Previous Week</button>
          <h2>{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h2>
          <button onClick={() => navigateWeek('next')}>Next Week →</button>
        </div>
      </div>

      <div className="week-grid">
        {days.length > 0 && days.map((day, index) => (
          <div key={index} className="day-cell">
            {formatWeekdayWithDate(day.dateObj)}
          </div>
        ))}
      </div>

      <div className="divider"></div>

      {days.map((day, dayIndex) => (
        <div key={`${day.date}-${dayIndex}`} className="day-section">
          <div className="day-header">
            <h3>{day.date} - {day.title}</h3>
            <button 
              className="add-task-button"
              onClick={() => showAddTaskInput(dayIndex)}
            >
              + Add Task
            </button>
          </div>
          
          <ul className="tasks-list">
            {day.tasks.map((task) => (
              <li 
                key={task.id}
                className={`task-item ${task.done ? 'done' : ''}`}
                onClick={() => toggleTask(dayIndex, task.id)}
              >
                <span className="task-marker">
                  <input 
                    type="checkbox" 
                    checked={task.done}
                    onChange={() => toggleTask(dayIndex, task.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </span>
                <span className="task-text">
                  {task.text}
                  {task.details && <div className="task-details">{task.details}</div>}
                </span>
              </li>
            ))}
            
            {day.showAdd && (
              <li className="add-task-input">
                <input
                  type="text"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTask(dayIndex)}
                  onBlur={() => addTask(dayIndex)}
                  placeholder="Enter task description..."
                  autoFocus
                />
              </li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
} 