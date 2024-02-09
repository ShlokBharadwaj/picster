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

  if (!user) {
    return <Spinner message={"Loading User Profile"} />
  }

  console.log(user);

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img src={randomImgSrc}
              alt={"cover-photo"}
              className="w-screen h-64 shadow-md object-cover"
            />
            <img src={user.image}
              alt="profile-photo"
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover z-50" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile;