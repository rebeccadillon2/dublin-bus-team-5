import { Disclosure } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";

import { useTheme } from "../../hooks";
import { WeatherDisplay } from "./weather";
import { MapContainerContext } from "../../App";
import { isUserAuthenticated } from "../../lib/auth";

export function MobileMenu() {
  const navigate = useNavigate();
  const [isDarkMode] = useTheme();
  const [auth, setAuth] = useState(false);
  const { mapContainerType, setMapContainerType } =
    useContext(MapContainerContext);

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

  const handleStopsClick = () => {
    navigate("/");
    setMapContainerType({
      ...mapContainerType,
      type: "realtime",
      place: "realtime",
    });
  };

  const handleRoutesClick = () => {
    navigate("/");
    setMapContainerType({
      ...mapContainerType,
      type: "routes",
      place: "routes",
    });
  };

  const handleJourneyClick = () => {
    navigate("/");
    setMapContainerType({
      ...mapContainerType,
      type: "default",
      place: null,
    });
  };

  const handleWeatherClick = () => {
    navigate("/");
    setMapContainerType({ ...mapContainerType, type: "weather" });
  };

  return (
    <Disclosure.Panel className='md:hidden transition-all ease-in-out duration-300'>
      <div className='px-2 pt-2 pb-3 space-y-1'>
        <Disclosure.Button
          onClick={handleWeatherClick}
          className={`${themeClasses} w-[100%] flex mb-0.5 justify-between px-3 py-2 rounded-md transition ease-in-out duration-300	cursor-auto`}
        >
          <>Weather</>
          <WeatherDisplay variant='small' />
        </Disclosure.Button>

        <Disclosure.Button
          onClick={handleJourneyClick}
          className={`${themeClasses} block mb-0.5 px-3 py-2 rounded-md transition ease-in-out duration-300	flex w-full`}
        >
          Journey Planner
        </Disclosure.Button>
        <Disclosure.Button
          onClick={handleStopsClick}
          className={`${themeClasses} block mb-0.5 px-3 py-2 rounded-md transition ease-in-out duration-300	flex w-full`}
        >
          Real Time
        </Disclosure.Button>
        <Disclosure.Button
          onClick={handleRoutesClick}
          className={`${themeClasses} block mb-0.5 px-3 py-2 rounded-md transition ease-in-out duration-300	flex w-full`}
        >
          Routes
        </Disclosure.Button>

        {auth ? (
          <>
            <Link to='/account'>
              <Disclosure.Button
                className={`${themeClasses} block my-1 px-3 py-2 rounded-md transition ease-in-out duration-300 flex w-full`}
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
                className={`${themeClasses} block my-1 px-3 py-2 rounded-md transition ease-in-out duration-300	flex w-full`}
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
