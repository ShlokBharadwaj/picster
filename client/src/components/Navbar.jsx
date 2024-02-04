import React, { useState } from 'react';
import { FiPlus, FiUser, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import logo from '../assets/picster-logos_white.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col bg-gray-800 text-white">
      <div className="flex justify-between items-center p-2">
        <img
          src={logo}
          alt="logo"
          className="w-16 h-16 md:w-20 md:h-20 lg:w-16 lg:h-16 object-contain max-w-full max-h-full"
        />
        <input
          className="flex-grow mx-5 py-2 px-4 rounded-full"
          type="text"
          placeholder="Search..."
        />
        <div className="flex space-x-5">
          <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
            <FiPlus size={24} />
          </button>
          <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
            <FiUser size={24} />
          </button>
        </div>
      </div>
      <div className="hidden md:flex space-x-4 p-3">
        <span>Cars</span>
        <span>Nature</span>
        <span>Photography</span>
        {/* Add more spans for additional navigation items */}
      </div>
      <div className="md:hidden flex items-center p-5" onClick={() => setIsOpen(!isOpen)}>
        <span>Menu</span>
        {isOpen ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col p-5">
          <span>Cars</span>
          <span>Nature</span>
          <span>Photography</span>
          {/* Add more spans for additional navigation items */}
        </div>
      )}
    </div>
  )
}

export default Navbar;