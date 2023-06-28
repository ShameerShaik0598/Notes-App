import React, { useEffect, useState, useRef } from "react";
import { Box, TextField, ClickAwayListener, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { v4 as uuid } from "uuid";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  margin: "auto",
  boxSizing: "border-box",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 2px 6px rgba(255, 255, 255, 0.2)"
      : "0 1px 2px rgba(0, 0, 0, 0.3)",
  borderColor: theme.palette.mode === "dark" ? "#424242" : "#e0e0e0",
  background: theme.palette.mode === "dark" ? "#424242" : "#fff",
  color: theme.palette.mode === "dark" ? "#fff" : "#000",
  width: "600px",
  borderRadius: "8px",
  minHeight: "30px",
  padding: "10px 15px",
}));

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
