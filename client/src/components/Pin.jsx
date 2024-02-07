import React, { useState } from 'react';
import { urlFor, sanityClient } from "../client";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { fetchUser } from "../utils/fetchUsers";

const Pin = ({ pin: { postedBy, image, _id, destination, save } }) => {

  const [postHovered, setPostHovered] = useState(false);
  const navigate = useNavigate();

  const userInfoString = fetchUser();

  const alreadySaved = !!(save?.filter((item) => item.postedBy?._id === userInfoString.sub));

  const savePin = async (postId) => {
    if (!alreadySaved) {

      sanityClient
        .patch(postId)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [{
          _key: uuidv4(),
          userId: userInfoString.sub,
          postedBy: {
            _type: "postedBy",
            _ref: sanityClient.sub
          }
        }])
        .commit()
        .then(() => {
          window.location.reload();
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
    <>
      <div className="m-2">
        <div
          onMouseEnter={() => setPostHovered(true)}
          onMouseLeave={() => setPostHovered(false)}
          onClick={() => navigate(`/pin-detail/${_id}`)}
          className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-in-out"
        >
          <img src={urlFor(image).width(250).url()} alt="user-post" className="rounded-lg w-full" />
          {postHovered && (
            <div className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-[999]">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
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
                  {save?.length}  Saved
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
          )}
        </div>
        <div className="flex justify-between items-center gap-2 w-full">
          {destination?.slice(8).length > 0 ? (
            <a
              href={destination}
              target="_blank"
              rel="noreferrer"
              className="text-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md">
              <BsFillArrowUpRightCircleFill />
              {destination?.slice(8,17)}...
            </a>
          ) : undefined}  
          {postedBy?._id === userInfoString.sub && (
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
      <Link to={`/user-profile/${postedBy?._id}`} className="flex gap-2 mt-2 items-center">
        <img src={postedBy?.picture} alt="user-profile" className="w-10 h-10 rounded-full object-cover" />
        <h1 className="text-lg font-bold">{postedBy?.name}</h1>
      </Link>
    </>
  );
};

export default Pin;