import React, { useState, useEffect } from "react";
import Note from "./Note";
import AddNote from "./AddNote";
import axios from "axios";

function NotesList({ notes, handleAddNote, handleDeleteNote }) {
  const [allnotes, setNotes] = useState([]);

  let token = sessionStorage.getItem("token");

  const getNotes = async () => {
    let res = await axios.get("http://localhost:1500/notes/get-all-notes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data.payload);
    setNotes(res.data.payload);
  };

  useEffect(() => {
    getNotes([]);
  }, []);

  {
    return (
      <div className="notes-list">
        {allnotes.map((note) => (
          <Note
            id={note.note_id}
            text={note.note}
            date={note.date}
            handleDeleteNote={handleDeleteNote}
          />
        ))}
        <AddNote handleAddNote={handleAddNote} />
      </div>
    );
  }
}

export default NotesList;
