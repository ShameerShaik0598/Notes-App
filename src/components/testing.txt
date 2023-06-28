import React, { useState, useEffect } from "react";
import Note from "./Note";
import AddNote from "./AddNote";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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
    let token = sessionStorage.getItem("token");
    console.log("token is", token);
    if (token === null) {
      navigate("/login");
    }
    getNotes([]);
    setNoteAdded(false);
    setUpdatedNote(false);
    setNoteDeleted(false);
  }, [noteAdded, updateNote, noteDeleted]);

  return (
    <div>
      <div className="mb-5">
        <AddNote handleAddNote={handleAddNote} />
      </div>
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
      </div>
    </div>
  );
}

export default NotesList;
