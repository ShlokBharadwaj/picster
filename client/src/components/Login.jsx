import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

import logo from '../assets/picster-logos_white.png';

import { client } from '../client';

const Login = () => {

  const navigate = useNavigate();

  // Handle Google response
  const responseGoogle = (response) => {
    if (response.error === 'idpiframe_initialization_failed') {
      console.error('Google Sign-In initialization failed:', response.details);
      // Handle initialization failure
    } else if (response.error === 'popup_closed_by_user') {
      console.error('Google Sign-In popup closed by the user.');
      // Handle popup closed by user
    } else {
      console.log('Google Sign-In success:', response);
      // Handle successful sign-in
    }
  };

  // Handle dynamic image load every 5 sec interval
  const [imageSrc, setImageSrc] = useState(''); // Initial empty src
  const query = 'cool,aesthetic,wallpaper'; // Unsplash query parameters

  // Function to fetch a new image from Unsplash
  const fetchNewImage = () => {
    const newImageUrl = `https://source.unsplash.com/random/?${query}&${Date.now()}`;
    setImageSrc(newImageUrl);
  };

  // Fetch a new image every 5 seconds (5000 milliseconds)
  useEffect(() => {

    fetchNewImage(); // Fetch an initial image

    const intervalId = setInterval(fetchNewImage, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className='flex justify-start items-center flex-col h-screen'>
        <div className='relative w-full h-full'>
          <img
            className='w-full h-full object-cover animate-slide-in'
            src={imageSrc}
            alt='https://source.unsplash.com/'
          />
          <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
            <div className='p-5'>
              <img src={logo} alt="" width='150px' />
            </div>
            <div className='shadow-2xl'>
              <GoogleLogin
                onSuccess={responseGoogle}
                onError={responseGoogle}
              />
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  )
}

export default Login;