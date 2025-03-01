import React from "react";
import { useNavigate } from "react-router-dom";

const colors = {
  blue: "bg-gray-400 hover:bg-gray-500",
  red: "bg-red-300 hover:bg-red-400",
};

function Button({ text, color, noteId, onDelete }) {
  const navigate = useNavigate();

  return (
    <button 
      className={`${colors[color] || "bg-gray-300"} text-white font-medium text-xs py-2 px-4 rounded-md`}
      onClick={() => {
        color == "red" && onDelete ? onDelete(noteId) : navigate(`/edit-note/${noteId}`);
      }}
    >
      {text}
    </button>
  );
}

export default Button;