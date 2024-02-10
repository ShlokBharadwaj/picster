import React, { useState, useEffect } from 'react';

import Pins from './Pins';
import { sanityClient } from '../client';
import { userQuery } from "../utils/data";
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
  }, [userInfo?.sub]);

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