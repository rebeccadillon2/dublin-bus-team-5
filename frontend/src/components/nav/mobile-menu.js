import { Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import React, { useEffect, useState } from "react";

import { useTheme } from "../../hooks";
import { WeatherDisplay } from "./weather";
import { isUserAuthenticated } from "../../lib/auth";

export function MobileMenu() {
  const [isDarkMode] = useTheme();
  const [auth, setAuth] = useState(false);

  const themeClasses = `${
    isDarkMode
      ? "bg-primary-black text-system-grey3 hover:text-system-grey1 hover:bg-system-grey7"
      : "bg-system-grey2 text-system-grey5 hover:text-system-grey7 hover:bg-system-grey3"
  }`;

  useEffect(() => {
    setAuth(isUserAuthenticated());
  }, []);

  const handleLogout = () => {
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
    <Disclosure.Panel className='md:hidden transition-all ease-in-out duration-300'>
      <div className='px-2 pt-2 pb-3 space-y-1'>
        <Disclosure.Button
          as='a'
          href='#'
          className={`${themeClasses} flex mb-0.5 justify-between px-3 py-2 rounded-md transition ease-in-out duration-300	cursor-auto`}
        >
          <>Weather</>
          <WeatherDisplay variant='small' />
        </Disclosure.Button>
        <Link to='/'>
          <Disclosure.Button
            className={`${themeClasses} block mb-0.5 px-3 py-2 rounded-md transition ease-in-out duration-300	flex w-full`}
          >
            Journey Planner
          </Disclosure.Button>
        </Link>
        <Link to='#'>
          <Disclosure.Button
            className={`${themeClasses} block mb-0.5 px-3 py-2 rounded-md transition ease-in-out duration-300	flex w-full`}
          >
            Stops
          </Disclosure.Button>
        </Link>
        <Link to='#'>
          <Disclosure.Button
            className={`${themeClasses} block mb-0.5 px-3 py-2 rounded-md transition ease-in-out duration-300	flex w-full`}
          >
            Routes
          </Disclosure.Button>
        </Link>
        <Link to='#'>
          <Disclosure.Button
            className={`${themeClasses} block mb-0.5 px-3 py-2 rounded-md transition ease-in-out duration-300	flex w-full`}
          >
            Fare Calculator
          </Disclosure.Button>
        </Link>
        {auth ? (
          <>
            <Link to='#'>
              <Disclosure.Button
                className={`${themeClasses} block mb-0.5 px-3 py-2 rounded-md transition ease-in-out duration-300	flex w-full`}
              >
                Spotify
              </Disclosure.Button>
            </Link>
            <Link to='/account'>
              <Disclosure.Button
                className={`${themeClasses} block mb-0.5 px-3 py-2 rounded-md transition ease-in-out duration-300 flex w-full`}
              >
                Account
              </Disclosure.Button>
            </Link>
            <Disclosure.Button
              onClick={handleLogout}
              className={`${themeClasses} block mb-0.5 px-3 py-2 rounded-md transition ease-in-out duration-300 flex w-full`}
            >
              Logout
            </Disclosure.Button>
          </>
        ) : (
          <>
            <Link to='/signup'>
              <Disclosure.Button
                className={`${themeClasses} block mb-0.5 px-3 py-2 rounded-md transition ease-in-out duration-300	flex w-full`}
              >
                Signup
              </Disclosure.Button>
            </Link>
            <Link to='/login'>
              <Disclosure.Button
                className={`${themeClasses} block mb-0.5 px-3 py-2 rounded-md transition ease-in-out duration-300 flex w-full`}
              >
                Login
              </Disclosure.Button>
            </Link>
          </>
        )}
      </div>
    </Disclosure.Panel>
  );
}
