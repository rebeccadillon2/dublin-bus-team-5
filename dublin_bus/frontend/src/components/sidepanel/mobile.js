import { FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";

import { SidePanel } from ".";
import { getUser } from "../../lib/api";
import { MapContainerContext, UserDetailsContext } from "../../App";
import { getPayload, removeToken } from "../../lib/auth";
import { useAuthenticate, useExpanded, useTheme } from "../../hooks";

export function MobileSidePanel({ open, setOpen, handleClose }) {
  const { userDetails } = useContext(UserDetailsContext);

  const uid = getPayload().sub;
  const [isDarkMode] = useTheme();
  // const [userDetails, setUserDetails] = useState(null);
  const [isAuthenticated, toggleAuthenticated] = useAuthenticate();

  const [isExpanded, handleExpandedToggle] = useExpanded();
  const navigate = useNavigate();
  const { mapContainerType, setMapContainerType } =
    useContext(MapContainerContext);

  // useEffect(() => {
  //   const getUserData = async () => {
  //     if (!isAuthenticated) return;
  //     try {
  //       const { data } = await getUser(uid);
  //       console.log("data", data);
  //       setUserDetails(data);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   getUserData();
  // }, []);

  const handleStopsClick = () => {
    setOpen(false);
    navigate("/");
    setMapContainerType({
      ...mapContainerType,
      type: "realtime",
      place: "realtime",
    });
    if (!isExpanded) {
      handleExpandedToggle(true);
    }
  };

  const handleRoutesClick = () => {
    setOpen(false);
    navigate("/");
    setMapContainerType({
      ...mapContainerType,
      type: "routes",
      place: "routes",
    });
    if (!isExpanded) {
      handleExpandedToggle(true);
    }
  };

  const handleJourneyClick = () => {
    setOpen(false);
    navigate("/");
    setMapContainerType({
      ...mapContainerType,
      type: "default",
      place: null,
    });
    if (!isExpanded) {
      handleExpandedToggle(true);
    }
  };

  const handleWeatherClick = () => {
    setOpen(false);
    navigate("/");
    setMapContainerType({ ...mapContainerType, type: "weather" });
    if (!isExpanded) {
      handleExpandedToggle(true);
    }
  };

  const handleAccountClick = () => {
    setOpen(false);
    navigate("/account");
  };

  const handleLogout = () => {
    setOpen(false);
    removeToken();
    toggleAuthenticated(false);
    navigate("/");
  };

  return (
    <SidePanel
      open={open}
      handleClose={handleClose}
      className=''
      setIsOpen={setOpen}
    >
      <div className={` flex flex-col items-start justify-start w-[100%]`}>
        <div
          className={`${
            isDarkMode
              ? "border-system-grey6 text-system-grey4 hover:text-system-grey6"
              : "border-system-grey2 text-system-grey5 hover:text-system-grey3"
          } flex items-center justify-between w-[100%] border-b  pb-4`}
        >
          <div className='outline-none pl-6'>
            <Link to='/' className='outline-none'>
              <img
                alt='profile'
                className='block'
                height={45}
                width={45}
                style={{ height: "45px", width: "45px", outline: "none" }}
                src={
                  "https://res.cloudinary.com/dk0r9bcxy/image/upload/v1654877396/research-practicum/bl2e_qkc1u6.png"
                }
              />
            </Link>
          </div>
          <div className='mr-6' onClick={() => setOpen(false)}>
            <FiX className='w-6 h-6' />
          </div>
        </div>
        <div className='flex flex-col w-[100%]'>
          <div
            className='pt-4 pb-2 pl-6 cursor-pointer w-[100%]'
            onClick={handleJourneyClick}
          >
            Journey
          </div>
          <div
            className='py-2 pl-6 cursor-pointer w-[100%]'
            onClick={handleStopsClick}
          >
            Stops
          </div>
          <div
            className='py-2 pl-6 cursor-pointer w-[100%]'
            onClick={handleRoutesClick}
          >
            Routes
          </div>
          <div
            className='pt-2 pb-4 pl-6 cursor-pointer w-[100%]'
            onClick={handleWeatherClick}
          >
            Weather
          </div>
        </div>
        {isAuthenticated ? (
          <>
            {userDetails && (
              <div
                className={`${
                  isDarkMode ? "border-system-grey6" : "border-system-grey2"
                } border-y flex items-center justify-between w-[100%]`}
              >
                <div className={`flex flex-col   w-[100%]`}>
                  <div className='pt-4 pb-1 pl-6 text-sm'>Signed in as</div>
                  <div className='pt-1 pb-4 pl-6'>{userDetails.email}</div>
                </div>
                <div className='flex items-center justify-end w-[100%] pr-6'>
                  <img
                    width={32}
                    height={32}
                    alt='profile'
                    className='rounded-full h-8 w-8'
                    src={
                      userDetails.profileImage ||
                      "https://res.cloudinary.com/dk0r9bcxy/image/upload/v1633014391/project-image-upload-test/pqqrv32aicedep9a5usi.jpg"
                    }
                  />
                </div>
              </div>
            )}
            <div className='flex flex-col w-[100%]'>
              <div
                onClick={handleAccountClick}
                className='pt-4 pb-2 pl-6 cursor-pointer w-[100%]'
              >
                Account
              </div>
              <div
                onClick={handleLogout}
                className='pt-2 pb-4 pl-6 cursor-pointer w-[100%]'
              >
                Logout
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className={`${
                isDarkMode ? "border-system-grey6" : "border-system-grey2"
              } flex flex-col border-t w-[100%]`}
            >
              <div
                onClick={() => navigate("/login")}
                className='pt-4 pb-2 pl-6 cursor-pointer w-[100%]'
              >
                Login
              </div>
              <div
                onClick={() => navigate("/signup")}
                className='pt-2 pb-4 pl-6 cursor-pointer w-[100%]'
              >
                Sign up
              </div>
            </div>
          </>
        )}
      </div>
    </SidePanel>
  );
}
