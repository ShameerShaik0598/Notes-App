import React, { Children, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Router } from "react-router-dom";
import { nanoid } from "nanoid";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navigate } from "react-router-dom";
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Dashboard from "./components/Dashboard";
import RootLayout from "./components/Rootlayout";
import ErrorPage from "./components/ErrorPage";
import { Provider } from "react-redux";
import Login from "./components/Login";
import Register from "./components/Register";
import store from "./store";
import AddNote from "./components/AddNote";

const App = () => {
  const [notes, setNotes] = useState([]);

  const [searchText, setSerachText] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("react-notes-app-data"));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };

    const newNotes = [...notes, newNote];
    setNotes(newNotes);
    localStorage.setItem("react-notes-app-data", JSON.stringify(newNotes));
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
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
          path: "get-all-notes",
          element: (
            <NotesList
              notes={notes.filter((note) =>
                note.text.toLocaleLowerCase().includes(searchText)
              )}
              handleAddNote={addNote}
              handleDeleteNote={deleteNote}
            />
          ),
        },
        {
          path: "add-notes",
          element: <AddNote />,
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
        <div className={`${darkMode && "dark-mode"}`}>
          {/* Provide to App  */}

          <div className="container">
            <Dashboard handleToggleDarkMode={setDarkMode} />
            <Search handleSearchNote={setSerachText} />
            <div>
              {/* <NotesList
                notes={notes.filter((note) =>
                  note.text.toLocaleLowerCase().includes(searchText)
                )}
                handleAddNote={addNote}
                handleDeleteNote={deleteNote}
              /> */}
            </div>
          </div>
        </div>
      </RouterProvider>
    </Provider>
  );
};

export default App;
