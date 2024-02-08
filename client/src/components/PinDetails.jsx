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
    <div>PinDetails</div>
  )
}

export default PinDetails;