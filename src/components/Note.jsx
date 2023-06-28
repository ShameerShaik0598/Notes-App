import React, { useState, useRef } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import { MdOutlineColorLens } from "react-icons/md";
import { styled } from "@mui/material/styles";
import { FaRegEdit } from "react-icons/fa";
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
  // background: skyblue;
  border-radius: 8px;
  width: 100%;
  margin: 8px;
  min-height: 200px;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  word-wrap: break-word;
  overflow-wrap: break-word;
  background-color: ${(props) => props.color};
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
  const [selectedColor, setSelectedColor] = useState(color);
  const [isColorPopoverOpen, setIsColorPopoverOpen] = useState(false);
  const [isInfoPopoverOpen, setIsInfoPopoverOpen] = useState(false);

  const colorOptions = [
    "#FFFAD7",
    "#FF90BB",
    "#5A96E3",
    "#FF8551",
    "#9BCDD2",
    "#E1AEFF",
    "#F1F1F1",
    "#FFB9B9",
    "#B9F8D3",
    "#F1C376",
    "#C2DEDC",
    "#C38154",
    "#9384D1",
    "#FAF7F0",
  ];

  const previewCharacterLimit = 130;
  const shouldShowSeeMore = text.length > previewCharacterLimit;

  const editableRef = useRef(null);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedValue(text);
    setTextValue(text);
    setIsPopoverOpen(false);

    // Set cursor at the end of the text
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

  const popoverContentForColor = (
    <Card sx={{ maxWidth: "100%", bgcolor: "black", borderRadius: "30px" }}>
      <CardContent>
        <div className="color-options-container">
          {colorOptions.map((colorOption) => (
            <div
              key={colorOption}
              className="color-option"
              style={{ backgroundColor: colorOption, borderRadius: "50%" }}
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

  const popoverContent = (
    <Card sx={{ maxWidth: 275 }}>
      <CardContent>
        <Typography>{text}</Typography>
      </CardContent>
    </Card>
  );

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

  const handleColorPopoverOpen = () => {
    setIsColorPopoverOpen(true);
  };

  const handleInfoPopoverOpen = () => {
    setIsInfoPopoverOpen(true);
  };

  const handleInfoPopoverClose = () => {
    setIsInfoPopoverOpen(false);
  };

  return (
    <StyledCard color={selectedColor} isEditing={isEditing}>
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
              width: "100%",
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
          <div className="m-1 p-1">
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
            <div
              className="icons-container mb-1"
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <FaRegEdit className="edit-icon ms-2" onClick={handleEditClick} />
              <Popover
                isOpen={isPopoverOpen}
                body={popoverContent}
                onOuterAction={handlePopoverClose}
                preferPlace="below"
              >
                {" "}
              </Popover>

              <Popover
                className="color-popover"
                isOpen={isColorPopoverOpen}
                body={popoverContentForColor}
                onOuterAction={handleColorPopoverClose}
                preferPlace="below"
              >
                <MdOutlineColorLens
                  className="change-color-icon"
                  size="1.3em"
                  onClick={handleColorPopoverOpen}
                />
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
              <MdOutlineDeleteForever
                className="delete-icon me-2"
                size="1.3em"
                onClick={() => {
                  deleteNote(id);
                }}
              />
            </div>
          </>
        )}
      </CardActions>
    </StyledCard>
  );
};

export default Note;
