import React, { useState, useEffect } from 'react';
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate, useParams } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';

import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from "../utils/data";
import { sanityClient } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const randomImgSrc = "https://source.unsplash.com/random/1600x900";

const UserProfile = () => {

  const [user, setUser] = useState(null);
  const [createdPins, setCreatedPins] = useState(null);
  const [text, setText] = useState('Created Pins');
  const [activeBtn, setActiveBtn] = useState('createdPins');
  const navigate = useNavigate();
  const { userID } = useParams();

  useEffect(() => {
    const fetchUserQuery = userQuery(userID);

    sanityClient.fetch(fetchUserQuery)
      .then((user) => setUser(user[0]))
      .catch(console.error);
  }, [userID]);

  const logoutGoogle = () => {
    localStorage.removeItem('picster-user');
    navigate('/login', { replace: true });
  }

  if (!user) {
    return <Spinner message={"Loading User Profile"} />
  }

  console.log("userID: ", userID);
  console.log("user._id: ", user._id);

  return (
    <div className="relative pb-2 h-full justify-center items-center transition-all duration-200 animate-fade-in">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img src={randomImgSrc}
              alt={"cover-photo"}
              className="w-screen h-64 shadow-md object-cover" />
            <img src={user.image}
              alt="profile-photo"
              className="rounded-full w-32 h-32 -mt-16 shadow-2xl object-cover z-50" />
            <h3 className="font-bold text-3xl text-center mt-3">{user.userName}</h3>
            {userID === user._id && (
              <button
                onClick={logoutGoogle}
                className='flex justify-center items-center bg-white text-black rounded-full p-3 shadow-2xl mt-3'
              >
                <AiOutlineLogout size={30} />
                <span className='ml-2'>Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile;