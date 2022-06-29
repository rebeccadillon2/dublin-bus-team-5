import React, { useState, useEffect } from "react";

import { useTheme } from "./hooks";
import { getLiveWeather } from "./lib/api";
import { icons } from "./lib/weather";
import { isUserAuthenticated } from "./lib/auth";
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
  const [isOpen, setIsOpen] = useState(false);
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
    <div className='ml-3 relative z-10'>
      <div onClick={() => setIsOpen(!isOpen)}>
        <div className='flex text-sm rounded-full '>
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
        </div>
      </div>

      {isOpen && (
        <div
          className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${themeBgClasses}`}
        >
          <div>
            <a
              href='/'
              className={`
                          block px-4 py-2 text-sm ${themeMenuClasses} transition ease-in-out duration-300	`}
            >
              Spotify
            </a>
          </div>
          <div>
            <a
              href='/account'
              className={`
                            active ? "" : ""
                          block px-4 py-2 text-sm ${themeMenuClasses} transition ease-in-out duration-300	`}
            >
              Account
            </a>
          </div>
          <div>
            <a
              href='/'
              onClick={handleSignout}
              className={`
                            active ? "" : ""
                          block px-4 py-2 text-sm ${themeMenuClasses} transition ease-in-out duration-300	`}
            >
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Nav() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    setAuth(isUserAuthenticated());
  }, []);
  return (
    <div className='navbar-N flex items-center justify-between md:px-6 px-4 h-16 w-100'>
      <Links />
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
    </div>
  );
}
