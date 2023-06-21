import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Note from "./Note";
import AddNote from "./AddNote";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [allnotes, setNotes] = useState([]);
  const navigate = useNavigate();
  const [noteColorMap, setNoteColorMap] = useState({});
  const droppableRef = useRef(null);

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

  const handleEditNote = (noteId) => {
    setEditingNoteId(noteId);
  };

  const handleSaveNote = (noteId) => {
    setEditingNoteId(null);
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      allnotes,
      result.source.index,
      result.destination.index
    );

    setNotes(items);
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
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="notes-droppable">
          {(provided, snapshot) => (
            <div
              className="notes-list"
              {...provided.droppableProps}
              ref={(el) => {
                provided.innerRef(el);
                droppableRef.current = el;
              }}
            >
              {allnotes.map((note, index) => (
                <Draggable
                  key={note.note_id}
                  draggableId={note.note_id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Note
                        key={note.note_id}
                        id={note.note_id}
                        text={note.note}
                        date={note.date}
                        color={noteColorMap[note.note_id]}
                        isEditing={editingNoteId === note.note_id}
                        onEdit={handleEditNote}
                        onSave={handleSaveNote}
                        deleteNote={deleteNote}
                        getNotes={getNotes}
                        updateANote={updateANote}
                        updateNoteColor={updateNoteColor}
                      />
                      {console.log("id of note", note.note_id)}
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default NotesList;
