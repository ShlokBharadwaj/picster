import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { CiLocationArrow1 } from "react-icons/ci";


import { sanityClient, urlFor } from '../client.js';
import MasonryLayout from './MasonryLayout.jsx';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data.js';
import Spinner from './Spinner.jsx';

const PinDetails = ({ user }) => {

  const [pins, setPins] = useState(null);
  const [pinDetails, setPinDetails] = useState(null);
  const [comment, setComment] = useState('');
  const [commenting, setCommenting] = useState(false);
  const { pinId } = useParams();


  const addComments = () => {

    if (!user) {
      alert('Please login to comment');
      return;
    };

    if (comment) {
      setCommenting(true);

      sanityClient
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [
          {
            comment,
            _key: uuidv4(),
            postedBy: {
              _type: 'postedBy',
              _ref: user.sub,
            }
          }])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment('');
          setCommenting(false);
        })
    }
  };

  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId);

    if (query) {
      sanityClient
        .fetch(query)
        .then((data) => {
          setPinDetails(data[0]);

          if (data[0]) {
            query = pinDetailMorePinQuery(data[0]);

            sanityClient
              .fetch(query)
              .then((data) => {
                setPins(data);
              })
          }
        })
    }
  };

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  if (!pinDetails) {
    return (
      <Spinner message={'Loading your pin...'} />
    );
  };

  // console.log('Pin Details:', pinDetails);
  // console.log('Pins:', pins);
  // console.log('User:', user);

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5 transition-all duration-200 animate-fade-in bg-white">
        <div className="flex lg:flex-row flex-col justify-center items-center bg-transparent p-3 lg:p-5 lg:w-4/5 w-full shadow-2xl">
          <div className="p-3 flex flex-0.7 w-full shadow-2xl rounded-md bg-gray-50">
            <div className="flex justify-center items-center flex-col p-0 w-full h-420">
              <div className="w-full h-full relative bg-transparent">
                <img
                  src={pinDetails?.image && urlFor(pinDetails.image).url()}
                  alt="pin-image"
                  className="w-full h-full object-contain rounded-md"
                />
                <a
                  href={`${pinDetails?.image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-slate-300 p-2 rounded-full w-9 h-9 flex items-center justify-center text-black opacity-60 hover:opacity-100 outline-none absolute top-2 right-2 transition-all duration-500 hover:animate-zoom-in"
                >
                  <MdDownloadForOffline className="w-9 h-9" />
                </a>
                <a href={pinDetails.destination} target="_blank" rel="noreferrer" className="bg-slate-300 p-2 rounded-full flex items-center justify-center text-black opacity-60 hover:opacity-100 outline-none absolute top-2 left-2 transition-all duration-500 hover:animate-zoom-in">
                  {pinDetails.destination.length > 16 ? `${pinDetails.destination.slice(0, 16)}...` : pinDetails.destination}
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">

            <h1 className="text-4xl font-bold break-words">
              {pinDetails?.title}
            </h1>
            <p className="text-base font-light break-words -mt-4">
              {pinDetails?.about}
            </p>
            <Link to={`/user-profile/${pinDetails.postedBy?._id}`} className="flex gap-2 mt-0 items-center rounded-full transition-all duration-300 ease-linear max-w-fit hover:shadow-2xl">
              <img src={pinDetails.postedBy?.image} alt="user-profile" className="w-10 h-10 rounded-full object-cover" />
              <h1 className="text-base font-semibold text-black">{pinDetails.postedBy?.userName}</h1>
            </Link>
            <div className="max-h-370 overflow-y-auto rounded-md">
              <h2 className="mt-0 mb-2 text-xl font-normal">Comments</h2>
              {pinDetails?.comments?.map((comment, index) => (
                <div key={index} className="flex gap-2 mt-0 items-center rounded-lg bg-white pb-3">
                  <img src={comment?.postedBy?.image}
                    alt="user-profile"
                    className="w-8 h-8 rounded-full object-cover cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold text-sm">{comment?.postedBy?.userName}</p>
                    <p className="text-sm font-normal">{comment.comment}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap mt-0 gap-3">
              <Link to={`/user-profile/${user?.sub}`}>
                <img src={user?.picture ? user.picture : 'https://via.placeholder.com/150'} alt="user-profile" className="w-10 h-10 rounded-full cursor-pointer" />
              </Link>
              <input type="text"
                className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-md focus:border-gray-300"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="text-black font-bold p-3 rounded-md w-full hover:shadow-lg transition-all duration-300 ease-linear mt-4 shadow-2xl outline-1"
              onClick={addComments}>
              {commenting ? 'Commenting...' : 'Comment'}
            </button>
          </div>
        </div>
      </div>
      {/* {console.log("Pins:", pins)} */}
      {
        pins?.length > 0 ? (
          <>
            <h2 className="text-center font-bold text-2xl mt-8 mb-4">
              More like this
            </h2>
            <MasonryLayout pins={pins} />
          </>
        ) : (
          <Spinner message={'Loading more pins...'} />
        )
      }
    </>
  )
}

export default PinDetails;