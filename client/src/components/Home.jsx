import React, { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';

import { Navbar, Login, UserProfile } from './index';
import Pins from './Pins';
import { sanityClient } from '../client';
import { userQuery } from "../utils/data";
import logo from '../assets/picster-logos_white.png';
import { fetchUser } from "../utils/fetchUsers";

const Home = () => {

  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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
  }, []);

  return (
    <>
      {/* <Navbar user={user && user} searchTerm={setSearchTerm} /> */}
      {/* <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-in-out">
        <div className="flex h-screen flex-initial"> */}
      <Pins searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={userInfo} />
      {/* </div>
      </div> */}
    </>
  )
}

export default Home