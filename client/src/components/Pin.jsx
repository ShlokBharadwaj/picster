import React, { useState } from 'react';
import { urlFor, sanityClient } from "../client";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

const Pin = ({ pin: { postedBy, image, _id, destination } }) => {

  const [postHovered, setPostHovered] = useState(false);
  const navigate = useNavigate();
  const [savingPost, setSavingPost] = useState(false);

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
              <div className="flex items-center justify-center hover:opacity-75 mb-12">
                <Link to={`/pin-detail/${_id}`} className="text-white text-lg font-bold mr-2 cursor-pointer">View</Link>
                <BsFillArrowUpRightCircleFill className="text-white text-2xl cursor-pointer" />
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
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Pin;