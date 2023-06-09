import React, { useEffect, useState, useRef } from "react";

function AddNote({ handleAddNote }) {
  const [noteText, setNoteText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef(null);
  const cardRef = useRef(null);

  // handleChange
  const handleChange = (event) => {
    if (event.target.value.length >= 0) {
      setNoteText(event.target.value);
    }
  };

  // save note
  const handleSaveClick = () => {
    if (noteText.trim().length > 0) {
      handleAddNote(noteText);
      setNoteText("");
      setIsEditing(false);
    }
  };

  // Handle click to enable/disable editing
  const handleClick = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div
      className={`card ${isEditing ? "editing" : ""}  `}
      onClick={handleClick}
      ref={cardRef}
    >
      <div className="card-body">
        {isEditing ? (
          <textarea
            className="card-textarea"
            rows="8"
            cols="10"
            placeholder="Type to add a note..."
            value={noteText}
            onChange={handleChange}
            ref={textareaRef}
          ></textarea>
        ) : (
          <p className="card-text">{noteText || "Click to add a note..."}</p>
        )}
        <div className="note-footer">
          {isEditing && (
            <button
              className="btn btn-primary save  "
              onClick={handleSaveClick}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddNote;
