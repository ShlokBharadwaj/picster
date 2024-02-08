import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';

import { sanityClient } from "../client";
import Spinner from './Spinner';
import { categories } from "../utils/data";

const CreatePin = ({ user }) => {

  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(null);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();

  const stringifiedUser = JSON.stringify(user);
  const parsedUser = JSON.parse(stringifiedUser);

  // console.log(parsedUser.user.sub);
  // console.log(imageAsset?._id);

  const savePin = () => {
    if (title && about && destination && imageAsset?._id && category) {
      const pin = {
        _type: "pin",
        title,
        about,
        destination,
        category,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id
          }
        },
        userId: user._id,
        postedBy: {
          _type: "postedBy",
          _ref: user._id,
        },
        category,
      };

      sanityClient.create(pin)
        .then(() => {
          navigate('/')
        })
    } else {
      setFields(true);

      setTimeout(() => {
        setFields(false);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className="text-center text-red-500 mb-0 text-xl transition-all duration-100 ease-linear">
          Please fill all the fields!
        </p>
      )}
      <div className="flex lg:flex-row flex-col justify-center items-center bg-white p-3 lg:p-5 lg:w-4/5 w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {loading &&
              <Spinner message={"Loading..."} />}
            {wrongImageType && (
              <p className="text-center text-red-500 mb-0 text-xl transition-all duration-100 ease-linear">
                Please upload a valid image!
              </p>
            )}
            {!imageAsset ? (
              <label
                htmlFor="file"
                className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:scale-105 transition-all duration-300 ease-linear opacity-60 hover:opacity-100"
              >
                <AiOutlineCloudUpload size={60} />
                <span className="text-xl">Upload Image</span>
                <input
                  type="file"
                  id="file"
                  name="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const { type, name } = e.target.files[0];
                    if (type.includes('image')) {
                      setWrongImageType(false);
                      setLoading(true);

                      sanityClient.assets
                        .upload('image', e.target.files[0], { contentType: type, filename: name })
                        .then((res) => {
                          setImageAsset(res);
                          setLoading(false);
                        })
                        .catch((err) => {
                          console.error("Error uploading image", err);
                          setLoading(false);
                        });
                    } else {
                      setWrongImageType(true);
                    }
                  }}
                />
              </label>
            ) : (
              <div className="w-full h-full relative">
                <img
                  src={imageAsset.url}
                  alt="pin"
                  className="w-full h-full object-contain"
                />
                <button
                  type="button"
                  onClick={() => setImageAsset(null)}
                  className="bg-white p-2 rounded-full w-9 h-9 flex items-center justify-center text-black opacity-75 hover:opacity-100 outline-none absolute top-0 right-0 transition-all duration-500 hover:animate-zoom-in">
                  <MdDelete size={20} />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          {parsedUser && (
            <div className="flex gap-2 my-2 items-center bg-white  rounded-md w-full">
              <img
                src={parsedUser.user.picture ? parsedUser.user.picture : "https://via.placeholder.com/150"}
                alt="user-profile"
                className="w-10 h-10 rounded-full"
              />
              <p className="text-xl font-bold">{parsedUser.user.name}</p>
            </div>
          )}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-300 p-2 rounded-md w-full font-bold outline-none"
          />
          <textarea
            placeholder="About"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="border-2 border-gray-300 p-2 rounded-md w-full resize-none outline-none"
          />
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="border-2 border-gray-300 p-2 rounded-md w-full font-bold outline-none"
          />
          <div className="flex flex-col">
            <div>
              <p className="mb-2 font-semibold">Choose pin Category:</p>
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="border-2 border-gray-300 p-2 rounded-md w-full capitalize outline-none"
              >
                <option value={"other"} className="bg-white">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index}
                    value={category.value}
                    className="text-base border-none outline-none bg-white text-black">
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                type="button"
                onClick={savePin}
                className="text-black font-bold p-3 rounded-md w-full hover:shadow-lg transition-all duration-300 ease-linear mt-4 shadow-2xl outline-1">
                Create Pin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePin;