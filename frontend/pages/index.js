import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import UserSelector from '../components/UserSelector';
import AddUserForm from '../components/AddUserForm';
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';

const API_URL = 'http://localhost:5000/api';

export default function Home() {
  // State declarations
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [pointsAwarded, setPointsAwarded] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
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
      setMessage('Failed to fetch users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Initialize default users
  const initDefaultUsers = async () => {
    try {
      await axios.post(`${API_URL}/users/init`);
    } catch (error) {
      console.error('Error initializing users:', error);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchUsers(pagination.page, pagination.limit);
    initDefaultUsers();
  }, [pagination.page, pagination.limit]);

  // Handle adding new user
  const handleAddUser = async (name, profileImage) => {
    try {
      await axios.post(`${API_URL}/users`, { name, profileImage });
      fetchUsers(pagination.page, pagination.limit);
      setMessage(`User ${name} added successfully!`);
    } catch (error) {
      console.error('Error adding user:', error);
      setMessage('Failed to add user. Please try again.');
    }
  };

  // Handle user selection
  const handleUserSelect = (userId) => {
    setSelectedUser(userId);
    setPointsAwarded(null);
  };

  // Handle claiming points
  const handleClaimPoints = async () => {
    if (!selectedUser) {
      setMessage('Please select a user first');
      return;
    }

    setLoading(true);
    setMessage('');
    
    try {
      const response = await axios.post(`${API_URL}/points/claim`, { userId: selectedUser });
      
      setPointsAwarded(response.data.pointsAwarded);
      setMessage(`${response.data.pointsAwarded} points awarded to ${response.data.user.name}!`);
      fetchUsers(pagination.page, pagination.limit);
    } catch (error) {
      console.error('Error claiming points:', error);
      setMessage('Failed to claim points. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      setPagination(prev => ({ ...prev, page: newPage }));
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Leaderboard App</title>
        <meta name="description" content="Leaderboard application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar />
      
      <main className={styles.main}>
        <h1 className={styles.title}>Leaderboard App</h1>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Select User & Claim Points</h2>
            <UserSelector 
              users={users} 
              selectedUser={selectedUser} 
              onSelectUser={handleUserSelect} 
            />
            
            {selectedUser && (
              <button 
                onClick={handleClaimPoints} 
                className={styles.claimButton}
                disabled={loading}
              >
                {loading ? 'Claiming...' : 'Claim Points'}
              </button>
            )}
            
            {pointsAwarded !== null && (
              <div className={styles.pointsAwarded}>
                <h3>Points Awarded: {pointsAwarded}</h3>
              </div>
            )}
            
            {message && <div className={styles.message}>{message}</div>}
          </div>

          <div className={styles.card}>
            <h2>Add New User</h2>
            <AddUserForm onAddUser={handleAddUser} />
          </div>
        </div>


      </main>

      <footer className={styles.footer}>
        <p>Leaderboard App</p>
      </footer>
    </div>
  );
}