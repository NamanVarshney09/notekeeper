import React from 'react'
import Link from 'next/link'
import styles from '../styles/Navbar.module.css'

const Navbar = (props) => {
  const { username, onLogout, onModeToggle } = props;
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">NoteKeeper</Link>
      </div>

      <div className={styles.user}>
        <span className={styles.username} >
          <Link href="https://namanvarshney.com" target="_blank">
            Visit{" "}namanvarshney.com !
          </Link>
        </span>
        <span className={styles.username}>Hi, Naman Varshney</span>
        <button className={styles.button}>Login</button>
        <button className={styles.button}>SignUp</button>
        <button className={styles.button}>Logout</button>
      </div>
    </header>
  )
}

export default Navbar