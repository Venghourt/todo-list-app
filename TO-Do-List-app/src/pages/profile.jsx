import React, { useState } from 'react';
import './profile.css';
import defaultProfile from "../assets/profile.png";

const AccountSettings = () => {
  const [profileImage, setProfileImage] = useState(defaultProfile);
  const [name, setName] = useState("XLR8 KH");
  const [email, setEmail] = useState("puthearithkeng7@gmail.com");

  const handleChangePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        alert('Please select an image smaller than 4MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setProfileImage(null);
  };

  return (
    <div className="account-settings">
      <h1 className="account-title">Account</h1>
      
      <div className="settings-section">
        <h2 className="section-title">Plan: Beginner</h2>
        
        <div className="setting-item photo-setting">
          <div className="avatar-container">
            <div className="profile-avatar">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="avatar-image" />
              ) : (
                <span className="avatar-initials">
                  {name.split(' ').map(n => n[0]).join('')}
                </span>
              )}
            </div>
            <div className="avatar-actions">
              <div className="photo-action-buttons">
                <label className="text-button photo-action">
                  Change photo
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleChangePhoto}
                    style={{ display: 'none' }} 
                  />
                </label>
                {profileImage && (
                  <button 
                    className="text-button danger photo-action" 
                    onClick={handleRemovePhoto}
                  >
                    Remove photo
                  </button>
                )}
              </div>
              <p className="setting-description">
                Pick a photo up to 4MB. Your avatar photo will be public.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="settings-section">
        <div className="setting-item">
          <h3 className="setting-label">Name</h3>
          <div className="setting-value">
            <span>{name}</span>
            <span className="character-count">{name.length}/255</span>
          </div>
        </div>
        
        <div className="setting-item">
          <h3 className="setting-label">Email</h3>
          <div className="setting-value">
            <span>{email}</span>
            <button className="text-button">Change email</button>
          </div>
        </div>
        
        <div className="setting-item">
          <h3 className="setting-label">Password</h3>
          <div className="setting-value">
            <button className="text-button">Add password</button>
          </div>
        </div>
      </div>
      
      <div className="settings-section">
        <h2 className="section-title">Two-factor authentication</h2>
        <div className="setting-item">
          <p>2FA is disabled on your Todoist account.</p>
          <button className="primary-button">Enable 2FA</button>
        </div>
      </div>
      
      <div className="settings-section">
        <h2 className="section-title">Connected accounts</h2>
        <div className="setting-item">
          <p>
            Log in to Todoist with your Google, Facebook, or Apple account.
          </p>
          <div className="connected-account">
            <p>
              You can log in to Todoist with your Google account <strong>{email}</strong>.
              Your password is not set, so we cannot disconnect you from your Google account. 
              If you want to disconnect, please set up your password first.
            </p>
          </div>
          <div className="connection-buttons">
            <button className="social-button facebook">
              <span className="social-icon">f</span>
              Connect with Facebook
            </button>
            <button className="social-button apple">
              <span className="social-icon"></span>
              Connect with Apple
            </button>
          </div>
        </div>
      </div>
      
      <div className="settings-section danger-zone">
        <h2 className="section-title">Delete account</h2>
        <div className="setting-item">
          <p>
            This will immediately delete all of your data including tasks, projects, 
            comments, and more. This can't be undone. <a href="#">Learn more</a>.
          </p>
          <button className="danger-button">Delete account</button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;