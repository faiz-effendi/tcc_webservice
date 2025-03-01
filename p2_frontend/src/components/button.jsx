const colors = {
  blue: "bg-gray-400 hover:bg-gray-500",
  red: "bg-red-300 hover:bg-red-400",
};

function Button({ text, color }) {
  return (
    <button className={`${colors[color] || "bg-gray-300"} text-white font-medium text-xs py-2 px-4 rounded-md`}>
      {text}
    </button>
  );
}

export default Button;