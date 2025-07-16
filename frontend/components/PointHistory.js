import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/PointHistory.module.css';

const API_URL = 'http://localhost:5000/api';

const PointHistory = () => {
  const [history, setHistory] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1
  });

  useEffect(() => {
    fetchHistory(pagination.page, pagination.limit);
    fetchUsers();
  }, [pagination.page, pagination.limit]);

  const fetchHistory = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/points/history?page=${page}&limit=${limit}`);
      setHistory(response.data.history);
      setPagination(response.data.pagination);
      setError('');
    } catch (err) {
      console.error('Error fetching point history:', err);
      setError('Failed to load point history');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      // Create a map of user IDs to user objects for quick lookup
      const userMap = {};
      response.data.users.forEach(user => {
        userMap[user._id] = user;
      });
      setUsers(userMap);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      setPagination(prev => ({ ...prev, page: newPage }));
    }
  };

  if (loading && history.length === 0) {
    return <div className={styles.loading}>Loading history...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.history}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>User</th>
            <th>Points</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="3" className={styles.loading}>Loading...</td>
            </tr>
          ) : (
            history.map((entry) => {
              const user = users[entry.userId?._id] || {};
              return (
                <tr key={entry._id}>
                  <td className={styles.userCell}>
                    {user.profileImage ? (
                      <img 
                        src={user.profileImage} 
                        alt={entry.userId?.name || 'Unknown User'} 
                        className={styles.userImage} 
                      />
                    ) : (
                      <div className={styles.noImage}>👤</div>
                    )}
                    <span>{entry.userId?.name || 'Unknown User'}</span>
                  </td>
                  <td className={styles.pointsCell}>+{entry.points}</td>
                  <td>{formatDate(entry.timestamp)}</td>
                </tr>
              );
            })
          )}
          {!loading && history.length === 0 && (
            <tr>
              <td colSpan="3">No point history found</td>
            </tr>
          )}
        </tbody>
      </table>
      
      {/* Pagination Controls */}
      {pagination.pages > 1 && (
        <div className={styles.pagination}>
          <button 
            onClick={() => handlePageChange(1)} 
            disabled={pagination.page === 1}
            className={styles.paginationButton}
          >
            &laquo;
          </button>
          <button 
            onClick={() => handlePageChange(pagination.page - 1)} 
            disabled={pagination.page === 1}
            className={styles.paginationButton}
          >
            &lsaquo;
          </button>
          
          <span className={styles.pageInfo}>
            Page {pagination.page} of {pagination.pages}
          </span>
          
          <button 
            onClick={() => handlePageChange(pagination.page + 1)} 
            disabled={pagination.page === pagination.pages}
            className={styles.paginationButton}
          >
            &rsaquo;
          </button>
          <button 
            onClick={() => handlePageChange(pagination.pages)} 
            disabled={pagination.page === pagination.pages}
            className={styles.paginationButton}
          >
            &raquo;
          </button>
        </div>
      )}
    </div>
  );
};

export default PointHistory;