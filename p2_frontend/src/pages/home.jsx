import React, { useEffect, useState } from 'react';
import axios from 'axios';

import NoteCard from '../components/notes_card';
import NavBar from '../components/navbar'

function Home() {
  const [ notes, setNotes ] = useState([]);
  const [ search, setSearch ] = useState("");

  useEffect(() => {
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

    const delaySearch = setTimeout(fetchNotes, 400); // Debounce agar tidak spam request

    return () => clearTimeout(delaySearch); // Bersihkan timeout jika user masih mengetik
  }, [search]); // Panggil ulang useEffect jika search berubah

  return (
    <>
      <NavBar 
        search={search}
        setSearch={setSearch}      
      />

      <div className='flex items-center flex-col min-h-screen bg-gray-100 pt-24 pb-14'>
        <div className='grid md:grid-cols-2 sm:grid-cols-1 gap-4 max-w-3xl h-fit auto-rows-min'>
          { notes.length > 0 ? (
            notes.map((note, index) => (
              <NoteCard
                owner= {note.owner}
                title= {note.title}
                content= {note.contain}
                button= {note.id}
              />
            ))
          ) : (
            <p>Loading...</p>
          )
          }
        </div>
      </div>
    </>
  );
}

export default Home;
