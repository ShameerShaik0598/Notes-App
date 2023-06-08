import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";

//import components
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Dashboard from "./components/Dashboard";
import RootLayout from "./components/Rootlayout";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/Login";
import Register from "./components/Register";
import store from "./store";
import ForgotPassword from "./components/ForgotPassword";

const App = () => {
  // maintaining states

  const [notes, setNotes] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [noteAdded, setNoteAdded] = useState(false);

  const [noteDeleted, setNoteDeleted] = useState(false);

  const [updateNote, setUpdatedNote] = useState(false);

  const [message, setMessage] = useState("");

  let token = sessionStorage.getItem("token");

  //functions

  //add a note
  const addNote = async (text) => {
    console.log("addNote text", text);
    let res = await axios.post(
      "http://localhost:1500/notes/add-notes",
      { note: text },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    setNoteAdded(true);
  };

  //update a note
  const updateANote = async (id, editedValue) => {
    try {
      let res = await axios.put(
        `http://localhost:1500/notes/update-notes/${id}`,
        {
          note: editedValue,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      setUpdatedNote(true);
      if (res.status === 200) {
        setMessage("Note Updated Successfully");
      } else {
        setMessage("Failed to update the Note");
      }
      // navigate("/get-all-notes");
    } catch (error) {
      setMessage("An error has occured while updating ");
      console.error(error);
    }
  };

  //delete a note
  const deleteNote = async (note_id) => {
    try {
      let res = await axios.put(
        `http://localhost:1500/notes/delete-notes/${note_id}`,
        {
          status: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNoteDeleted(true);
      if (res.status === 200) {
        setMessage("Notes Deleted succesfully");
      } else {
        setMessage("Error while deleting the notes");
      }
    } catch (err) {
      setMessage("Error occured at deleting the note");
      console.log(err);
    }
  };

  //create Browser Route
  const browserRouterObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },

        {
          path: "get-all-notes",
          element: (
            <NotesList
              notes={notes.filter((note) =>
                note.text.toLocaleLowerCase().includes(searchText)
              )}
              handleAddNote={addNote}
              deleteNote={deleteNote}
              noteAdded={noteAdded}
              setNoteAdded={setNoteAdded}
              updateANote={updateANote}
              updateNote={updateNote}
              setUpdatedNote={setUpdatedNote}
              noteDeleted={noteDeleted}
              setNoteDeleted={setNoteDeleted}
              handleSearchNote={setSearchText}
            />
          ),
        },
        {
          path: "",
          element: <Navigate to="login" replace={true} />,
        },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={browserRouterObj}>
        <div>
          {/* Provide to App  */}
          <div>
            <Dashboard />
            <Search setSearchText={setSearchText} />
            <div>
              <NotesList />
            </div>
          </div>
        </div>
      </RouterProvider>
    </Provider>
  );
};

export default App;
