import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function EditNote() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the id from URL params
  const [formData, setFormData] = useState({
    owner: "",
    title: "",
    contain: "",
  });
  const [response, setResponse] = useState(null);

  // Fetch note data when the component mounts
  useEffect(() => {
    const fetchNote = async () => {
      await axios
        .get(`http://localhost:5000/notes/id/${id}`)
        .then((result) => {
          setFormData({
            owner: result.data[0].owner,
            title: result.data[0].title,
            contain: result.data[0].contain,
          });
        })
        .catch((error) => {
          console.error("Error fetching id:", error.message);
        });
    };

    fetchNote();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submission to update the note
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    await axios
      .put(`http://localhost:5000/notes/${id}`, formData)
      .then((response) => {
        setResponse(response.data);
        console.log("Success:", response.data);
        navigate("/"); // Navigate back to the notes list
      })
      .catch((error) => {
        console.error("Error updating note:", error.message);
      });
  };

  return (
    <div className="flex items-center justify-center flex-col min-h-screen bg-gray-100 pt-4">
      {/* Display Response */}
      <div className="min-w-6/12">
        {response && (
          <div className="p-2 mb-4 bg-green-200 border border-green-400 text-green-700 text-center rounded">
            Note updated successfully!
          </div>
        )}

        <div className="py-4 px-6 bg-gray-600 text-white flex items-center">
          <div
            className="left-3 flex items-center"
            onClick={() => navigate(-1)}
          >
            <i className="fas fa-arrow-left"></i> {/* Icon for Back */}
          </div>
          <h1 className="w-full text-2xl text-center font-bold uppercase">
            Edit Your Note
          </h1>
        </div>
        <form className="py-4 px-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="owner">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="owner"
              type="text"
              value={formData.owner}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder={formData.title}
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="contain">
              Message
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="contain"
              rows="4"
              placeholder={formData.contain}
              value={formData.contain}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-center mb-4">
            <button
              className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditNote;
