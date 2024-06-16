import React from 'react';

function Footer({ handleArrowClick }) {
  return (
    <div className="flex justify-end items-center p-4 bg-WHITE-50 text-purple-400">
      <div className="flex items-center space-x-4">
        <div className="flex space-x-0.4">
          <button
            onClick={() => handleArrowClick('up')}
            className="focus:outline-none bg-purple-400 w-8 h-8 flex items-center justify-center text-lg font-bold text-white"
          >
       ∧
          </button>
          <button
            onClick={() => handleArrowClick('down')}
            className="focus:outline-none bg-purple-400 w-8 h-8 flex items-center justify-center text-lg font-bold text-white"
          >
          ∨
          
          </button>
        </div>
        <div className="bg-purple-400 text-white px-3 py-1 rounded text-sm">
          Powered by Typeform
        </div>
      </div>
    </div>
  );
}

export default Footer;
