import React, { useState } from 'react';
import './Notification.css';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Your journey towards higher productivity begins today!",
      description: "You're now a Todoist Karma Novice.",
      time: "12 hours ago",
      read: false
    },
    // Add more notifications here
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notifications-container">
      <h1>Notifications</h1>
      
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All {unreadCount > 0 && <span className="unread-badge">{unreadCount}</span>}
        </button>
        <button 
          className={`tab ${activeTab === 'unread' ? 'active' : ''}`}
          onClick={() => setActiveTab('unread')}
        >
          Unread
        </button>
      </div>
      
      <div className="divider"></div>
      
      <div className="notifications-list">
        {notifications
          .filter(notification => activeTab === 'all' || !notification.read)
          .map(notification => (
            <div 
              key={notification.id} 
              className={`notification ${notification.read ? '' : 'unread'}`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="notification-content">
                <h3>{notification.title}</h3>
                <p>{notification.description}</p>
                <span className="time">{notification.time}</span>
              </div>
              {!notification.read && <div className="unread-dot"></div>}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Notifications;