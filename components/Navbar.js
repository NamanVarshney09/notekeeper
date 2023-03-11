import React from 'react'
import styles from '../styles/Navbar.module.css'

const Navbar = (props) => {
  const { username, onLogout, onModeToggle } = props;
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        {/* Replace with your logo image or text */}
        NoteKeeper
      </div>
      <div className={styles.user}>
        <span className={styles.username}>Naman Varshney</span>
        <button className={styles.logout}>Logout</button>
      </div>
    </header>
  )
}

export default Navbar