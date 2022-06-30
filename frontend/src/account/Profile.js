import React, { useState } from "react";

import { useTheme } from "../hooks";
import EditProfileImage from "./EditImage";
import EditProfileEmail from "./EditEmail";
import { Popup } from "../components/popup";
import { LogoutModal } from "../components/modal";
import { AccountSection, Card } from "../components/container";
import { SecondaryButton } from "../components/elements/button";

export default function ProfileSettings() {
  const [isDarkMode] = useTheme();
  const [popup, setPopup] = useState(false);
  const [popupText, setPopupText] = useState("");
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingProfileImage, setIsEditingProfileImage] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleClose = () => {
    setLogoutModalOpen(false);
  };

  const handleEditEmailClick = () => {
    setIsEditingEmail(!isEditingEmail);
  };

  const handleEditProfileImageClick = () => {
    setIsEditingProfileImage(!isEditingProfileImage);
  };

  return (
    <AccountSection title='Profile'>
      <Card isFirst={true} className='relative'>
        <div className='sm:pr-10'>
          <p
            className={`${
              isDarkMode ? "text-primary-white" : "text-primary-black"
            }`}
          >
            Email
          </p>
          <p className='text-sm'>Change the email linked with your account.</p>
          {isEditingEmail && (
            <EditProfileEmail
              setPopup={setPopup}
              setPopupText={setPopupText}
              setIsEditingEmail={setIsEditingEmail}
            />
          )}
        </div>
        <SecondaryButton
          className='absolute top-8 right-4'
          onClick={handleEditEmailClick}
          type='action'
        >
          {isEditingEmail ? "Close" : "Edit"}
        </SecondaryButton>
      </Card>
      <div className={`${isDarkMode ? "bg-system-grey7 h-px" : ""} `} />
      <Card isFirst={true} className='relative'>
        <div className='sm:pr-10'>
          <p
            className={`${
              isDarkMode ? "text-primary-white" : "text-primary-black"
            }`}
          >
            Profile Image
          </p>
          <p className='text-sm'>
            Change the profile image linked with your account.
          </p>
          {isEditingProfileImage && (
            <EditProfileImage />
            // <div class='max-w-xl'>
            //   <label class='flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none'>
            //     <span class='flex items-center space-x-2'>
            //       <svg
            //         xmlns='http://www.w3.org/2000/svg'
            //         class='w-6 h-6 text-gray-600'
            //         fill='none'
            //         viewBox='0 0 24 24'
            //         stroke='currentColor'
            //         stroke-width='2'
            //       >
            //         <path
            //           stroke-linecap='round'
            //           stroke-linejoin='round'
            //           d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
            //         />
            //       </svg>
            //       <span class='font-medium text-gray-600'>Drop image here</span>
            //     </span>
            //     <input type='file' name='file_upload' class='hidden' />
            //   </label>
            // </div>
          )}
        </div>
        <SecondaryButton
          className='absolute top-8 right-4'
          onClick={handleEditProfileImageClick}
          type='action'
        >
          {isEditingProfileImage ? "Close" : "Edit"}
        </SecondaryButton>
      </Card>
      <div className={`${isDarkMode ? "bg-system-grey7 h-px" : ""} `} />
      <Card isLast={true}>
        <div className='pr-10'>
          <p
            className={`${
              isDarkMode ? "text-primary-white" : "text-primary-black"
            }`}
          >
            Logout
          </p>
          <p className='text-sm'>
            You will still be able to access bus routes when you logout.
          </p>
        </div>
        <SecondaryButton onClick={() => setLogoutModalOpen(true)} type='action'>
          Logout
        </SecondaryButton>
      </Card>
      <LogoutModal
        open={logoutModalOpen}
        handleClose={handleClose}
        setOpen={setLogoutModalOpen}
      />
      <Popup popup={popup} text={popupText} />
    </AccountSection>
  );
}
