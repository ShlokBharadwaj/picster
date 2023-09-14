import React from 'react';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

import logo from '../assets/picster-logos_white.png';

const Login = () => {
  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <img className='w-full h-full object-cover' src="https://source.unsplash.com/random/?cool,aeathetic,wallpaper" alt="https://source.unsplash.com" />
        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        </div>
      </div>
    </div>
  )
}

export default Login;