import axios from "axios";
import React, { useContext, useState } from "react";

import { useTheme } from "../hooks";
import { editUser } from "../lib/api";
import { getPayload } from "../lib/auth";
import { UserDetailsContext } from "../App";

const cloudinaryUploadUrl = process.env.REACT_APP_CLOUDINARY_URL;
const cloudinaryUploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

export default function EditProfileImage() {
  const [isDarkMode] = useTheme();
  const userId = getPayload().sub;
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);

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
            email: userDetails.email,
          });
          setUserDetails({ ...userDetails, profileImage: res.data.url });
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

  return (
    <div>
      {!isUploading ? (
        <>
          {userDetails.profileImage && (
            <div className='width-[200px] my-3'>
              <img
                src={userDetails.profileImage}
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
        <div className={` w-60 h-33.5 rounded-md pt-3`}>
          <div className='flex animate-pulse flex flex-col items-start h-full justify-center'>
            <div
              className={`${
                isDarkMode ? "bg-system-grey6" : "bg-system-grey3"
              } w-25 h-25 rounded-full `}
            ></div>
            <div className='flex flex-col '>
              <div
                className={`${
                  isDarkMode ? "bg-system-grey6" : "bg-system-grey3"
                } w-36 h-6 rounded-md mt-1`}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
