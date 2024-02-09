import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Navbar, Feed, PinDetails, CreatePin, Search, UserProfile } from './index';

const Pins = (user) => {

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="px-2 md:px-5">
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route path="/pin-detail/:pinId" element={<PinDetails user={user} />} />
          <Route path="/create-pin" element={<CreatePin user={user} ></CreatePin>} />
          <Route path="/search" element={< Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
          <Route path="/user-profile/:userID" element={<UserProfile />} />

        </Routes>
      </div>
    </div>
  )
}

export default Pins;