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

  const loggedInUserId = JSON.parse(localStorage.getItem('picster-user'))?.sub;
  // console.log("loggedInUserId: ", loggedInUserId);

  useEffect(() => {
    const fetchUserQuery = userQuery(userID);

    sanityClient.fetch(fetchUserQuery)
      .then((user) => setUser(user[0]))
      .catch(console.error);
  }, [userID]);

  useEffect(() => {
    if (text === "Created Pins") {
      const fetchCreatedPinsQuery = userCreatedPinsQuery(userID);

      sanityClient.fetch(fetchCreatedPinsQuery)
        .then((createdPins) => {
          setCreatedPins(createdPins)
          //console.log("Created Pins: ", createdPins);
        })
        .catch(console.error);
    } else {
      const fetchSavedPinsQuery = userSavedPinsQuery(userID);

      sanityClient.fetch(fetchSavedPinsQuery)
        .then((savedPins) => {
          setCreatedPins(savedPins)
          //console.log("Saved Pins: ", savedPins);
        })
        .catch(console.error);
    }
  }, [text, userID]);

  const logoutGoogle = () => {
    googleLogout();
    localStorage.removeItem('picster-user');
    navigate('/login', { replace: true });
  }

  if (!user) {
    return <Spinner message={"Loading User Profile"} />
  }

  // console.log("userID: ", userID);
  // console.log("user._id: ", user._id);

  return (
    <div className="relative pb-2 h-full justify-center items-center transition-all duration-200 animate-fade-in">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img src={randomImgSrc}
              alt={"cover"}
              className="w-screen h-64 shadow-md object-cover" />
            <img src={user.image}
              alt="profile"
              className="rounded-full w-32 h-32 -mt-16 shadow-2xl object-cover z-50" />
            <h3 className="font-bold text-3xl text-center mt-3">{user.userName}</h3>
            <div className="absolute top-2 right-2 z-10">
              {userID === loggedInUserId && (
                <button
                  onClick={logoutGoogle}
                  className='flex justify-center items-center bg-white text-black rounded-full p-3 shadow-2xl mt-3 hover:scale-105 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 opacity-50 hover:opacity-100'
                >
                  <AiOutlineLogout size={30} />
                  <span className='ml-2'>Logout</span>
                </button>
              )}
            </div>
          </div>
          <div className="text-center mb-7">
            <button
              type="button"
              onClick={(e) => {
                setText('Created Pins');
                setActiveBtn('createdPins');
              }}
              className={`text-xl font-bold p-3 outline-none ${activeBtn === 'createdPins' ? 'text-blue-500' : 'text-gray-500'} hover:scale-105 transition-all duration-200 ease-in-out`}
            >
              Created Pins
            </button>
            <button
              type="button"
              onClick={(e) => {
                setText('Saved Pins');
                setActiveBtn('savedPins');
              }}
              className={`text-xl font-bold p-3 outline-none ${activeBtn === 'savedPins' ? 'text-blue-500' : 'text-gray-500'} hover:scale-105 transition-all duration-200 ease-in-out`}
            >
              Saved Pins
            </button>
          </div>
          {createdPins && createdPins.length === 0 && (
            <div className="flex justify-center items-center">
              <p className="text-2xl font-bold text-center text-gray-500">No Pins Found</p>
            </div>
          )
          }
          <div className="px-2">
            <MasonryLayout pins={createdPins} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile;