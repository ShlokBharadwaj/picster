import React from 'react';
import { Circles } from 'react-loader-spinner';

const Spinner = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <Circles
        color="#00BFFF"
        height={50}
        width={200}
        className="m-5"
      />
      <p className="text-2xl mt-4">{message}</p>
    </div>
  )
}

export default Spinner;