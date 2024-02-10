import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Navbar, Feed, PinDetails, CreatePin, Search, UserProfile } from './index';

const Pins = ({ user }) => {

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="h-full">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user && user} />
      <Routes>
        <Route path="/" element={<div className="px-2 md:px-5"><Feed /></div>} />
        <Route path="/category/:categoryId" element={<div className="px-2 md:px-5"><Feed /></div>} />
        <Route path="/pin-detail/:pinId" element={<div className="px-2 md:px-5"><PinDetails user={user} /></div>} />
        <Route path="/create-pin" element={<div className="px-2 md:px-5"><CreatePin user={user} ></CreatePin></div>} />
        <Route path="/search" element={<div className="px-2 md:px-5"><Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} /></div>} />
        <Route path="/user-profile/:userID" element={<UserProfile />} />
      </Routes>
    </div>
  )
}

export default Pins;