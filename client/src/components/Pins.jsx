import React, { useState } from 'react';
import { Routes, Route} from 'react-router-dom';

import {Navbar, Feed, PinDetails, CreatePin, Search} from './index';

const Pins = () => {

  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="px-2 md:px-5">Pins</div>
  )
}

export default Pins;