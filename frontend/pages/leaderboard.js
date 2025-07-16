import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Leaderboard from '../components/Leaderboard';
import PointHistory from '../components/PointHistory';
import Navbar from '../components/Navbar';
import styles from '../styles/LeaderboardPage.module.css';

const API_URL = 'http://localhost:5000/api';

export default function LeaderboardPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1
  });

  // Fetch users function
  const fetchUsers = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/users?page=${page}&limit=${limit}`);
      setUsers(response.data.users);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchUsers(pagination.page, pagination.limit);
  }, [pagination.page, pagination.limit]);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      setPagination(prev => ({ ...prev, page: newPage }));
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Leaderboard | Leaderboard App</title>
        <meta name="description" content="View the current leaderboard rankings" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar />
      
      <main className={styles.main}>
        <div className={styles.leaderboardSection}>
          {loading ? (
            <div className={styles.loading}>Loading leaderboard...</div>
          ) : (
            <Leaderboard 
              users={users} 
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          )}
        </div>
        <div className={styles.historySection}>
          <button 
            className={styles.historyButton} 
            onClick={() => setShowHistory(!showHistory)}
          >
            {showHistory ? 'Hide Point History' : 'Show Point History'}
          </button>
          
          {showHistory && (
            <div className={styles.historyContainer}>
              <h2>Point History</h2>
              <PointHistory />
            </div>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Leaderboard App</p>
      </footer>
    </div>
  );
}