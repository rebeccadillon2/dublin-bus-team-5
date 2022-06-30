import React, { useState } from "react";

import { useTheme } from "../hooks";
import EditProfileInfo from "./Edit";
import { Popup } from "../components/popup";
import { LogoutModal } from "../components/modal";
import { AccountSection, Card } from "../components/container";
import { SecondaryButton } from "../components/elements/button";

export default function ProfileSettings() {
  const [isDarkMode] = useTheme();
  const [popup, setPopup] = useState(false);
  const [popupText, setPopupText] = useState("");
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleClose = () => {
    setLogoutModalOpen(false);
  };

  const handleEditEmailClick = () => {
    setIsEditingEmail(!isEditingEmail);
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
            Edit
          </p>
          <p className='text-sm'>Change the email linked with your account.</p>
          {isEditingEmail && (
            <EditProfileInfo
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
      <div
        className={`${
          isDarkMode ? "bg-system-grey7" : "bg-primary-white"
        } h-px`}
      />
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
