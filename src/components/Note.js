import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Note = ({ id, text, deleteNote, getNotes, updateANote }) => {
  //states for editing the exisiting notes
  const [isEditing, setIsEditing] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [editedValue, setEditedValue] = useState("");

  //edit the text
  const handleEditClick = () => {
    setIsEditing(true);
    setEditedValue(text);
    setTextValue(text);
  };

  //set the edited value
  const handleInputChange = (event) => {
    console.log(event.target.value);
    setEditedValue(event.target.value);
  };

  //saving editedText to the note
  const handleSave = () => {
    if (editedValue.trim().length > 0) {
      updateANote(id, editedValue);
      getNotes();
      setIsEditing(false);
    }
  };

  useEffect(() => {});

  return (
    <div>
      {isEditing ? (
        <div className="edit">
          <div className="edit-textarea">
            <textarea value={editedValue} onChange={handleInputChange} />
          </div>
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div className="note">
          <span>{text}</span>
          <div className="note-footer">
            <FaEdit onClick={handleEditClick}>Edit</FaEdit>
            <MdDeleteForever
              className="delete-icon"
              size="1.3em"
              onClick={() => {
                deleteNote(id);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Note;
