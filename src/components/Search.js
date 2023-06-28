import React from "react";
import { MdSearch } from "react-icons/md";

const Search = ({ handleSearchNote }) => {
  const handleChange = (event) => {
    console.log(event.target.value); // Print the value in the console
    handleSearchNote(event.target.value);
  };

  return (
    <div className="search">
      <MdSearch className="search-icons" size="1.3em" />
      <input
        onChange={handleChange} // Use the modified event handler
        type="text"
        placeholder="Type to search"
      ></input>
    </div>
  );
};

export default Search;

// import React, { useState, useEffect } from "react";
// import Note from "./Note";
// // import AddNote from "./AddNote";
// // import axios from "axios";
// import Dashboard from "./Dashboard";
// import Search from "./Search";

// function NotesList(getNotes, setNotes, notes) {
//   // const [notes, setNotes] = useState([]);
//   const [searchText, setSearchText] = useState("");

//   useEffect(() => {
//     getNotes();
//   }, []);

//   // const getNotes = async () => {
//   //   try {
//   //     const response = await axios.get(
//   //       "http://localhost:1500/notes/get-all-notes"
//   //     );
//   //     setNotes(response.data.payload);
//   //   } catch (error) {
//   //     console.error("Error fetching notes:", error);
//   //   }
//   // };

//   // const handleAddNote = async (text) => {
//   //   try {
//   //     await axios.post("http://localhost:1500/notes/add-notes", { note: text });
//   //     getNotes();
//   //   } catch (error) {
//   //     console.error("Error adding note:", error);
//   //   }
//   // };

//   const handleSearchNote = (searchValue) => {
//     setSearchText(searchValue);
//   };

//   const filteredNotes = notes.filter((note) =>
//     note.text.toLowerCase().includes(searchText.toLowerCase())
//   );

//   return (
//     <div>
//       <Dashboard />
//       <Search handleSearchNote={handleSearchNote} />
//       <div className="notes-list">
//         {filteredNotes.map((note) => (
//           <Note
//             key={note.note_id}
//             id={note.note_id}
//             text={note.text}
//             date={note.date}
//           />
//         ))}
//         {/* <AddNote handleAddNote={handleAddNote} /> */}
//       </div>
//     </div>
//   );
// }

// export default NotesList;
