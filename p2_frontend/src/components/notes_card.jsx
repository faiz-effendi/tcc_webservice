import { useState } from "react";
import Button from "./button";

function NoteCard({ owner, title, content }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Set character limit to 48
  const charLimit = 48;
  const shortContent = content.length > charLimit ? content.slice(0, charLimit) + "... " : content;

  return (
    <div className="relative w-fill max-w-2xl flex flex-col min-h-56 h-full justify-between items-start space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 px-4 py-8 border-2 border-dashed border-gray-400 dark:border-gray-400 shadow-lg rounded-lg">
      
      <div className="w-full flex justify-center sm:justify-start sm:w-auto">
        <img className="object-cover w-20 h-20 mt-3 mr-3 rounded-full" src="../public/zuck.jpg" />
      </div>

      <div className="w-full max-w-11/12 flex flex-col sm:items-start h-full justify-between">
        <div>
          <p className="font-display text-sm font-medium text-gray-600" itemProp="author">
            Owner: {owner}
          </p>

          <p className="font-display text-xl font-semibold">
            {title.toUpperCase()}
          </p>

          <div className="mb-4 md:text-base text-gray-600">
            <p>
              {isExpanded ? content : shortContent}
              {!isExpanded && content.length > charLimit && (
                <span 
                  onClick={() => setIsExpanded(true)} 
                  className="text-blue-500 hover:underline cursor-pointer"
                >
                  Show more
                </span>
              )}
            </p>
            
            {isExpanded && (
              <button
                onClick={() => setIsExpanded(false)}
                className="text-blue-500 hover:underline mt-2"
              >
                Show less
              </button>
            )}
          </div>
        </div>

        {/* Buttons di bawah */}
        <div className="flex gap-2">
          <Button text="Edit" color="blue" />
          <Button text="Delete" color="red" />
        </div>
      </div>

    </div>
  );
}

export default NoteCard;
