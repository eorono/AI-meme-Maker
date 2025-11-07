
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500">
        AI Meme Magic
      </h1>
      <p className="mt-2 text-lg text-gray-400">
        Instantly create viral memes with the power of Gemini AI.
      </p>
    </header>
  );
};

export default Header;
