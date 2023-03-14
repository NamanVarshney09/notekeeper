import React, { useContext, useRef, useState } from 'react'
import styles from '@/styles/Note.module.css'
import noteContext from '@/context/notes/noteContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Note = (props) => {
    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;

    const handleDelete = () => {
        deleteNote(note._id);
        toast.success(`Note deleted successfully !`, {
            position: "bottom-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
    return (
        <>
            <div className={styles.card}>
                <div className={styles.card_title}>
                    <span >{note.title.substring(0, 10)}{note.title.length > 10 && "..."}</span>
                    <div>
                        <i className="fa-regular fa-pen-to-square" onClick={() => updateNote(note)}></i>
                        <i className="fa-solid fa-trash" onClick={handleDelete}></i>
                    </div>
                </div>
                <div className={styles.card_description}>{note.description.substring(0, 86)}{note.description.length > 90 && " ..."}</div>
                <div className={styles.badge}>{note.tag}</div>
            </div>
            <ToastContainer position="bottom-right" autoClose={2500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
        </>
    )
}

export default Note