import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { sanityClient } from '../client.js';
import MasonryLayout from './MasonryLayout.jsx';
import Spinner from './Spinner.jsx';
import { feedQuery, searchQuery } from "../utils/data.js";

const Feed = () => {

  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();
  const [pins, setPins] = useState(null);

  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);

      sanityClient.fetch(query)
        .then((data) => {
          setPins(data);
          setLoading(false);
        })
    } else {
      sanityClient.fetch(feedQuery)
        .then((data) => {
          setPins(data);
          setLoading(false);
        })
    }
  }, [categoryId]);

  if (loading) {
    return <Spinner message="We are loading new images to your feed!" />;
  }

  return (
    <div>Feed</div>
  )
}

export default Feed