import { Link, useNavigate } from "react-router-dom";
import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import { useTheme } from "../hooks";

export function DropDown() {
  const navigate = useNavigate();
  const [isDarkMode] = useTheme();
  const themeBgClasses = `${
    isDarkMode ? "bg-system-grey7" : "bg-system-grey2"
  }`;
  const themeMenuClasses = `${
    isDarkMode
      ? "text-system-grey3 hover:text-system-grey1"
      : "text-system-grey5 hover:text-system-grey7"
  }`;

  const handleSignout = async () => {
    const inner = async () => {
      await window.localStorage.removeItem("token");
      // eslint-disable-next-line no-restricted-globals
      location.reload();
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
            alt={"profile"}
            className='rounded-full'
            height={32}
            width={32}
            style={{ height: "32px", width: "32px" }}
            src={
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
          <Link to='#'>
            <Menu.Item>
              {({ active }) => (
                <a
                  href='/'
                  className={`${
                    active ? "" : ""
                  }block px-4 py-2 text-sm ${themeMenuClasses} transition ease-in-out duration-300	`}
                >
                  Spotify
                </a>
              )}
            </Menu.Item>
          </Link>
          <Link to='/account'>
            <Menu.Item>
              {({ active }) => (
                <a
                  href='/account'
                  className={`${
                    active ? "" : ""
                  }block px-4 py-2 text-sm ${themeMenuClasses} transition ease-in-out duration-300	`}
                >
                  Account
                </a>
              )}
            </Menu.Item>
          </Link>
          <Link to='#'>
            <Menu.Item>
              {({ active }) => (
                <a
                  href='/'
                  onClick={handleSignout}
                  className={`${
                    active ? "" : ""
                  }block px-4 py-2 text-sm ${themeMenuClasses} transition ease-in-out duration-300	`}
                >
                  Sign out
                </a>
              )}
            </Menu.Item>
          </Link>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
