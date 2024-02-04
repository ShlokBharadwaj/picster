import React, { useState } from 'react';
import { FiPlus, FiUser, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import logo from '../assets/picster-logos_white.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col bg-gray-800 text-white">
      <div className="flex justify-between items-center p-1">
        <img
          src={logo}
          alt="logo"
          className="w-28 h-24 object-cover object-center -m-1"
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
      <div className="hidden md:flex max-w-full mx-1 justify-around p-2">
        <span>Cars</span>
        <span>Nature</span>
        <span>Photography</span>
        <span>Cars</span>
        <span>Nature</span>
        <span>Photography</span>
        <span>Cars</span>
        <span>Nature</span>
        <span>Photography</span>
        <span>Cars</span>
        <span>Nature</span>
        <span>Photography</span>
      </div>
      <div className="md:hidden flex items-center justify-center p-2" onClick={() => setIsOpen(!isOpen)}>
        <span>Menu</span>
        {isOpen ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col p-5 items-center justify-center">
          <span>Cars</span>
          <span>Nature</span>
          <span>Photography</span>
          <span>Cars</span>
          <span>Nature</span>
          <span>Photography</span>
          <span>Cars</span>
          <span>Nature</span>
          <span>Photography</span>
          <span>Cars</span>
          <span>Nature</span>
          <span>Photography</span>
        </div>
      )}
    </div>
  )
}

export default Navbar;