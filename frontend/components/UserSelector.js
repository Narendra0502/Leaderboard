import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/UserSelector.module.css';

const API_URL = 'http://localhost:5000/api';

const UserSelector = ({ selectedUser, onSelectUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const selectedUserData = users.find(user => user._id === selectedUser) || {};

  const fetchUsers = async (search = '') => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/users/all${search ? `?search=${search}` : ''}`);
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(searchQuery);
  }, [searchQuery]);

  return (
    <div className={styles.userSelector}>
      <label htmlFor="user-select">Select a User:</label>
      
      <div className={styles.customSelect}>
        <div 
          className={styles.selectedOption} 
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedUser ? (
            <>
              <div className={styles.userInfo}>
                {selectedUserData.profileImage ? (
                  <img 
                    src={selectedUserData.profileImage} 
                    alt={selectedUserData.name} 
                    className={styles.userImage} 
                  />
                ) : (
                  <div className={styles.noUserImage}>👤</div>
                )}
                <span>{selectedUserData.name} (Points: {selectedUserData.points})</span>
              </div>
            </>
          ) : (
            <span>-- Select User --</span>
          )}
          <span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
        </div>
        
        {isOpen && (
          <div className={styles.options}>
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            {loading ? (
              <div className={styles.loading}>Loading...</div>
            ) : users.length === 0 ? (
              <div className={styles.noResults}>No users found</div>
            ) : users.map((user) => (
              <div 
                key={user._id} 
                className={`${styles.option} ${user._id === selectedUser ? styles.selected : ''}`}
                onClick={() => {
                  onSelectUser(user._id);
                  setIsOpen(false);
                }}
              >
                <div className={styles.userInfo}>
                  {user.profileImage ? (
                    <img 
                      src={user.profileImage} 
                      alt={user.name} 
                      className={styles.userImage} 
                    />
                  ) : (
                    <div className={styles.noUserImage}>👤</div>
                  )}
                  <span>{user.name} (Points: {user.points})</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Keep the original select for accessibility but hide it visually */}
      <select
        id="user-select"
        value={selectedUser}
        onChange={(e) => onSelectUser(e.target.value)}
        className={styles.hiddenSelect}
      >
        <option value="">-- Select User --</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name} (Points: {user.points})
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserSelector;