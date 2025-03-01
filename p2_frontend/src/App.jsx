import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import AddNote from './pages/add_note_page';
import EditNote from './pages/edit_note_page';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-note" element={<AddNote />} />
      <Route path="/edit-note/:id" element={<EditNote />} />
    </Routes>
  );
}

export default App;
