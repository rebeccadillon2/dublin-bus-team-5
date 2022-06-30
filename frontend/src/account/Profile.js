import React, { useState } from "react";

import { useTheme } from "../hooks";
import EditProfileInfo from "./Edit";
import { LogoutModal } from "../components/modal";
import { AccountSection, Card } from "../components/container";
import { SecondaryButton } from "../components/elements/button";

export default function ProfileSettings() {
  const [isDarkMode] = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleClose = () => {
    setLogoutModalOpen(false);
  };

  const handleClick = () => {
    setIsEditing(true);
  };

  return (
    <AccountSection title='Profile'>
      <Card isFirst={true}>
        <div className='sm:pr-10'>
          <p
            className={`${
              isDarkMode ? "text-primary-white" : "text-primary-black"
            }`}
          >
            Edit
          </p>
          <p className='text-sm'>Change the email linked with your account.</p>
          {isEditing && <EditProfileInfo />}
        </div>
        {!isEditing && (
          <SecondaryButton onClick={handleClick} type='action'>
            Edit
          </SecondaryButton>
        )}
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
    </AccountSection>
  );
}
