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
  const [noteColorMap, setNoteColorMap] = useState({}); // State to store note colors

  let token = sessionStorage.getItem("token");

  // Get all notes (Notes-List)
  const getNotes = async () => {
    let res = await axios.get("http://localhost:1500/notes/get-all-notes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setNotes(res.data.payload);
  };

  // Function to update the color of a note
  const updateNoteColor = (noteId, color) => {
    setNoteColorMap((prevNoteColorMap) => ({
      ...prevNoteColorMap,
      [noteId]: color,
    }));
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
          color={noteColorMap[note.note_id]} // Pass the note color as a prop
          deleteNote={deleteNote}
          getNotes={getNotes}
          updateANote={updateANote}
          updateNoteColor={updateNoteColor} // Pass the updateNoteColor function as a prop
        />
      ))}
      <AddNote handleAddNote={handleAddNote} />
    </div>
  );
}

export default NotesList;
