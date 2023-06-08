import React, { useState, useEffect } from "react";
import Note from "./Note";
import AddNote from "./AddNote";
import axios from "axios";

function NotesList({
  handleAddNote,
  deleteNote,
  noteAdded,
  updateNote,
  setUpdatedNote,
  updateANote,
  setNoteAdded,
  noteDeleted,
  setNoteDeleted,
}) {

  const [allnotes, setNotes] = useState([]);

  let token = sessionStorage.getItem("token");

  //get all notes (Notes-List)
  const getNotes = async () => {
    let res = await axios.get("http://localhost:1500/notes/get-all-notes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setNotes(res.data.payload);
  };

  useEffect(() => {
    getNotes([]);
    setNoteAdded(false);
    setUpdatedNote(false);
    setNoteDeleted(false);
  }, [noteAdded, updateNote, noteDeleted]);

  return (
    <div className="notes-list">
      {allnotes.map((note) => (
        <Note
          key={note.note_id}
          id={note.note_id}
          text={note.note}
          date={note.date}
          deleteNote={deleteNote}
          getNotes={getNotes}
          updateNote={updateNote}
          setUpdatedNote={setUpdatedNote}
          updateANote={updateANote}
        />
      ))}
      <AddNote handleAddNote={handleAddNote} />
    </div>
  );
}

export default NotesList;
