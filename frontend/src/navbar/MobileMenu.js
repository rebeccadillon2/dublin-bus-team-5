import { Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import React, { useEffect, useState } from "react";

import { WeatherDisplay } from ".";
import { isUserAuthenticated } from "../lib/auth";
import { useAuthenticate, useTheme } from "../hooks";

export function MobileMenu() {
  const [auth, setAuth] = useState(false);
  const [isAuthenticated] = useAuthenticate();
  const [isDarkMode] = useTheme();
  const themeClasses = `${
    isDarkMode
      ? "bg-primary-black text-system-grey3 hover:text-system-grey1 hover:bg-system-grey7"
      : "bg-system-grey2 text-system-grey5 hover:text-system-grey7 hover:bg-system-grey3"
  }`;

  useEffect(() => {
    setAuth(isUserAuthenticated());
  }, []);

  const handleSignout = () => {
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
          className={`${themeClasses} flex mb-0.5 justify-between px-3 py-2 rounded-md transition ease-in-out duration-300	`}
        >
          <>Weather</>
          <WeatherDisplay variant='small' />
        </Disclosure.Button>
        <Link to='/'>
          <a href='/'>
            <Disclosure.Button
              className={`${themeClasses} block mb-0.5 px-3 py-2 rounded-md transition ease-in-out duration-300	flex w-full`}
            >
              Journey Planner
            </Disclosure.Button>
          </a>
        </Link>
        <Link to='#'>
          <a href='/'>
            <Disclosure.Button
              className={`${themeClasses} block mb-0.5 px-3 py-2 rounded-md transition ease-in-out duration-300	flex w-full`}
            >
              Stops
            </Disclosure.Button>
          </a>
        </Link>
        <Link to='#'>
          <a href='/'>
            <Disclosure.Button
              className={`${themeClasses} block mb-0.5 px-3 py-2 rounded-md transition ease-in-out duration-300	flex w-full`}
            >
              Routes
            </Disclosure.Button>
          </a>
        </Link>
        <Link to='#'>
          <a href='/'>
            <Disclosure.Button
              className={`${themeClasses} block mb-0.5 px-3 py-2 rounded-md transition ease-in-out duration-300	flex w-full`}
            >
              Fare Calculator
            </Disclosure.Button>
          </a>
        </Link>
        {auth ? (
          <>
            <Link to='#'>
              <a href='/'>
                <Disclosure.Button
                  className={`${themeClasses} block mb-0.5 px-3 py-2 rounded-md transition ease-in-out duration-300	flex w-full`}
                >
                  Spotify
                </Disclosure.Button>
              </a>
            </Link>
            <Link to='/account'>
              <a href='/account'>
                <Disclosure.Button
                  className={`${themeClasses} block mb-0.5 px-3 py-2 rounded-md transition ease-in-out duration-300 flex w-full`}
                >
                  Account
                </Disclosure.Button>
              </a>
            </Link>
            <Disclosure.Button
              onClick={handleSignout}
              className={`${themeClasses} block mb-0.5 px-3 py-2 rounded-md transition ease-in-out duration-300 flex w-full`}
            >
              Sign out
            </Disclosure.Button>
          </>
        ) : (
          <>
            <Link to='/signup'>
              <a href='/signup'>
                <Disclosure.Button
                  className={`${themeClasses} block mb-0.5 px-3 py-2 rounded-md transition ease-in-out duration-300	flex w-full`}
                >
                  Signup
                </Disclosure.Button>
              </a>
            </Link>
            <Link to='/login'>
              <a href='/login'>
                <Disclosure.Button
                  className={`${themeClasses} block mb-0.5 px-3 py-2 rounded-md transition ease-in-out duration-300 flex w-full`}
                >
                  Login
                </Disclosure.Button>
              </a>
            </Link>
          </>
        )}
      </div>
    </Disclosure.Panel>
  );
}
