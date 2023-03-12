import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const [notes, setNotes] = useState([])

  const fetchNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      }
    });
    const data = await response.json();
    setNotes(data);
  }

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    setNotes([...notes, note]);
  }

  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ title, description, tag })
    });
    const data = await response.json();

    const updatedNotes = notes.map((note) => {
      if (note._id === id) {
        {
          note.title = title;
          note.description = description;
          note.tag = tag;
        }
      }
      return note;
    })
    setNotes(updatedNotes)
  }

  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      }
    });
    const data = await response.json();
    const filteredNotes = notes.filter((note) => { return note._id !== id })
    setNotes(filteredNotes)
  }
  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote, fetchNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState