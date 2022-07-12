import React, { useEffect, useState } from "react";

import { Popup } from "../popup";
import { useTheme } from "../../hooks";
import { LogoutModal } from "../modal";
import { AccountSection, Card } from "../container";
import { SecondaryButton } from "../elements/button";
import { EditProfileImage, EditProfileEmail } from ".";
//update file name
export function ProfileSettings() {
  const [isDarkMode] = useTheme();
  const [popup, setPopup] = useState(false);
  const [popupText, setPopupText] = useState("");
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isEditingProfileImage, setIsEditingProfileImage] = useState(false);

  const handleClose = () => {
    setLogoutModalOpen(false);
  };

  const handleEditEmailClick = () => {
    setIsEditingEmail(!isEditingEmail);
  };

  const handleEditProfileImageClick = () => {
    setIsEditingProfileImage(!isEditingProfileImage);
  };

  useEffect(() => {
    return () => {
      setPopup(false);
    };
  }, []);

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
          <EditProfileEmail
            setPopup={setPopup}
            setPopupText={setPopupText}
            setIsEditingEmail={setIsEditingEmail}
          />
        </div>
        <SecondaryButton
          type='action'
          aria-expanded='false'
          data-bs-toggle='collapse'
          onClick={handleEditEmailClick}
          aria-controls='collapseEditEmail'
          className='absolute top-8 right-4'
          data-bs-target='#collapseEditEmail'
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
          <EditProfileImage
            setPopup={setPopup}
            setPopupText={setPopupText}
            setIsEditingProfileImage={setIsEditingProfileImage}
          />
        </div>
        <SecondaryButton
          type='action'
          aria-expanded='false'
          data-bs-toggle='collapse'
          aria-controls='collapseEditImage'
          className='absolute top-8 right-4'
          data-bs-target='#collapseEditImage'
          onClick={handleEditProfileImageClick}
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
