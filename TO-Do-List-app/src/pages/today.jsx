import React, { useState, useRef } from "react";
import "./today.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([
    { 
      id: 1,
      text: "Research content ideas", 
      category: "",
      description: "Find trending topics in our industry",
      project: "Work",
      date: "",
      priority: "P4",
      labels: [],
      reminders: [],
      location: "",
      comments: []
    },
    { 
      id: 2,
      text: "Create a database of guest authors", 
      category: "",
      description: "Collect contact info and expertise areas",
      project: "Work",
      date: "",
      priority: "P3",
      labels: [],
      reminders: [],
      location: "",
      comments: []
    },
    { 
      id: 3,
      text: "Renew driver's license", 
      category: "Personal", 
      date: "2023-05-22", 
      hasSubtasks: true,
      description: "Bring ID and payment to DMV",
      project: "Personal",
      priority: "P1",
      labels: ["Urgent"],
      reminders: ["1 day before"],
      location: "Local DMV",
      comments: ["Check online appointment availability"]
    },
    { 
      id: 4,
      text: "Consult accountant", 
      category: "List", 
      hasSubtasks: true,
      description: "Ask about tax deductions for Q3",
      project: "Finance",
      date: "",
      priority: "P2",
      labels: ["Important"],
      reminders: [],
      location: "",
      comments: []
    },
    { 
      id: 5,
      text: "Print business card", 
      category: "",
      description: "Order 500 premium quality cards",
      project: "Work",
      date: "",
      priority: "P4",
      labels: [],
      reminders: [],
      location: "",
      comments: []
    }
  ]);
  
  const [checkedItems, setCheckedItems] = useState({});
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDetailDatePicker, setShowDetailDatePicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [newTask, setNewTask] = useState({
    text: "",
    description: "",
    project: "",
    date: "",
    priority: "P4",
    labels: [],
    reminders: [],
    location: "",
    comments: []
  });
  const clickTimeoutRef = useRef(null);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  };

  const renderCalendarDays = (selectedDate, onDateSelect) => {
    const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const startDay = monthStart.getDay();
    const daysInMonth = monthEnd.getDate();

    const days = [];
    
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
      const dateString = date.toISOString().split('T')[0];
      days.push(
        <div 
          key={dateString}
          className={`calendar-day ${selectedDate === dateString ? 'selected' : ''}`}
          onClick={() => onDateSelect(dateString)}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  const handleCheck = (id) => {
    setCheckedItems({ ...checkedItems, [id]: !checkedItems[id] });
  };

  const handleTaskClick = (task) => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
      setSelectedTask(task);
    } else {
      clickTimeoutRef.current = setTimeout(() => {
        clickTimeoutRef.current = null;
        handleCheck(task.id);
      }, 300);
    }
  };

  const handleCloseDetail = () => {
    setSelectedTask(null);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    setSelectedTask(null);
  };

  const handleAddTask = () => {
    if (newTask.text.trim()) {
      const task = {
        id: tasks.length + 1,
        ...newTask,
        category: "",
        hasSubtasks: Boolean(newTask.description)
      };
      setTasks([...tasks, task]);
      setNewTask({
        text: "",
        description: "",
        project: "",
        date: "",
        priority: "P4",
        labels: [],
        reminders: [],
        location: "",
        comments: []
      });
      setShowModal(false);
    }
  };

  return (
    <div className="todo-container">
      <h2>Today <span className="task-count">{tasks.length}</span></h2>
      <button className="add-task" onClick={() => setShowModal(true)}>
        + Add New Task
      </button>
      
      <ul className="task-list">
        {tasks.map((task) => (
          <li 
            key={task.id} 
            className="task-item"
            onClick={() => handleTaskClick(task)}
          >
            <input 
              type="checkbox" 
              checked={checkedItems[task.id] || false} 
              onChange={(e) => {
                e.stopPropagation();
                handleCheck(task.id);
              }}
              className="task-checkbox"
            />
            <span className={`task-text ${checkedItems[task.id] ? 'completed' : ''}`}>
              {task.text}
            </span>
            {task.date && (
              <span className="task-date">
                {formatDate(task.date)}
              </span>
            )}
            {task.hasSubtasks && <span className="task-subtasks">Subtasks</span>}
            {task.category && <span className="task-category">{task.category}</span>}
          </li>
        ))}
      </ul>

      {selectedTask && (
        <div className="detail-overlay">
          <div className="task-detail">
            <div className="detail-header">
              <h3>{selectedTask.text}</h3>
              <div>
                <button 
                  className="action-button delete-button"
                  onClick={() => handleDeleteTask(selectedTask.id)}
                >
                  🗑️ Delete
                </button>
                <button className="close-button" onClick={handleCloseDetail}>×</button>
              </div>
            </div>
            
            <div className="detail-content">
              {selectedTask.description && (
                <div className="detail-description">
                  <label>Description</label>
                  <div className="description-text">
                    {selectedTask.description.split('\n').map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="detail-options">
                <div className="option-row">
                  <label>Project</label>
                  <div 
                    className="option-value clickable" 
                    onClick={() => {
                      const newProject = prompt("Enter project name:", selectedTask.project);
                      if (newProject !== null) {
                        const updatedTask = {
                          ...selectedTask,
                          project: newProject
                        };
                        setTasks(tasks.map(t => t.id === selectedTask.id ? updatedTask : t));
                        setSelectedTask(updatedTask);
                      }
                    }}
                  >
                    {selectedTask.project || <span className="add-placeholder">+ Add project</span>}
                  </div>
                </div>
                
                <div className="option-row">
                  <label>Date</label>
                  <div className="option-value">
                    {selectedTask.date ? (
                      <span 
                        className="clickable"
                        onClick={() => setShowDetailDatePicker(!showDetailDatePicker)}
                      >
                        {formatDate(selectedTask.date)}
                      </span>
                    ) : (
                      <span 
                        className="clickable add-placeholder"
                        onClick={() => setShowDetailDatePicker(!showDetailDatePicker)}
                      >
                        + Add date
                      </span>
                    )}
                    {showDetailDatePicker && (
                      <div className="calendar-popup">
                        <div className="calendar-container">
                          <div className="calendar-header">
                            <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}>
                              &lt;
                            </button>
                            <h4>
                              {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
                            </h4>
                            <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}>
                              &gt;
                            </button>
                          </div>
                          <div className="calendar-weekdays">
                            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                              <div key={day}>{day}</div>
                            ))}
                          </div>
                          <div className="calendar-days">
                            {renderCalendarDays(selectedTask.date, (date) => {
                              const updatedTask = {...selectedTask, date};
                              setTasks(tasks.map(t => t.id === selectedTask.id ? updatedTask : t));
                              setSelectedTask(updatedTask);
                              setShowDetailDatePicker(false);
                            })}
                          </div>
                          <div className="calendar-footer">
                            <button onClick={() => {
                              const updatedTask = {...selectedTask, date: ''};
                              setTasks(tasks.map(t => t.id === selectedTask.id ? updatedTask : t));
                              setSelectedTask(updatedTask);
                              setShowDetailDatePicker(false);
                            }}>
                              Clear
                            </button>
                            <button onClick={() => {
                              const today = new Date().toISOString().split('T')[0];
                              const updatedTask = {...selectedTask, date: today};
                              setTasks(tasks.map(t => t.id === selectedTask.id ? updatedTask : t));
                              setSelectedTask(updatedTask);
                              setShowDetailDatePicker(false);
                            }}>
                              Today
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="option-row">
                  <label>Priority</label>
                  <div 
                    className="priority-option clickable"
                    onClick={() => {
                      const newPriority = prompt(
                        "Set priority (P1-P4):\nP1 = Highest\nP2 = High\nP3 = Medium\nP4 = Low", 
                        selectedTask.priority
                      );
                      if (newPriority && ['P1','P2','P3','P4'].includes(newPriority)) {
                        const updatedTask = {
                          ...selectedTask,
                          priority: newPriority
                        };
                        setTasks(tasks.map(t => t.id === selectedTask.id ? updatedTask : t));
                        setSelectedTask(updatedTask);
                      }
                    }}
                  >
                    <span className={`priority-icon priority-${selectedTask.priority}`}>☐</span>
                    <span className="priority-value">{selectedTask.priority}</span>
                  </div>
                </div>
                
                <div className="option-row">
                  <label>Location</label>
                  <div className="option-value clickable"
                    onClick={() => {
                      const newLocation = prompt("Enter location:", selectedTask.location);
                      if (newLocation !== null) {
                        const updatedTask = {
                          ...selectedTask,
                          location: newLocation
                        };
                        setTasks(tasks.map(t => t.id === selectedTask.id ? updatedTask : t));
                        setSelectedTask(updatedTask);
                      }
                    }}
                  >
                    {selectedTask.location || <span className="add-placeholder">+ Add location</span>}
                  </div>
                </div>
                
                <div className="option-row">
                  <label>Labels</label>
                  <div className="labels-container">
                    {selectedTask.labels.length > 0 ? (
                      <>
                        {selectedTask.labels.map((label, i) => (
                          <span key={i} className="label-tag">
                            {label}
                            <span className="remove-label"
                              onClick={(e) => {
                                e.stopPropagation();
                                const updatedTask = {
                                  ...selectedTask,
                                  labels: selectedTask.labels.filter(l => l !== label)
                                };
                                setTasks(tasks.map(t => t.id === selectedTask.id ? updatedTask : t));
                                setSelectedTask(updatedTask);
                              }}
                            >
                              ×
                            </span>
                          </span>
                        ))}
                        <button className="add-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const newLabel = prompt("Add new label:");
                            if (newLabel && newLabel.trim()) {
                              const updatedTask = {
                                ...selectedTask,
                                labels: [...selectedTask.labels, newLabel.trim()]
                              };
                              setTasks(tasks.map(t => t.id === selectedTask.id ? updatedTask : t));
                              setSelectedTask(updatedTask);
                            }
                          }}
                        >
                          +
                        </button>
                      </>
                    ) : (
                      <button className="option-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const newLabel = prompt("Add new label:");
                          if (newLabel && newLabel.trim()) {
                            const updatedTask = {
                              ...selectedTask,
                              labels: [newLabel.trim()]
                            };
                            setTasks(tasks.map(t => t.id === selectedTask.id ? updatedTask : t));
                            setSelectedTask(updatedTask);
                          }
                        }}
                      >
                        + Add label
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="option-row">
                  <label>Reminders</label>
                  <div className="reminders-container">
                    {selectedTask.reminders.length > 0 ? (
                      <>
                        {selectedTask.reminders.map((reminder, i) => (
                          <span key={i} className="reminder-tag">
                            {reminder}
                            <span className="remove-reminder"
                              onClick={(e) => {
                                e.stopPropagation();
                                const updatedTask = {
                                  ...selectedTask,
                                  reminders: selectedTask.reminders.filter(r => r !== reminder)
                                };
                                setTasks(tasks.map(t => t.id === selectedTask.id ? updatedTask : t));
                                setSelectedTask(updatedTask);
                              }}
                            >
                              ×
                            </span>
                          </span>
                        ))}
                        <button className="add-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const newReminder = prompt("Add new reminder (e.g. '1 day before'):");
                            if (newReminder && newReminder.trim()) {
                              const updatedTask = {
                                ...selectedTask,
                                reminders: [...selectedTask.reminders, newReminder.trim()]
                              };
                              setTasks(tasks.map(t => t.id === selectedTask.id ? updatedTask : t));
                              setSelectedTask(updatedTask);
                            }
                          }}
                        >
                          +
                        </button>
                      </>
                    ) : (
                      <button className="option-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const newReminder = prompt("Add new reminder (e.g. '1 day before'):");
                          if (newReminder && newReminder.trim()) {
                            const updatedTask = {
                              ...selectedTask,
                              reminders: [newReminder.trim()]
                            };
                            setTasks(tasks.map(t => t.id === selectedTask.id ? updatedTask : t));
                            setSelectedTask(updatedTask);
                          }
                        }}
                      >
                        + Add reminder
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="option-row">
                  <label>Comments</label>
                  <div className="comments-container">
                    {selectedTask.comments.length > 0 ? (
                      selectedTask.comments.map((comment, i) => (
                        <div key={i} className="comment">
                          {comment}
                          <span className="remove-comment"
                            onClick={(e) => {
                              e.stopPropagation();
                              const updatedTask = {
                                ...selectedTask,
                                comments: selectedTask.comments.filter(c => c !== comment)
                              };
                              setTasks(tasks.map(t => t.id === selectedTask.id ? updatedTask : t));
                              setSelectedTask(updatedTask);
                            }}
                          >
                            ×
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="comment-input">No comments</div>
                    )}
                    <div className="comment-input clickable"
                      onClick={() => {
                        const newComment = prompt("Add new comment:");
                        if (newComment && newComment.trim()) {
                          const updatedTask = {
                            ...selectedTask,
                            comments: [...selectedTask.comments, newComment.trim()]
                          };
                          setTasks(tasks.map(t => t.id === selectedTask.id ? updatedTask : t));
                          setSelectedTask(updatedTask);
                        }
                      }}
                    >
                      + Add comment
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="task-modal">
            <div className="modal-header">
              <h3>Add Task</h3>
            </div>
            
            <div className="modal-content">
              <div className="form-group">
                <label>Task Name</label>
                <input
                  type="text"
                  placeholder="Enter task name"
                  className="task-input"
                  value={newTask.text}
                  onChange={(e) => setNewTask({...newTask, text: e.target.value})}
                  autoFocus
                />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  placeholder="Enter description"
                  className="description-input"
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Project</label>
                  <input
                    type="text"
                    placeholder="Enter project"
                    value={newTask.project}
                    onChange={(e) => setNewTask({...newTask, project: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label>Date</label>
                  <div className="date-input-wrapper">
                    <input
                      type="text"
                      placeholder="mm/dd/yyyy"
                      value={formatDate(newTask.date)}
                      readOnly
                      onClick={() => setShowDatePicker(true)}
                    />
                    {showDatePicker && (
                      <div className="calendar-popup">
                        <div className="calendar-container">
                          <div className="calendar-header">
                            <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}>
                              &lt;
                            </button>
                            <h4>
                              {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
                            </h4>
                            <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}>
                              &gt;
                            </button>
                          </div>
                          <div className="calendar-weekdays">
                            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                              <div key={day}>{day}</div>
                            ))}
                          </div>
                          <div className="calendar-days">
                            {renderCalendarDays(newTask.date, (date) => {
                              setNewTask({...newTask, date});
                              setShowDatePicker(false);
                            })}
                          </div>
                          <div className="calendar-footer">
                            <button onClick={() => {
                              setNewTask({...newTask, date: ''});
                              setShowDatePicker(false);
                            }}>
                              Clear
                            </button>
                            <button onClick={() => {
                              const today = new Date().toISOString().split('T')[0];
                              setNewTask({...newTask, date: today});
                              setShowDatePicker(false);
                            }}>
                              Today
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                    className={`priority-select priority-${newTask.priority}`}
                  >
                    <option value="P1">P1 (Highest)</option>
                    <option value="P2">P2 (High)</option>
                    <option value="P3">P3 (Medium)</option>
                    <option value="P4">P4 (Low)</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    placeholder="Enter location"
                    value={newTask.location}
                    onChange={(e) => setNewTask({...newTask, location: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Labels</label>
                <div className="tags-container">
                  {newTask.labels.map((label, index) => (
                    <span key={index} className="tag">
                      {label}
                      <button 
                        type="button"
                        className="remove-tag"
                        onClick={() => {
                          setNewTask({
                            ...newTask,
                            labels: newTask.labels.filter((_, i) => i !== index)
                          });
                        }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <button
                    type="button"
                    className="add-tag"
                    onClick={() => {
                      const label = prompt("Enter label:");
                      if (label) {
                        setNewTask({
                          ...newTask,
                          labels: [...newTask.labels, label]
                        });
                      }
                    }}
                  >
                    + Add Label
                  </button>
                </div>
              </div>
              
              <div className="form-group">
                <label>Reminders</label>
                <div className="tags-container">
                  {newTask.reminders.map((reminder, index) => (
                    <span key={index} className="tag">
                      {reminder}
                      <button 
                        type="button"
                        className="remove-tag"
                        onClick={() => {
                          setNewTask({
                            ...newTask,
                            reminders: newTask.reminders.filter((_, i) => i !== index)
                          });
                        }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <button
                    type="button"
                    className="add-tag"
                    onClick={() => {
                      const reminder = prompt("Enter reminder (e.g. '1 day before'):");
                      if (reminder) {
                        setNewTask({
                          ...newTask,
                          reminders: [...newTask.reminders, reminder]
                        });
                      }
                    }}
                  >
                    + Add Reminder
                  </button>
                </div>
              </div>
              
              <div className="form-group">
                <label>Comments</label>
                <div className="comments-container">
                  {newTask.comments.map((comment, index) => (
                    <div key={index} className="comment">
                      {comment}
                      <button 
                        type="button"
                        className="remove-comment"
                        onClick={() => {
                          setNewTask({
                            ...newTask,
                            comments: newTask.comments.filter((_, i) => i !== index)
                          });
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="add-comment"
                    onClick={() => {
                      const comment = prompt("Enter comment:");
                      if (comment) {
                        setNewTask({
                          ...newTask,
                          comments: [...newTask.comments, comment]
                        });
                      }
                    }}
                  >
                    + Add Comment
                  </button>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="cancel-button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button 
                className="add-button"
                onClick={handleAddTask}
                disabled={!newTask.text.trim()}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;