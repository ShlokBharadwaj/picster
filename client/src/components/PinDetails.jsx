import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';


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
    <div className="flex flex-col xl:flex-row m-auto bg-white max-w-[1500px] border-r-[32px] ">
      <div className="flex justify-center items-center md:items-start flex-initial">
        <img
          src={pinDetails?.image && urlFor(pinDetails.image).url()}
          alt={"user-pin"}
          className="w-1/3 h-1/3 object-cover rounded-3xl"
        />
      </div>
      <div className="w-full p-5 flex-1 xl:min-w-620">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <a
              href={`${pinDetails.image?.asset?.url}?dl=`}
              download
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none ml-1"
            >
              <MdDownloadForOffline />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PinDetails;