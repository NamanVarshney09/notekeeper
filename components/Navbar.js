import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../styles/Navbar.module.css'
import { useRouter } from 'next/router'

const Navbar = () => {
  const router = useRouter();
  const handleLogout = () =>{
    localStorage.removeItem("auth-token");
    router.push("/login");
    router.reload();
  }
  const [authToken, setAuthToken] = useState()
  useEffect(() => {
    setAuthToken(localStorage.getItem("auth-token"));
  }, [router.query])
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
        { authToken ? <><span className={styles.username}>Hi, Naman Varshney</span>
        <button className={styles.button} onClick={handleLogout}>Logout</button></>:<>
        <Link href="/login"><button className={styles.button}>Login</button></Link>
        <Link href="/signup"><button className={styles.button}>SignUp</button></Link></>}
      </div>
    </header>
  )
}

export default Navbar