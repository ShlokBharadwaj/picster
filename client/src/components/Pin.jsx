import React, { useState } from 'react';
import { urlFor, sanityClient } from "../client";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { fetchUser } from "../utils/fetchUsers";

const Pin = ({ pin: { postedBy, image, _id, destination, save } }) => {

  console.log('postedBy:', postedBy);
  console.log('image:', image);
  console.log('_id:', _id);
  console.log('destination:', destination);
  console.log('save:', save);

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
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-in-out"
      >
        <img src={urlFor(image).width(250).url()} alt="user-post" className="rounded-lg w-full" />
        {postHovered && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-center hover:opacity-75 mb-12 text-white cursor-pointer">
                <Link to={`/pin-detail/${_id}`} className="text-lg font-bold mb-10 text-center">View
                  <BsFillArrowUpRightCircleFill className="text-2xl ml-2" />
                </Link>
              </div>
              <div className="flex items-center justify-center cursor-pointer">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                >
                  <MdDownloadForOffline className="text-white text-2xl hover:opacity-75" />
                </a>
              </div>
              {alreadySaved ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-2 text-base rounded-full hover:shadow-md outline-none mt-10">
                  {save?.length}  Saved
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-2 text-base rounded-full hover:shadow-md outline-none mt-10">
                  Save
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Pin;