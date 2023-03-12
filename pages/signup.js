import { useRef, useState } from "react";
import styles from '../styles/Auth.module.css'
import { useRouter } from "next/router";

const Signup = () => {
  const host = "https://notekeeper-backend.vercel.app";
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const [isVisible, setIsVisible] = useState({name:false, email:false, password:false, confirmPassword:false});

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.current.value !== confirmPassword.current.value){
      router.reload();
    }

    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: name.current.value, email: email.current.value, password: password.current.value }),
    });
    const user = await response.json();
    localStorage.setItem("auth-token",user.authToken);
    if (user.isValid){
        router.push('/');
    }
    else{
      console.log(response.errors);
      /*
      TODO
       */
    }
  };

  const handleFocus = (event) => {
    setIsVisible({...isVisible, [event.target.name] : true})
  }
  const handleBlur = (event) => {
    if (!event.target.value)
      setIsVisible({...isVisible, [event.target.name] : false})
  }
  return (
    <div className='section container'>
      <div className={styles.login}>
        <h2>Welcome to NoteKeeper !!</h2>
        <form onSubmit={handleSubmit} className={styles.signup_form}>
          <div className={styles.signup_form_div}>
            {isVisible.name && <label htmlFor="name" className={`${styles.signup_form_tag}`}>Name</label>}
            <input ref={name} className={styles.form_input} type="name" name="name" required placeholder={isVisible.name ? "":"Name"} onFocus={handleFocus} onBlur={handleBlur} />
          </div>
          <div className={styles.signup_form_div}>
            {isVisible.email && <label htmlFor="email" className={`${styles.signup_form_tag}`}>Email</label>}
            <input ref={email} className={styles.form_input} type="email" name="email" required placeholder={isVisible.email ? "":"Email address"} onFocus={handleFocus} onBlur={handleBlur} />
          </div>
          <div className={styles.signup_form_div}>
            {isVisible.password && <label htmlFor="password" className={`${styles.signup_form_tag}`}>Password</label>}
            <input ref={password} className={styles.form_input} type="password" name="password" placeholder={isVisible.password ? "":"Password"} required onFocus={handleFocus} onBlur={handleBlur} minLength={8}/>
          </div>
          <div className={styles.signup_form_div}>
            {isVisible.confirmPassword   && <label htmlFor="confirmPassword" className={`${styles.signup_form_tag}`}>Confirm password</label>}
            <input ref={confirmPassword} className={styles.form_input} type="password" name="confirmPassword" placeholder={isVisible.confirmPassword ? "":"Confirm password"} required onFocus={handleFocus} onBlur={handleBlur} minLength={8}/>
          </div>
          <div className="button_wrapper">
            <button type="submit" className={styles.button}>Signup</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup