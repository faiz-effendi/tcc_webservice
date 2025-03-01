import React, { useEffect, useState } from 'react';
import axios from 'axios';

import NoteCard from '../components/notes_card';
import NavBar from '../components/navbar';

function Home() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");

  const fetchNotes = async () => {
    await axios
      .get(`http://localhost:5000/notes${search ? `/${search}` : ""}`)
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error.message);
      });
  };

  useEffect(() => {
    const delaySearch = setTimeout(fetchNotes, 400); // Debounce to prevent spam requests

    return () => clearTimeout(delaySearch); // Clear timeout if user is still typing
  }, [search]); // Fetch notes again if search changes

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleDelete = async (noteId) => {
    await axios
      .delete(`http://localhost:5000/notes${noteId ? `/${noteId}` : ""}`)
      .then((response) => {
        setAlertMessage(`Successfully deleted note`);
        setShowAlert(true);
        fetchNotes(); // Refresh notes after successful deletion
      })
      .catch((error) => {
        setAlertMessage("Failed to delete. Please try again.");
        setShowAlert(true);
      });
  };

  return (
    <>
      <NavBar 
        search={search}
        setSearch={setSearch}      
      />

      <div className='flex items-center flex-col min-h-screen bg-gray-100 pt-24 pb-14'>
        <div className='grid md:grid-cols-2 sm:grid-cols-1 gap-4 max-w-3xl h-fit auto-rows-min'>
          {notes.length > 0 ? (
            notes.map((note) => (
              <NoteCard
                owner={note.owner}
                title={note.title}
                content={note.contain}
                noteId={note.id}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>

        {/* Alert Pop-up */}
        {showAlert && (
          <div
            className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50"
            onClick={() => setShowAlert(false)}
          >
            <div className="bg-gray-800 opacity-60 absolute w-full h-full"></div>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs z-10 flex flex-col justify-center">
              <p className="text-gray-800">{alertMessage}</p>
              <button
                onClick={() => setShowAlert(false)}
                className="mt-6 bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-blue-400"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
