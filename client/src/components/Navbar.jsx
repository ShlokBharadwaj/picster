import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiPlus, FiUser, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { userQuery } from "../utils/data";
import { sanityClient } from '../client';
import logo from '../assets/picster-logos_white.png';
import { fetchUser } from "../utils/fetchUsers";
import { categories } from "../utils/data";

const Navbar = ({ searchTerm, setSearchTerm, userProp }) => {

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [activeCategory, setActiveCategory] = useState('');

  const userInfoString = fetchUser();
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

  useEffect(() => {
    const query = userQuery(userInfo?.sub);

    sanityClient
      .fetch(query)
      .then(data => {
        if (data) {
          setUser(data[0]);
        }
      })
      .catch(console.error);
  }, [userInfo?.sub]);

  return (
    <div className="flex flex-col bg-gray-800 text-white w-full md:w-screen">
      <div className="flex justify-between items-center p-2 md:p-4">
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="w-14 h-12 md:w-28 md:h-24 object-cover object-center -m-1"
            onClick={() => {
              setActiveCategory('');
              setIsOpen(false);
              setSearchTerm('');
            }}
          />
        </Link>
        <input
          className="flex-grow mx-0 md:mx-5 py-2 px-4 rounded-full w-1/3 md:w-1/2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          onFocus={() => navigate('/search')}
          onClick={() => {
            setActiveCategory('');
            setIsOpen(false);
          }}
        />
        <div className="flex space-x-0  md:space-x-4">
          <button className="p-0 md:p-1"
            onClick={() => {
              setActiveCategory('');
              setIsOpen(false);
            }}>
            <Link to="/create-pin">
              <FiPlus size={24} className="w-10 h-10 object-cover object-center rounded-full" />
            </Link>
          </button>
          <button className="p-0 md:p-1"
            onClick={() => {
              setActiveCategory('');
              setIsOpen(false);
            }}
          >
            {userInfo ? (
              <Link to={`user-profile/${userInfo?.sub}`}>
                <img
                  src={userInfo?.picture || 'https://via.placeholder.com/150'}
                  alt="profile"
                  className="w-10 h-10 object-cover object-center rounded-full"
                />
              </Link>
            ) : (
              <Link to="/login">
                <FiUser size={24} />
              </Link>
            )}
          </button>
        </div>
      </div>
      <div className="hidden md:flex max-w-full mx-1 justify-around p-2 ">
        {categories.slice(0, categories.length - 1).map((category, index) => (
          <NavLink
            key={index}
            to={category.link}
            className="hover:text-gray-400 rounded-md border border-transparent focus:border-white p-2 hover:border-white transition-all duration-300 ease-in-out focus:bg-gray-700 focus:text-white capitalize flex flex-col items-center hover:scale-110"
            activeClassName="text-white"
          >
            <img src={category.image} alt={category.name} className="w-10 h-10 object-cover rounded-full" />
            {category.name}
          </NavLink>
        ))}
      </div>
      <div className="md:hidden flex items-center justify-center p-2 capitalize" onClick={() => setIsOpen(!isOpen)}>
        <span>{activeCategory || "Menu"}</span>
        {isOpen ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col p-5 items-center justify-center">
          {categories.slice(0, categories.length - 1).map((category, index) => (
            <NavLink
              key={index}
              to={category.link}
              className="hover:text-gray-400 rounded-md border border-transparent focus:border-white p-2 hover:border-white transition-all duration-300 ease-in-out focus:bg-gray-700 focus:text-white flex flex-col items-center capitalize"
              activeClassName="text-white"
              onClick={() => {
                setIsOpen(false)
                setActiveCategory(category.name)
              }}
            >
              <img src={category.image} alt={category.name} className="w-10 h-10 object-cover rounded-full" />
              {category.name}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

export default Navbar;