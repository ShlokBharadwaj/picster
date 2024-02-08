import React, { useState, useEffect } from 'react';
import { urlFor, sanityClient } from "../client";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { fetchUser } from "../utils/fetchUsers";
import { CiLocationArrow1 } from "react-icons/ci";

const Pin = ({ pin: { postedBy, image, _id, destination, save } }) => {

  // console.log('postedBy:', postedBy);
  // console.log('image:', image);
  // console.log('_id:', _id);
  // console.log('destination:', destination);
  // console.log('save:', save);

  const [postHovered, setPostHovered] = useState(false);
  const navigate = useNavigate();

  const userInfoString = fetchUser();

  const user = JSON.parse(userInfoString);

  // console.log('User:', user.sub);
  // console.log('PostedBy ID: ', postedBy?._id);
  const [alreadySaved, setAlreadySaved] = useState(false);
  const [saveCount, setSaveCount] = useState(save?.length || 0);


  useEffect(() => {
    const isSaved = !!(save?.filter((item) => item.postedBy?._id === user.sub));
    setAlreadySaved(isSaved);
    setSaveCount(save?.length || 0);
  }, [save]);

  const savePin = (postId) => {
    if (!alreadySaved) {

      sanityClient
        .patch(postId)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [{
          _key: uuidv4(),
          userId: user.sub,
          postedBy: {
            _type: "postedBy",
            _ref: sanityClient.sub
          }
        }])
        .commit()
        .then(() => {
          setAlreadySaved(true);
          setSaveCount((prevCount) => prevCount + 1);
          // window.location.reload();
        })
    }
  };

  const deletePin = (id) => {
    sanityClient
      .delete(id)
      .then(() => {
        window.location.reload();
      });
  };

  return (
    <div className="m-2 transition-all duration-1000 animate-zoom-in">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-in-out"
      >
        {image && (
          <img src={urlFor(image).width(250).url()} alt="user-post" className="rounded-lg w-full" />)}
        {postHovered && (
          <div className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-[999]">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none ml-1"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-2 text-base rounded-full hover:shadow-md outline-none">
                  {saveCount}  Saved
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-2 text-base rounded-full hover:shadow-md outline-none">
                  Save
                </button>
              )}
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
              {destination?.slice(8).length > 0 ? (
                <a
                  href={destination}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 text-black bg-white font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-lg ml-1">
                  <BsFillArrowUpRightCircleFill />
                  {destination?.slice(8, 17)}...
                </a>
              ) : undefined}
              {postedBy?._id === user.sub && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                  className="bg-white p-2 rounded-full w-9 h-9 flex items-center justify-center text-black opacity-75 hover:opacity-100 outline-none">
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )
        }
      </div >
      <Link to={`/user-profile/${postedBy?._id}`} className="flex gap-2 mt-2 items-center hover:shadow-lg opacity-75 hover:opacity-100 rounded-full transition-all duration-300 ease-linear hover:scale-105">
        <img src={postedBy?.image} alt="user-profile" className="w-8 h-8 rounded-full object-cover" />
        <h1 className="text-base font-normal text-black">{postedBy?.userName}</h1>
        <CiLocationArrow1 />
      </Link>
    </div >
  );
};

export default Pin;