import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { FiPlus, FiUser, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { userQuery } from "../utils/data";
import { sanityClient } from '../client';
import logo from '../assets/picster-logos_white.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const userInfoString = localStorage.getItem('picster-user');
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

  useEffect(() => {
    const query = userQuery(userInfo?._id);

    sanityClient
      .fetch(query)
      .then(data => {
        if (data) {
          setUser(data[0]);
        }
      })
      .catch(console.error);
  }, []);


  return (
    <div className="flex flex-col bg-gray-800 text-white w-full md:w-screen">
      <div className="flex justify-between items-center p-2 md:p-4">
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="w-14 h-12 md:w-28 md:h-24 object-cover object-center -m-1"
          />
        </Link>
        <input
          className="flex-grow mx-0 md:mx-5 py-2 px-4 rounded-full w-1/3 md:w-1/2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          type="text"
          placeholder="Search..."
        />
        <div className="flex space-x-0  md:space-x-4">
          <button className="p-0 md:p-1">
            <FiPlus size={24} className="w-10 h-10 object-cover object-center rounded-full" />
          </button>
          <button className="p-0 md:p-1">
            <Link to={`user-profile/${userInfo?.sub}`}>
              <img
                src={userInfo?.picture || 'https://via.placeholder.com/150'}
                alt="profile"
                className="w-10 h-10 object-cover object-center rounded-full"
              />
            </Link>
          </button>
        </div>
      </div>
      <div className="hidden md:flex max-w-full mx-1 justify-around p-2 ">
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