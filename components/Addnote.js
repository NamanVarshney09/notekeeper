import noteContext from '@/context/notes/noteContext'
import React, { useContext, useRef, useState } from 'react'
import styles from '../styles/Addnote.module.css'

const Addnote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const {setToggle} = props;

    const title = useRef();
    const description = useRef();
    const tag = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(title.current.value, description.current.value, tag.current.value);
        e.target.reset();
        setToggle(0);
    }

    return (
        <>
            <form onSubmit={handleSubmit} className={`${styles.contact_form}`}>
                <div className={`${styles.contact_form_div}`}>
                    <label htmlFor="title" className={`${styles.contact_form_tag}`}>Title</label>
                    <input ref={title} type="text" name="title" className={`${styles.contact_form_input}`} placeholder="Enter note title" required />
                </div>
                <div className={`${styles.contact_form_div} ${styles.contact_form_area}`}>
                    <label htmlFor="description" className={`${styles.contact_form_tag}`}>Feedback</label>
                    <textarea ref={description} name="description" className={`${styles.contact_form_input}`} cols="30" rows="10" minLength={10} placeholder='Enter note description' required></textarea>
                </div>
                <div className={`${styles.contact_form_div}`}>
                    <label htmlFor="tag" className={`${styles.contact_form_tag}`}>Tag</label>
                    <input ref={tag} type="text" name="tag" className={`${styles.contact_form_input}`} placeholder="Enter Tag for the note" />
                </div>
                <div className='button_wrapper'>
                    <button className={`button button_flex ${styles.button}`}>
                        Save Note
                    </button>
                    {/* <ToastContainer position="bottom-right" autoClose={2500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" /> */}
                </div>
            </form>
        </>
    )
}

export default Addnote