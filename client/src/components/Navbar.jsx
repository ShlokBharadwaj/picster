import React from 'react';
import { FiPlus, FiUser } from 'react-icons/fi';

const Navbar = () => {
  return (
    <div className="flex flex-col bg-gray-800 text-white">
      <div className="flex justify-between items-center p-5">
        <div className="font-bold">Logo</div>
        <input className="flex-grow mx-5 py-2 px-4 rounded-full" type="text" placeholder="Search..." />
        <div className="flex space-x-5">
          <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
            <FiPlus size={24} />
          </button>
          <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
            <FiUser size={24} />
          </button>
        </div>
      </div>
      <div className="flex space-x-28 p-5">
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
    </div>
  )
}

export default Navbar;