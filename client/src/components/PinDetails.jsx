import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';


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

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5 transition-all duration-200 animate-fade-in">

      <p className="text-center text-red-500 mb-0 text-xl transition-all duration-100 ease-linear">
        Please fill all the fields!
      </p>

      <div className="flex lg:flex-row flex-col justify-center items-center bg-white p-3 lg:p-5 lg:w-4/5 w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">

            <p className="text-center text-red-500 mb-0 text-xl transition-all duration-100 ease-linear">
              Please upload a valid image!

            </p>

            <label
              htmlFor="file"
              className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:scale-105 transition-all duration-300 ease-linear opacity-60 hover:opacity-100"
            >
              <AiOutlineCloudUpload size={60} />
              <span className="text-xl">Upload Image</span>
              <input
                type="file"
                id="file"
                name="file"
                accept="image/*"
                className="hidden"
              />
            </label>

            <div className="w-full h-full relative">
              <img
                alt="pin"
                className="w-full h-full object-contain"
              />
              <button
                type="button"
                className="bg-white p-2 rounded-full w-9 h-9 flex items-center justify-center text-black opacity-75 hover:opacity-100 outline-none absolute top-0 right-0 transition-all duration-500 hover:animate-zoom-in">
                <MdDelete size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">

          <div className="flex gap-2 my-2 items-center bg-white  rounded-md w-full">
            <img
              src={"https://via.placeholder.com/150"}
              alt="user-profile"
              className="w-10 h-10 rounded-full"
            />
            <p className="text-xl font-bold">Shlok Bharadwaj</p>
          </div>

          <input
            type="text"
            placeholder="Title"
            value={"title"}
            className="border-2 border-gray-300 p-2 rounded-md w-full font-bold outline-none"
          />
          <textarea
            placeholder="About"
            value={"about"}
            className="border-2 border-gray-300 p-2 rounded-md w-full resize-none outline-none"
          />
          <input
            type="text"
            placeholder="Destination"
            value={"destination"}
            className="border-2 border-gray-300 p-2 rounded-md w-full font-bold outline-none"
          />
          <div className="flex flex-col">
            <div>
              <p className="mb-2 font-semibold">Choose pin Category:</p>
              <select
                value={"category"}
                className="border-2 border-gray-300 p-2 rounded-md w-full capitalize outline-none"
              >
                <option value={"other"} className="bg-white">Select Category</option>
                
              </select>
            </div>
            <div>
              <button
                type="button"
                className="text-black font-bold p-3 rounded-md w-full hover:shadow-lg transition-all duration-300 ease-linear mt-4 shadow-2xl outline-1">
                Create Pin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PinDetails;