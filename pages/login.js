import { useRef, useState } from "react";
import Link from "next/link";
import styles from '../styles/Auth.module.css'
import { useRouter } from "next/router";

const Login = () => {
    const host = "http://localhost:5000";
    const email = useRef();
    const password = useRef();
    const router = useRouter();
    const [isVisible, setIsVisible] = useState({ email: false, password: false });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email.current.value, password: password.current.value }),
        });
        const response = await data.json();
        if(response.isValid){
            localStorage.setItem("auth-token",response.authToken);
            router.push('/');
        }
        else{
            /**
             TODO: Complete the errors
             */
        }
    };

    const handleFocus = (event) => {
        setIsVisible({ ...isVisible, [event.target.name]: true })
    }

    const handleBlur = (event) => {
        if (!event.target.value)
            setIsVisible({ ...isVisible, [event.target.name]: false })
    }

    return (
        <div className='section container'>
            <div className={styles.login}>
                <h2>Welcome Back !!</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.login_form_div}>
                    {isVisible.email && <label htmlFor="email" className={`${styles.login_form_tag}`}>Email</label>}
                        <input
                            ref={email}
                            className={styles.email}
                            type="email"
                            name = "email"
                            required
                            placeholder={isVisible.email ? "":"Email address"} 
                            onFocus={handleFocus} 
                            onBlur={handleBlur}
                        />
                    </div>
                    <div className={styles.login_form_div}>
                    {isVisible.password && <label htmlFor="password" className={`${styles.login_form_tag}`}>Password</label>}
                        <input
                            ref={password}
                            className={styles.password}
                            type="password"
                            name="password"
                            placeholder={isVisible.password ? "":"Password"} 
                            onFocus={handleFocus} 
                                onBlur={handleBlur}
                            required
                        />
                    </div>
                    <div className="button_wrapper">
                        <button type="submit" className={styles.button}>Login</button>
                    </div>
                </form>
                <p className={styles.signup}>
                    Don't have an account ? {" "}
                    <Link href="/signup"><span className={styles.signupword}>SignUp</span></Link>
                </p>
            </div>
        </div>
    )
}

export default Login