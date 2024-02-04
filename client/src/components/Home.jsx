import React, { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';

import { Navbar, Login, UserProfile } from './index';
import Pins from './Pins';
import { sanityClient } from '../client';
import logo from '../assets/picster-logos_white.png';

const Home = () => {
  return (
    <Navbar />
  )
}

export default Home