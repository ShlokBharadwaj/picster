import React, { useState, useEffect } from 'react';
import MasonryLayout from './MasonryLayout';
import { sanityClient } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import Spinner from './Spinner';

const Search = ({ searchTerm }) => {

    const [pins, setPins] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (searchTerm !== '') {
            setLoading(true);
            const query = searchQuery(searchTerm.toLowerCase());
            sanityClient
                .fetch(query)
                .then(data => {
                    setPins(data);
                    setLoading(false);
                })
                .catch(console.error);
        } else {
            sanityClient
                .fetch(feedQuery)
                .then(data => {
                    setPins(data);
                    setLoading(false);
                })
                .catch(console.error);
        }
    }, [searchTerm]);

    // console.log("Search Term: ", searchTerm);

    return (
        <div>
            {loading && <Spinner message={"Searching for Pins..."} />}
            {pins?.length !== 0 && <MasonryLayout pins={pins} />}
            {pins?.length === 0 && searchTerm !== '' && !loading && (
                <div className="flex justify-center items-center mt-4">
                    <p className="text-2xl font-bold text-center text-gray-500">No Pins Found</p>
                </div>
            )}
        </div>
    )
}

export default Search;