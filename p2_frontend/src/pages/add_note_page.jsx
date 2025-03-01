import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function AddNote() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    owner: "",
    title: "",
    contain: "",
  });
  const [response, setResponse] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id] : e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    await axios
      .post("http://localhost:5000/notes", formData)
      .then((response) => {
        setResponse(response.data);
        console.log("Success:", res.data);
        navigate("/notes");
      })
      .catch(() => {
        console.error("Error adding note:", error);
      });
  };

  return (
    <div className="flex items-center justify-center flex-col min-h-screen bg-gray-100 pt-4">
      {/* Display Response */}
      <div className="min-w-6/12">
        {response && (
          <div className="p-2 mb-4 bg-green-200 border border-green-400 text-green-700 text-center rounded">
            Note added successfully!
          </div>
        )}

        <div className=" py-4 px-6 bg-gray-600 text-white flex items-center">
          <div className="left-3 flex items-center"
          onClick={() => window.history.back()}>
            <i className="fas fa-arrow-left"></i> {/* Ikon Search */}
          </div>
          <h1 className=" w-full text-2xl text-center font-bold uppercase">
            Add Your Note
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
              placeholder="Enter your name"
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
              placeholder="Enter your title"
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
              placeholder="Enter any additional information"
              value={formData.contain}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-center mb-4">
            <button
              className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNote;
