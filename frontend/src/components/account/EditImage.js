import axios from "axios";
import React, { useContext, useState } from "react";

import { editUser } from "../../lib/api";
import { ImageSkeleton } from "../skeleton";
import { getPayload } from "../../lib/auth";
import { UserDetailsContext } from "../../App";

const cloudinaryUploadUrl = process.env.REACT_APP_CLOUDINARY_URL;
const cloudinaryUploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

export default function EditProfileImage({
  setPopup,
  setPopupText,
  setIsEditingProfileImage,
}) {
  const userId = getPayload().sub;
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);

  const handleUpload = async (e) => {
    setIsUploading(true);
    setError(null);

    console.log(e);
    if (
      !e.target ||
      !e.target.files ||
      !e.target.files[0] ||
      !e.target.files[0].type
    ) {
      setIsUploading(false);
      return;
    }

    const type = e.target.files[0].type;
    if (type !== "image/png" && type !== "image/jpeg" && type !== "image/jpg") {
      setIsUploading(false);
      setError("Only PNG and JPEG images are allowed");
      return;
    }

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
          setPopupText("Successfully updated profile image");
          setPopup(true);
          setTimeout(() => {
            setPopup(true);
          }, 2000);
          setIsEditingProfileImage(false);
        } catch (e) {
          setIsUploading(false);
          console.log(e);
          return;
        }
      });
    } catch (err) {
      setIsUploading(false);
      console.log(err);
      return;
    }
  };

  return (
    <>
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
              <div className='flex items-center mt-4 h-4'>
                {error && <p className='text-primary-red text-xs'>{error}</p>}
              </div>
            </div>
          </>
        ) : (
          <ImageSkeleton />
        )}
      </div>
    </>
  );
}
