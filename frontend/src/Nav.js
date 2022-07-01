import React, { useState, useEffect, useContext } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

import { icons } from "./lib/weather";
import { UserDetailsContext } from "./App";
import { getLiveWeather } from "./lib/api";
import { isUserAuthenticated } from "./lib/auth";
import { useTheme, useMobileDropDown, useProfileDropDown } from "./hooks";
import { PrimaryButton, SecondaryButton } from "./components/elements/button";

function Links() {
  const [isDarkMode] = useTheme();
  const themeClasses = `${
    isDarkMode
      ? "text-system-grey3 hover:text-system-grey1"
      : "text-system-grey5 hover:text-system-grey7"
  }`;

  return (
    <div className='LEFT flex justify-start items-center'>
      <div className='flex items-center'>
        <div className='flex-shrink-0'>
          <div className='pt-1'>
            <a href='/'>
              <img
                alt='profile'
                className='block'
                height={45}
                width={45}
                style={{ height: "45px", width: "45px" }}
                src={
                  "https://res.cloudinary.com/dk0r9bcxy/image/upload/v1654877396/research-practicum/bl2e_qkc1u6.png"
                }
              />
            </a>
          </div>
        </div>
        <div className='hidden md:block md:ml-6'>
          <div className='flex space-x-4'>
            <a
              href={"/"}
              className={`${themeClasses} px-2 py-2 transition ease-in-out duration-300	`}
            >
              Journey Planner
            </a>
            <a
              href='/'
              className={`${themeClasses} px-2 py-2 transition ease-in-out duration-300	`}
            >
              Stops
            </a>
            <a
              href='/'
              className={`${themeClasses} px-2 py-2 transition ease-in-out duration-300	`}
            >
              Routes
            </a>
            <a
              href='/'
              className={`${themeClasses} px-2 py-2 transition ease-in-out duration-300	`}
            >
              Fare Calculator
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function WeatherDisplay(props) {
  const { variant, className, ...rest } = props;
  const [error, setError] = useState(false);
  const [temp, setTemp] = useState(null);
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const weatherRes = await getLiveWeather();
        setTemp(String(Math.round(weatherRes.data.main.temp - 273.15)));
        setIcon(weatherRes.data.weather[0].icon);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    };
    getWeatherData();
  }, []);

  if (error) return <></>;
  return (
    <div className='flex items-center justify-center' {...rest}>
      {icon && temp && (
        <WeatherContainer
          className={`flex items-center justify-center ${className}`}
          variant={variant}
          temp={temp}
          icon={icons[icon]}
        />
      )}
    </div>
  );
}

function WeatherContainer(props) {
  const { icon, temp, variant, ...rest } = props;
  const Icon = icon;
  const [isDarkMode] = useTheme();

  const themeClasses = `${
    isDarkMode ? "text-system-grey2" : "text-system-grey7"
  }`;
  const iconClasses = `${
    variant === "large" ? "h-8 w-8" : "h-6 w-6"
  } ${themeClasses}`;
  const tempClasses = `${
    variant === "large" ? "text-lg" : "text-md"
  } ${themeClasses} pl-2`;

  return (
    <div className='flex items-center justify-center' {...rest}>
      {Icon && <Icon className={iconClasses} />}
      <p className={tempClasses}>{temp}°C</p>
    </div>
  );
}

function DropDown() {
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
            <a
              href='/'
              className={`block px-4 py-2 text-sm ${themeMenuClasses} transition ease-in-out duration-300	`}
            >
              Spotify
            </a>
          </div>
          <div>
            <a
              href='/account'
              className={`block px-4 py-2 text-sm ${themeMenuClasses} transition ease-in-out duration-300	`}
            >
              Account
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function DesktopRight() {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    setAuth(isUserAuthenticated());
  }, []);

  return (
    <div className='hidden md:ml-6 md:block'>
      <div className='flex items-center'>
        <WeatherDisplay variant='large' className='pr-3' />
        {auth ? (
          <DropDown />
        ) : (
          <>
            <a href='/signup'>
              <PrimaryButton type='action'>Signup</PrimaryButton>
            </a>
            <div className='w-2' />
            <a href='/login'>
              <SecondaryButton type='action'>Login</SecondaryButton>
            </a>
          </>
        )}
      </div>
    </div>
  );
}

function MobileButton() {
  const [isMobileDropDown, handleMobileDropdownToggle] = useMobileDropDown();
  const [isDarkMode] = useTheme();
  const themeClasses = `${
    isDarkMode
      ? "text-system-grey3 hover:text-system-grey1"
      : "text-system-grey5 hover:text-system-grey7"
  }`;
  const handleClick = (e) => {
    handleMobileDropdownToggle();
    e.stopPropagation();
  };

  return (
    <div className='-mr-2 flex md:hidden transition-all ease-in-out duration-300'>
      <div
        className={`inline-flex items-center justify-center p-2 rounded-md ${themeClasses} transition-all ease-in-out duration-300	`}
      >
        <span className='sr-only'>Open main menu</span>
        {isMobileDropDown ? (
          <AiOutlineClose
            onClick={(e) => handleClick(e)}
            className='block h-6 w-6'
            aria-hidden='true'
          />
        ) : (
          <AiOutlineMenu
            onClick={(e) => handleClick(e)}
            className='block h-6 w-6'
            aria-hidden='true'
          />
        )}
      </div>
    </div>
  );
}

function MobileMenu() {
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
            {/* <WeatherDisplay variant='small' /> */}
          </div>
          <a href='/'>
            <div
              className={`${themeClasses} block mb-0.5 px-3 py-2 rounded-md transition ease-in-out duration-300	flex w-full`}
            >
              Journey Planner
            </div>
          </a>
          <a href='/'>
            <div
              className={`${themeClasses} block mb-0.5 px-3 py-2 rounded-md transition ease-in-out duration-300	flex w-full`}
            >
              Stops
            </div>
          </a>
          <a href='/'>
            <div
              className={`${themeClasses} block mb-0.5 px-3 py-2 rounded-md transition ease-in-out duration-300	flex w-full`}
            >
              Routes
            </div>
          </a>
          <a href='/'>
            <div
              className={`${themeClasses} block mb-0.5 px-3 py-2 rounded-md transition ease-in-out duration-300	flex w-full`}
            >
              Fare Calculator
            </div>
          </a>
          {auth ? (
            <>
              <a href='/'>
                <div
                  className={`${themeClasses} block mb-0.5 px-3 py-2 rounded-md transition ease-in-out duration-300	flex w-full`}
                >
                  Spotify
                </div>
              </a>
              <a href='/account'>
                <div
                  className={`${themeClasses} block mb-0.5 px-3 py-2 rounded-md transition ease-in-out duration-300 flex w-full`}
                >
                  Account
                </div>
              </a>
            </>
          ) : (
            <>
              <a href='/signup'>
                <div
                  className={`${themeClasses} block mb-0.5 px-3 py-2 rounded-md transition ease-in-out duration-300	flex w-full`}
                >
                  Signup
                </div>
              </a>
              <a href='/login'>
                <div
                  className={`${themeClasses} block mb-0.5 px-3 py-2 rounded-md transition ease-in-out duration-300 flex w-full`}
                >
                  Login
                </div>
              </a>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function Nav() {
  const [isDarkMode] = useTheme();

  return (
    <div
      className={`${
        isDarkMode ? "bg-primary-black" : "bg-system-grey1"
      } transition ease-in-out duration-300`}
    >
      <>
        <div className='mx-auto px-4 sm:px-6 lg:px-6'>
          <div className='flex items-center justify-between h-16'>
            <Links />
            <DesktopRight />
            <MobileButton />
          </div>
        </div>
        <MobileMenu />
      </>
    </div>
  );
}
