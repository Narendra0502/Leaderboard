import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const router = useRouter();
  
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <Link href="/" className={styles.logo}>
          <span className={styles.trophy}>🏆</span>
          <span className={styles.title}>Leaderboard</span>
        </Link>
        
        <div className={styles.navLinks}>
          <Link href="/" className={`${styles.navLink} ${router.pathname === '/' ? styles.active : ''}`}>
            Home
          </Link>
          <Link href="/leaderboard" className={`${styles.navLink} ${router.pathname === '/leaderboard' ? styles.active : ''}`}>
            Leaderboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
