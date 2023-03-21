import ExpenseCard from '@/components/ExpenseCard';
import expenseContext from '@/context/expense/expenseContext';
import { useRouter } from 'next/router';
import Head from 'next/head'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/Expense.module.css'

const Tracker = () => {
    const context = useContext(expenseContext);
    const { expenses, fetchExpenses, addExpense, totalExpenses } = context

    const router = useRouter();
    const name = useRef();
    const amount = useRef();
    const category = useRef();
    const [mode, setMode] = useState("");
    // const [totalExpense, setTotalExpense] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault();
        addExpense(name.current.value, amount.current.value, category.current.value, mode).then((result) => {
            toast.success('Expense added successfully !', {
                position: "bottom-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        })
        e.target.reset();
    }

    useEffect(() => {
        if (localStorage.getItem("auth-token")) {
            async function fetchData() {
                const expensesResponse = await fetchExpenses();
                // const total = await totalExpenses();
                // setTotalExpense(total);
                // console.log("🚀 ~ file: expense.js:44 ~ fetchData ~ totalExpense:", totalExpense)
            }
            fetchData()
        }
        else
            router.push("/login");
    }, [])

    return (
        <>
            <Head>
                <title>NoteKeeper | Expense Tracker</title>
                <meta name="description" content="Expense Tracker" />
            </Head>
            <div className="section container">
                <h2 className={styles.section_title}>Expenses</h2>
                <form onSubmit={handleSubmit} className={`${styles.form}`}>
                    <div className={`${styles.form_div}`}>
                        <input ref={name} type="text" name="name" className={`${styles.form_input}`} required autoComplete="off" />
                        <label htmlFor="name">Expense</label>
                    </div>
                    <div className={`${styles.form_div}`}>
                        <input ref={amount} type="number" name="amount" id="amount" inputMode='numeric' className={`${styles.form_input}`} required autoComplete="off" />
                        <label htmlFor="amount">Amount</label>
                    </div>
                    <div className={`${styles.form_div}`}>
                        <input ref={category} type="text" name="category" className={`${styles.form_input}`} autoComplete="off" required />
                        <label htmlFor="category">Category</label>
                    </div>
                    <div className={`${styles.form_div} ${styles.button_group}`}>
                        <button type='button' onClick={() => setMode("UPI")} className={` ${mode === "UPI" ? styles.selected : ''} ${styles.choice_button}`}
                            name='mode' value='UPI'>UPI</button>
                        <button type='button' onClick={() => setMode("Cash")} className={` ${mode === "Cash" ? styles.selected : ''} ${styles.choice_button}`} name='mode' value='Cash'>Cash</button>
                    </div>
                    <div className='button_wrapper'>
                        <button className={`button button_flex`}>
                            Add Expense
                        </button>
                        <ToastContainer position="bottom-right" autoClose={2500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
                    </div>
                </form>
                {/* <span className={styles.total_expense}>
                    Total : &#8377; {totalExpense}
                </span> */}
                <div className={`${styles.card_container}`}>
                    {expenses.map((expense) => {
                        return <ExpenseCard expense={expense} key={expense._id} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Tracker