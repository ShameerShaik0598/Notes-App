import React, { useState, useRef } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { styled } from "@mui/material/styles";
import { BsFillPaletteFill } from "react-icons/bs";
import Popover from "react-popover";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import { FiInfo } from "react-icons/fi";

const StyledCard = styled(Card)`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  width: 240px;
  margin: 8px;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
  padding: 10px 5px 10px 5px;
`;

const Note = ({
  id,
  text,
  color,
  deleteNote,
  getNotes,
  updateANote,
  updateNoteColor,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [editedValue, setEditedValue] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(color); // Track the selected color
  const [isColorPopoverOpen, setIsColorPopoverOpen] = useState(false);
  const [isInfoPopoverOpen, setIsInfoPopoverOpen] = useState(false);

  const colorOptions = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF"];

  const previewCharacterLimit = 100;
  const shouldShowSeeMore = text.length > previewCharacterLimit;

  const editableRef = useRef(null);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedValue(text);
    setTextValue(text);
    setIsPopoverOpen(false);

    setTimeout(() => {
      const editableNode = editableRef.current;
      editableNode.focus();
      const range = document.createRange();
      range.selectNodeContents(editableNode);
      range.collapse(false);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }, 0);
  };

  const handleInputChange = () => {
    const updatedText = editableRef.current.textContent;
    if (updatedText.length >= 0) {
      setEditedValue(updatedText);
    }
  };

  const handleSave = () => {
    if (editedValue.trim().length > 0) {
      updateANote(id, editedValue);
      getNotes();
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedValue(text);
    setIsEditing(false);
  };

  const handlePopoverOpen = () => {
    setIsPopoverOpen(true);
  };

  const handlePopoverClose = () => {
    setIsPopoverOpen(false);
  };

  const handleColorPopoverClose = () => {
    setIsColorPopoverOpen(false);
  };

  const popoverContent = (
    <Card sx={{ maxWidth: 275 }}>
      <CardContent>
        <Typography>{text}</Typography>
      </CardContent>
    </Card>
  );

  const popoverContentForColor = (
    <Card sx={{ maxWidth: 275 }}>
      <CardContent>
        <div className="color-options-container">
          {colorOptions.map((colorOption) => (
            <div
              key={colorOption}
              className="color-option"
              style={{ backgroundColor: colorOption }}
              onClick={() => handleColorChange(colorOption)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderPreviewText = () => {
    if (shouldShowSeeMore && !isEditing) {
      return (
        <>
          {text.slice(0, previewCharacterLimit)}
          <span style={{ display: "inline-block" }}>
            {"..."}
            <a href="#" onClick={handleEditClick} style={{ color: "black" }}>
              See more
            </a>
          </span>
        </>
      );
    } else {
      return text;
    }
  };

  const handleColorChange = (newColor) => {
    setSelectedColor(newColor);
    updateNoteColor(id, newColor);
    setIsColorPopoverOpen(false);
  };

  const popoverContentForInfo = (
    <Card sx={{ maxWidth: 400, background: "#EBEBF2" }}>
      <CardContent>
        <Typography
          variant="body1"
          sx={{
            display: "block",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
          }}
        >
          {text}
        </Typography>
      </CardContent>
    </Card>
  );

  const handleInfoPopoverOpen = () => {
    setIsInfoPopoverOpen(true);
  };

  const handleInfoPopoverClose = () => {
    setIsInfoPopoverOpen(false);
  };

  return (
    <StyledCard style={{ backgroundColor: selectedColor }}>
      {" "}
      {/* Set the background color */}
      <CardContent>
        {isEditing ? (
          <div
            className="edit-card"
            contentEditable
            ref={editableRef}
            onBlur={handleInputChange}
            style={{
              outline: "none",
              boxShadow: "none",
              padding: "0",
              margin: "0",
              width: "100%",
              height: "100%",
              lineHeight: "1.5",
              resize: "none",
            }}
            dangerouslySetInnerHTML={{ __html: editedValue }}
          />
        ) : (
          <Typography
            variant="body1"
            className="card-textarea mb-4"
            sx={{
              display: "block",
              width: "200px",
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
            }}
          >
            {renderPreviewText()}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        {isEditing ? (
          <div>
            <Button
              onClick={handleSave}
              variant="contained"
              sx={{ mx: "auto", mt: 2 }}
            >
              Save
            </Button>
            <Button
              onClick={handleCancel}
              variant="danger"
              sx={{ mx: "auto", mt: 2 }}
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            <>
              <div
                className="icons-container"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "250px",
                }}
              >
                <FaEdit className="edit-icon" onClick={handleEditClick} />
                <Popover
                  isOpen={isPopoverOpen}
                  body={popoverContent}
                  onOuterAction={handlePopoverClose}
                  preferPlace="below"
                >
                  <BsFillPaletteFill
                    className="change-color-icon"
                    size="1.3em"
                    onClick={() => setIsColorPopoverOpen(true)}
                  />
                  {isColorPopoverOpen && (
                    <Popover
                      isOpen={isColorPopoverOpen}
                      body={popoverContentForColor}
                      onOuterAction={handleColorPopoverClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    ></Popover>
                  )}
                </Popover>
                <Popover
                  isOpen={isInfoPopoverOpen}
                  body={popoverContentForInfo}
                  onOuterAction={handleInfoPopoverClose}
                  preferPlace="below"
                >
                  <FiInfo
                    className="info-icon"
                    size="1.3em"
                    onClick={handleInfoPopoverOpen}
                  />
                </Popover>
                <MdDeleteForever
                  className="delete-icon"
                  size="1.3em"
                  onClick={() => {
                    deleteNote(id);
                  }}
                />
              </div>
            </>
          </>
        )}
      </CardActions>
    </StyledCard>
  );
};

export default Note;
