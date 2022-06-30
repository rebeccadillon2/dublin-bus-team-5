import axios from "axios";
import React, { useEffect, useState } from "react";

import { getPayload } from "../lib/auth";
import { editUser, getUser } from "../lib/api";

const cloudinaryUploadUrl = process.env.REACT_APP_CLOUDINARY_URL;
const cloudinaryUploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

export default function EditProfileImage() {
  const userId = getPayload().sub;
  const [error, setError] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e) => {
    setIsUploading(true);
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", cloudinaryUploadPreset);
    try {
      await axios.post(cloudinaryUploadUrl, data).then((res) => {
        try {
          editUser(userId, {
            profileImage: res.data.url,
            email: userEmail,
          });
          setUserImage(res.data.url);
          setIsUploading(false);
        } catch (e) {
          setIsUploading(false);
          console.log(e);
        }
      });
    } catch (err) {
      setIsUploading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    const userId = getPayload().sub;
    const getUserData = async (userId) => {
      try {
        const { data } = await getUser(userId);
        console.log("data", data);
        setUserImage(data.profileImage);
        setUserEmail(data.email);
      } catch (err) {
        console.log("err", err);
        setError("Network error");
      }
    };
    getUserData(userId);
  }, []);

  return (
    <div>
      {!isUploading ? (
        <>
          {userImage && (
            <div className='width-[200px] my-3'>
              <img
                src={userImage}
                alt='selected'
                className='w-[100px] h-[100px] rounded-full'
              />
            </div>
          )}
          <div className='mt-4'>
            <input
              type='file'
              id='files'
              className='hidden'
              name={"profileImage"}
              onChange={(e) => handleUpload(e)}
            />
            <label
              className='upload-btn bg-primary-blue py-1.5 px-3 rounded-xl text-white'
              htmlFor='files'
            >
              Upload Image
            </label>
          </div>
        </>
      ) : (
        <div className=' w-60 h-33.5 rounded-md pt-3'>
          <div className='flex animate-pulse flex flex-col items-start h-full justify-center'>
            <div className='w-25 bg-gray-300 h-25 rounded-full '></div>
            <div className='flex flex-col '>
              <div className='w-36 bg-gray-300 h-6 rounded-md mt-1 '></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
