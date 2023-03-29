import ExpenseCard from '@/components/ExpenseCard';
import authContext from '@/context/auth/authContext';
import expenseContext from '@/context/expense/expenseContext';
import { useRouter } from 'next/router';
import Head from 'next/head'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/Expense.module.css'
import moment from 'moment';

const Tracker = () => {
    const context = useContext(expenseContext);
    const { expenses, fetchExpenses, addExpense, totalExpenses, categories, dates } = context;

    const userContext = useContext(authContext);
    const { user, fetchUser } = userContext;

    const router = useRouter();
    const name = useRef();
    const amount = useRef();
    const category = useRef();
    const [mode, setMode] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedDate, setSelectedDate] = useState("All");
    const [filteredExpenses, setFilteredExpenses] = useState(expenses);
    const [newExpense, setNewExpense] = useState(true);

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
            setNewExpense(!newExpense)
        })
        e.target.reset();
    }

    useEffect(() => {
        if (localStorage.getItem("auth-token")) {
            async function fetchData() {
                const expensesResponse = await fetchExpenses();
                setFilteredExpenses(expensesResponse)
                const userResponse = await fetchUser();
            }
            fetchData()
        }
        else
            router.push("/login");
    }, [router.events, newExpense])

    useEffect(() => {
        if (selectedCategory === "All" && selectedDate === "All")
            setFilteredExpenses(expenses);
        else if (selectedCategory !== "All" && selectedDate === "All")
            setFilteredExpenses(expenses.filter((expense) => expense.category === selectedCategory));
        else if (selectedCategory === "All" && selectedDate !== "All")
            setFilteredExpenses(expenses.filter((expense) => moment(expense.date).format('ddd, DD MMM') === selectedDate))
        else if (selectedCategory !== "All" && selectedDate !== "All")
            setFilteredExpenses(expenses.filter((expense) => { return expense.category === selectedCategory && moment(expense.date).format('ddd, DD MMM') === selectedDate }));
        else
            setFilteredExpenses(expenses)
    }, [selectedCategory, selectedDate])

    return (
        <>
            <Head>
                <title>Expenses | {user ? user : "Personal Cloud Diary !"}</title>
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
                        <button type='button' onClick={() => setMode("UPI")} className={` ${mode === "UPI" ? styles.selected : ''} ${styles.choice_button}`} name='mode' value='UPI'>UPI</button>
                        <button type='button' onClick={() => setMode("Cash")} className={` ${mode === "Cash" ? styles.selected : ''} ${styles.choice_button}`} name='mode' value='Cash'>Cash</button>
                    </div>
                    <div className='button_wrapper'>
                        <button className={`button button_flex`}>
                            Add Expense
                        </button>
                        <ToastContainer position="bottom-right" autoClose={2500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
                    </div>
                </form>
                <span className={styles.total_expense}>
                    Total : &#8377; {totalExpenses}
                </span>
                <div className={styles.filters_container}>
                    <div className={styles.dropdown_menu}>
                        <label className={styles.dropdown_label} htmlFor="categoriesDropdown">Category</label>
                        <select id="categoriesDropdown" onChange={(event) => { setSelectedCategory(event.target.value) }}>
                            {categories.map((category, index) => {
                                return <option className='dropdownOptions' value={category} key={index}>{category}</option>
                            })}
                        </select>
                    </div>
                    <div className={styles.dropdown_menu}>
                        <label className={styles.dropdown_label} htmlFor="dateDropdown">Date</label>
                        <select id="dateDropdown" onChange={(event) => { setSelectedDate(event.target.value) }}>
                            <option value={moment(Date.now()).format("ddd, DD MMM")}>Today</option>
                            {dates.map((date, index) => {
                                return <option value={date} key={index}>{date}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className={`${styles.card_container}`}>
                    {filteredExpenses.map((expense) => {
                        return <ExpenseCard expense={expense} key={expense._id} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Tracker