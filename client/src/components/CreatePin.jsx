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
                          setImageAsset(res.url);
                          // setImageAsset(res);
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
              <img
                src={imageAsset}
                alt="pin"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePin;