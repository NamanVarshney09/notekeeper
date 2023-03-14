import React, { useContext, useRef, useState } from 'react'
import styles from '@/styles/Note.module.css'
import noteContext from '@/context/notes/noteContext';

const Note = (props) => {
    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;
    return (
        <>
            <div className={styles.card}>
                <div className={styles.card_title}>
                    <span >{note.title.substring(0,10)}{note.title.length > 10 && "..." }</span>
                    <div>
                        <i className="fa-regular fa-pen-to-square" onClick={() => updateNote(note)}></i>
                        <i className="fa-solid fa-trash" onClick={() => { deleteNote(note._id) }}></i>
                    </div>
                </div>
                <div className={styles.card_description}>{note.description.substring(0,86)}{note.description.length > 90 && " ..." }</div>
            <div className={styles.badge}>{note.tag}</div>
            </div>
        </>
    )
}

export default Note