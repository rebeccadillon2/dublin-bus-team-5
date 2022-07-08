import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useTheme } from "../../hooks";
import { MapContainerContext } from "../../App";

export function Links() {
  const [isDarkMode] = useTheme();
  const themeClasses = `${
    isDarkMode
      ? "text-system-grey3 hover:text-system-grey1"
      : "text-system-grey5 hover:text-system-grey7"
  }`;
  const navigate = useNavigate();

  // const handleHomeClick = () => {
  //   navigate('/')
  // }

  return (
    <div className='LEFT flex justify-start items-center'>
      <div className='flex items-center'>
        <div className='flex-shrink-0'>
          <div className='pt-1'>
            <Link to='/'>
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
            </Link>
          </div>
        </div>
        <div className='hidden md:block md:ml-6'>
          <div className='flex space-x-4'>
            <Link
              to={"/"}
              className={`${themeClasses} px-2 py-2 transition ease-in-out duration-300	`}
            >
              Journey Planner
            </Link>
            <Link
              to='/stops'
              className={`${themeClasses} px-2 py-2 transition ease-in-out duration-300	`}
            >
              Stops
            </Link>
            <Link
              to='/'
              className={`${themeClasses} px-2 py-2 transition ease-in-out duration-300	`}
            >
              Routes
            </Link>
            <Link
              to='/'
              className={`${themeClasses} px-2 py-2 transition ease-in-out duration-300	`}
            >
              Fare Calculator
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
