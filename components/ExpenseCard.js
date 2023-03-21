import React from 'react'
import styles from '../styles/Expense.module.css'

const ExpenseCard = (props) => {
  const { expense } = props;
  return (
    <>
      <div className={styles.card}>
        <div className={styles.card_title}>
          <span>&#8377; {expense.amount}</span>
          <div>
            {/* <i className="fa-regular fa-pen-to-square" ></i> */}
            {/* <i className="fa-solid fa-trash" onClick={handleDelete}></i> */}
          </div>
        </div>
        <div className={styles.card_description}>{expense.name}</div>
        <div className={styles.category_badge}>{expense.category}</div>
        <div className={styles.mode_badge}>{expense.mode}</div>
      </div>
    </>
  )
}

export default ExpenseCard