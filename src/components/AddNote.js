import React, { useEffect, useState, useRef } from "react";
import { Box, TextField, ClickAwayListener, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { v4 as uuid } from "uuid";

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: auto;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
  border-color: #e0e0e0;
  width: 600px;
  border-radius: 8px;
  min-height: 30px;
  padding: 10px 15px;
`;

function AddNote({ handleAddNote }) {
  const [noteText, setNoteText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showTextField, setShowTextField] = useState(false);
  const textareaRef = useRef(null);

  const containerRef = useRef();

  const handleClickAway = () => {
    if (isEditing) {
      setIsEditing(false);
      if (noteText.trim().length > 0) {
        handleAddNote(noteText);
      }
      setNoteText("");
    }
    setShowTextField(false);
    containerRef.current.style.minHeight = "30px";
  };

  const onTextAreaClick = () => {
    setIsEditing(true);
    setShowTextField(true);
    containerRef.current.style.minHeight = "70px";
  };

  const handleChange = (event) => {
    setNoteText(event.target.value);
  };

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Container ref={containerRef}>
        {showTextField ? (
          <TextField
            placeholder="Type to add a note..."
            variant="standard"
            InputProps={{ disableUnderline: true }}
            style={{ marginBottom: 10 }}
            value={noteText}
            onChange={handleChange}
            ref={textareaRef}
          />
        ) : (
          <p className="card-text" onClick={onTextAreaClick}>
            {noteText ? noteText : "Type to add a note..."}
          </p>
        )}
        {isEditing && (
          <div className="edit-card-footer">
            <Button
              variant="contained"
              onClick={handleClickAway}
              sx={{ marginTop: "10px" }}
            >
              Save
            </Button>
          </div>
        )}
      </Container>
    </ClickAwayListener>
  );
}

export default AddNote;
