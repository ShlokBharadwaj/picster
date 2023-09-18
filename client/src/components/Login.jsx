import React from 'react';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

import logo from '../assets/picster-logos_white.png';

const Login = () => {

  const responseGoogle = (response) => {
    console.log(response);
  }

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <img className='w-full h-full object-cover' src="https://source.unsplash.com/random/?cool,aeathetic,wallpaper" alt="https://source.unsplash.com" />
        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className='p-5'>
            <img src={logo} alt="" width='150px' />
          </div>
          <div className='shadow-2xl'>
            <GoogleLogin
              clientId={process.env.GOOGLE_API_KEY}
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