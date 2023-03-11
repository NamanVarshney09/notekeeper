import React from 'react'
import styles from '../styles/Navbar.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        {/* Replace with your company name or footer text */}
        &copy; My Company 2023
      </div>
      <div className={styles.right}>
        {/* Replace with your social media links or other footer content */}
        Follow us on <a href="#">Twitter</a> and <a href="#">Facebook</a>
      </div>
    </footer>
  )
}

export default Footer