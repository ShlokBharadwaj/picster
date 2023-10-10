import React, { useState, useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

import logo from '../assets/picster-logos_white.png';

import { client } from '../client';

const Login = () => {

  const navigate = useNavigate();

  // Handle Google response
  const responseGoogle = (response) => {
    if (response && response.profileObj) {
      localStorage.setItem('user', JSON.stringify(response.profileObj));
      const { name, googleId, imageUrl } = response.profileObj;
      const doc = {
        _id: googleId,
        _type: 'user',
        userName: name,
        image: imageUrl,
      };

      client.createIfNotExists(doc).then(() => {
        navigate('/', { replace: true });
      });
    } else {
      // Handle the case where the response is not as expected
      console.error('Invalid Google response:', response);
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
  // TODO: Make the interval to 5 seconds
  useEffect(() => {
    const intervalId = setInterval(fetchNewImage, 500000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Add custom CSS for the fade-in transition effect
  const imageStyle = {
    animation: `${imageSrc ? 'fadeIn' : 'fadeOut'} 1s ease-in-out forwards`,
    backgroundColor: '#a9def9',
  };

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <img
          className='w-full h-full object-cover'
          src={imageSrc}
          // alt='https://source.unsplash.com/'
          style={imageStyle}
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