import { Link } from "react-router-dom";
import React, { useContext } from "react";

import { UserDetailsContext } from "../../App";
import { useProfileDropDown, useTheme } from "../../hooks";

export function DropDown() {
  const [isProfileDropDown, handleProfileDropdownToggle] = useProfileDropDown();
  const { userDetails } = useContext(UserDetailsContext);
  const [isDarkMode] = useTheme();

  const themeBgClasses = `${
    isDarkMode ? "bg-system-grey7" : "bg-system-grey2"
  }`;
  const themeMenuClasses = `${
    isDarkMode
      ? "text-system-grey3 hover:text-system-grey1"
      : "text-system-grey5 hover:text-system-grey7"
  }`;

  const handleImageClick = (e) => {
    handleProfileDropdownToggle();
    e.stopPropagation();
  };

  const handleDropdownClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className='ml-3 relative'>
      <div onClick={(e) => handleImageClick(e)}>
        <div className='flex text-sm rounded-full '>
          <span className='sr-only'>Open user menu</span>
          <img
            width={32}
            height={32}
            alt={"profile"}
            className='rounded-full'
            src={userDetails.profileImage}
            style={{ height: "32px", width: "32px" }}
          />
        </div>
      </div>

      {isProfileDropDown && (
        <div
          onClick={(e) => handleDropdownClick(e)}
          className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${themeBgClasses} z-10`}
        >
          <div>
            <Link
              to='/'
              className={`block px-4 py-2 text-sm ${themeMenuClasses} transition ease-in-out duration-300	`}
            >
              Spotify
            </Link>
          </div>
          <div>
            <Link
              to='/account'
              className={`block px-4 py-2 text-sm ${themeMenuClasses} transition ease-in-out duration-300	`}
            >
              Account
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
