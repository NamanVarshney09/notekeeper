import React from 'react'
import Link from 'next/link'
import styles from '../styles/Navbar.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div >Feedback : <Link href="mailto:namanvarshney09@gmail.com" target="_blank">namanvarshney09@gmail.com</Link></div>
      <div>Follow <Link href="https://namanvarshney.com" target="_blank">namanvarshney.com</Link></div>
      <div className={styles.copyright}>&copy; 2023 NoteKeeper | All rights reserved</div>
    </footer>
  )
}

export default Footer