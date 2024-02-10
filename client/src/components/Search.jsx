import React, { useState, useEffect } from 'react';
import MasonryLayout from './MasonryLayout';
import { sanityClient } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import Spinner from './Spinner';

const Search = ({ searchTerm }) => {

    console.log("Search Term: ", searchTerm);

    return (
        <div>Search</div>
    )
}

export default Search;