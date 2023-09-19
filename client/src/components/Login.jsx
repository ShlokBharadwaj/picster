import React, { useState, useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

import logo from '../assets/picster-logos_white.png';

const Login = () => {

  // Handle Google response
  const responseGoogle = (response) => {
    console.log(response);
  }

  // Handle dynamic image load every 5 sec interval
  const [imageSrc, setImageSrc] = useState(''); // Initial empty src
  const query = 'cool,aesthetic,wallpaper'; // Unsplash query parameters

    // Function to fetch a new image from Unsplash
  const fetchNewImage = () => {
    const newImageUrl = `https://source.unsplash.com/random/?${query}&${Date.now()}`;
    console.log(newImageUrl);
    setImageSrc(newImageUrl);
  };

    // Fetch a new image every 7 seconds (7000 milliseconds)
  useEffect(() => {
    const intervalId = setInterval(fetchNewImage, 7000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <img
          className='w-full h-full object-cover transition-opacity duration-1000'
          src={imageSrc}
          alt='Random Unsplash Image'
          style={{ opacity: imageSrc ? 1 : 0 }} // Fade-in effect
        />
        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className='p-5'>
            <img src={logo} alt="" width='150px' />
          </div>
          <div className='shadow-2xl'>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_API_KEY}
              render={renderProps => (
                <button onClick={renderProps.onClick} disabled={renderProps.disabled} className='flex justify-center items-center bg-white text-black rounded-full px-5 py-3 cursor-pointer outline-none' type="button">
                  <FcGoogle className='mr-2' />
                  <span>Sign in with Google</span>
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;