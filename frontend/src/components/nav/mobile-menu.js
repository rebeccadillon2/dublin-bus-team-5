import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { WeatherDisplay } from "./weather";
import { isUserAuthenticated } from "../../lib/auth";
import { useTheme, useMobileDropDown } from "../../hooks";

export function MobileMenu() {
  const [isDarkMode] = useTheme();
  const [auth, setAuth] = useState(false);
  const [isMobileDropDown] = useMobileDropDown();

  const themeClasses = `${
    isDarkMode
      ? "bg-primary-black text-system-grey3 hover:text-system-grey1 hover:bg-system-grey7"
      : "bg-system-grey2 text-system-grey5 hover:text-system-grey7 hover:bg-system-grey3"
  }`;

  useEffect(() => {
    setAuth(isUserAuthenticated());
  }, []);

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={(e) => handleClick(e)}
      className='md:hidden transition-all ease-in-out duration-300'
    >
      {isMobileDropDown && (
        <div className='px-2 pt-2 pb-3 space-y-1'>
          <div
            className={`${themeClasses} flex mb-0.5 justify-between px-3 py-2 rounded-md transition ease-in-out duration-300	`}
          >
            <>Weather</>
            <WeatherDisplay variant='small' />
          </div>
          <Link to='/'>
            <div
              className={`${themeClasses} block mb-0.5 px-3 py-2 rounded-md transition ease-in-out duration-300	flex w-full`}
            >
              Journey Planner
            </div>
          </Link>
          <Link to='/'>
            <div
              className={`${themeClasses} block mb-0.5 px-3 py-2 rounded-md transition ease-in-out duration-300	flex w-full`}
            >
              Stops
            </div>
          </Link>
          <Link to='/'>
            <div
              className={`${themeClasses} block mb-0.5 px-3 py-2 rounded-md transition ease-in-out duration-300	flex w-full`}
            >
              Routes
            </div>
          </Link>
          <Link to='/'>
            <div
              className={`${themeClasses} block mb-0.5 px-3 py-2 rounded-md transition ease-in-out duration-300	flex w-full`}
            >
              Fare Calculator
            </div>
          </Link>
          {auth ? (
            <>
              <Link to='/'>
                <div
                  className={`${themeClasses} block mb-0.5 px-3 py-2 rounded-md transition ease-in-out duration-300	flex w-full`}
                >
                  Spotify
                </div>
              </Link>
              <Link to='/account'>
                <div
                  className={`${themeClasses} block mb-0.5 px-3 py-2 rounded-md transition ease-in-out duration-300 flex w-full`}
                >
                  Account
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link to='/signup'>
                <div
                  className={`${themeClasses} block mb-0.5 px-3 py-2 rounded-md transition ease-in-out duration-300	flex w-full`}
                >
                  Signup
                </div>
              </Link>
              <Link to='/login'>
                <div
                  className={`${themeClasses} block mb-0.5 px-3 py-2 rounded-md transition ease-in-out duration-300 flex w-full`}
                >
                  Login
                </div>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
