import React from 'react';
import './complete.css';

// Import sample images (replace with your actual image paths)
import userAvatar from '../assets/profile.png';
import inboxIcon from '../assets/inbox.png';
import homeIcon from '../assets/home.png';
import checkmarkIcon from '../assets/checkmark.png';

const ActivityFeed = () => {
  return (
    <div className="activity-feed">
      <h1 className="feed-title">Activity: All projects</h1>
      
      <div className="activity-day-group">
        <h2 className="day-header">31 Mar - Yesterday - Monday</h2>
        
        <div className="activity-item">
          <div className="activity-avatar">
            <img src={userAvatar} alt="User avatar" />
          </div>
          <div className="activity-content">
            <div className="activity-main">
              <span className="activity-actor">You</span>
              <img src={checkmarkIcon} className="activity-icon" alt="Completed" />
              <span className="activity-action">completed a task:</span>
              <span className="activity-task">yfs df dysgi</span>
            </div>
            <div className="activity-meta">
              <span className="activity-time">09:51</span>
              <div className="activity-project">
                <img src={inboxIcon} className="project-icon" alt="Inbox" />
                <span>Inbox</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="activity-day-group">
        <h2 className="day-header">29 Mar - Saturday</h2>
        
        {[1, 2, 3, 4, 5].map((item) => (
          <div className="activity-item" key={item}>
            <div className="activity-avatar">
              <img src={userAvatar} alt="User avatar" />
            </div>
            <div className="activity-content">
              <div className="activity-main">
                <span className="activity-actor">You</span>
                <img src={checkmarkIcon} className="activity-icon" alt="Completed" />
                <span className="activity-action">completed a task:</span>
                <span className="activity-task">
                  {item === 1 ? 'hello' : 
                   item === 2 ? 'hello' :
                   item === 3 ? 'Browse the Todoist Inspiration Hub' :
                   item === 4 ? 'Take the productivity method quiz' :
                   'Download Todoist on all your devices'}
                </span>
              </div>
              <div className="activity-meta">
                <span className="activity-time">
                  {item === 1 ? '20:56' : 
                   item === 2 ? '19:25' : '19:24'}
                </span>
                <div className="activity-project">
                  <img src={inboxIcon} className="project-icon" alt="Inbox" />
                  <span>Inbox</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="activity-item">
          <div className="activity-avatar">
            <img src={userAvatar} alt="User avatar" />
          </div>
          <div className="activity-content">
            <div className="activity-main">
              <span className="activity-actor">You</span>
              <img src={checkmarkIcon} className="activity-icon" alt="Completed" />
              <span className="activity-action">completed a task:</span>
              <span className="activity-task">Do a weekly review of my tasks and goals</span>
            </div>
            <div className="activity-meta">
              <span className="activity-time">13:16</span>
              <div className="activity-project">
                <img src={homeIcon} className="project-icon" alt="Home" />
                <span>Home</span>
                <span className="activity-hashtag">#</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;