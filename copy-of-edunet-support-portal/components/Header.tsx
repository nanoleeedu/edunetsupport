import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-[#1c2541] p-4 shadow-md w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#32cd32]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
            </svg>
            <span className="text-xl font-bold font-sans text-white">Edunet Portal</span>
        </div>
        <div className="flex items-center space-x-4">
            <a href="/" className="text-gray-300 hover:text-white transition-colors duration-200">
                Dashboard
            </a>
            <button className="text-gray-300 hover:text-white transition-colors duration-200">
              Logout
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;