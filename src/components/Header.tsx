import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="w-full bg-white p-6 flex flex-col items-center">
      <div className="flex items-center justify-center mb-4">
        <span className="text-yellow-400 text-xl">✨</span>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mx-2">TrickMeNot AI Free Essay Writer</h2>
        <span className="text-yellow-400 text-xl">✨</span>
      </div>
    </div>
  );
};

export default Header;