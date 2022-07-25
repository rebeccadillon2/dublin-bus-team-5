import { Link, useNavigate } from "react-router-dom";
import React, { Fragment, useContext } from "react";
import { Menu, Transition } from "@headlessui/react";

import { useAuthenticate, useTheme } from "../../hooks";
import { UserDetailsContext } from "../../App";

export function DropDown() {
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
  const navigate = useNavigate();
  const [isAuthenticated, toggleAuthenticated] = useAuthenticate();

  const handleSignout = async () => {
    const inner = async () => {
      await window.localStorage.removeItem("token");
      // eslint-disable-next-line no-restricted-globals
      // location.reload();
      toggleAuthenticated(false);

      navigate("/");
    };
    try {
      inner();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Menu as='div' className='ml-3 relative z-10'>
      <div>
        <Menu.Button className='flex text-sm rounded-full '>
          <span className='sr-only'>Open user menu</span>
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
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items
          className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${themeBgClasses}`}
        >
          <Link
            to='/events'
            className={`block px-4 py-2 text-sm ${themeMenuClasses} transition ease-in-out duration-300	`}
          >
            <Menu.Item>
              <>Events</>
            </Menu.Item>
          </Link>
          <Link
            to='/account'
            className={`block px-4 py-2 text-sm ${themeMenuClasses} transition ease-in-out duration-300	`}
          >
            <Menu.Item>
              <>Account</>
            </Menu.Item>
          </Link>

          <Link
            to='/wordle'
            className={`block px-4 py-2 text-sm ${themeMenuClasses} transition ease-in-out duration-300	`}
          >
            <Menu.Item>
              <>Dublin Street Wordle</>
            </Menu.Item>
          </Link>
          {/* <div
            href='#'
            onClick={handleSignout}
            className={`block px-4 py-2 text-sm ${themeMenuClasses} transition ease-in-out duration-300	cursor-pointer`}
          >
            <Menu.Item>
              <>Logout</>
            </Menu.Item>
          </div> */}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
