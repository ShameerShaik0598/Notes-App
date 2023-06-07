import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Note = ({
  id,
  text,
  date,
  deleteNote,
  getNotes,
  setUpdatedNote,
  updateANote,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [editedValue, setEditedValue] = useState("");

  // const navigate = useNavigate();
  // const [updateNote, setUpdatedNote] = useState(false);

  // //update a note
  // const updateANote = async (id, editedValue) => {
  //   // const navigate = useNavigate();
  //   try {
  //     let res = await axios.put(
  //       `http://localhost:1500/notes/update-notes/${id}`,
  //       {
  //         note: editedValue,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  //         },
  //       }
  //     );

  //     setUpdatedNote(true);
  //     if (res.status === 200) {
  //       // setMessage("Note Updated Successfully");
  //     } else {
  //       // setMessage("Failed to update the Note");
  //     }
  //     // navigate("/get-all-notes");
  //   } catch (error) {
  //     // setMessage("An error has occured while updating ");
  //     console.error(error);
  //   }
  // };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedValue(text);
    setTextValue(text);
  };

  const handleInputChange = (event) => {
    console.log(event.target.value);
    setEditedValue(event.target.value);
  };

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
            {/* <small>{date}</small> */}
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
