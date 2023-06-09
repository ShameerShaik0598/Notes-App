import React, { useState, useRef } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BsFillPaletteFill } from "react-icons/bs";
import Popover from "react-popover";
import { Card } from "react-bootstrap";
import { FiInfo } from "react-icons/fi";

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

  const colorOptions = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF"];

  const previewCharacterLimit = 100;
  const shouldShowSeeMore = text.length > previewCharacterLimit;

  const editableRef = useRef(null);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedValue(text);
    setTextValue(text);
    setIsPopoverOpen(false);
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
    <Card className="popover-card">
      <Card.Body className="popover-body">
        <Card.Text>{text}</Card.Text>
      </Card.Body>
    </Card>
  );

  const popoverContentForColor = (
    <Card className="popover-card">
      <Card.Body className="popover-body color-options-container">
        {colorOptions.map((colorOption) => (
          <div
            key={colorOption}
            className="color-option"
            style={{ backgroundColor: colorOption }}
            onClick={() => handleColorChange(colorOption)}
          />
        ))}
      </Card.Body>
    </Card>
  );

  const renderPreviewText = () => {
    if (shouldShowSeeMore && !isEditing) {
      return (
        <>
          {text.slice(0, previewCharacterLimit)}
          <span style={{ display: "inline" }}>
            {"... "}
            <a href="#" onClick={handleEditClick}>
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
    <Card className="popover-card">
      <Card.Body className="popover-body">
        <Card.Text>{text}</Card.Text>
      </Card.Body>
    </Card>
  );

  const handleInfoPopoverOpen = () => {
    setIsInfoPopoverOpen(true);
  };

  const handleInfoPopoverClose = () => {
    setIsInfoPopoverOpen(false);
  };

  return (
    <div className="card " style={{ backgroundColor: selectedColor }}>
      <div className="card-body" style={{ backgroundColor: selectedColor }}>
        {isEditing ? (
          <div>
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
            <div className="note-footer mt-4">
              <button
                onClick={handleSave}
                className="btn btn-success w-25 mx-auto mt-2"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="btn btn-danger w-25 mx-auto mt-2"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="card-text mb-4">{renderPreviewText()}</p>
            <div className="note-footer border-0">
              <FaEdit className="edit-icon" onClick={handleEditClick}>
                Edit
              </FaEdit>
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
                <Popover
                  isOpen={isColorPopoverOpen}
                  body={popoverContentForColor}
                  onOuterAction={handleColorPopoverClose}
                  preferPlace="below"
                >
                  <div
                    className="card"
                    style={{ backgroundColor: selectedColor }}
                  ></div>
                </Popover>
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
        )}
      </div>
    </div>
  );
};

export default Note;
