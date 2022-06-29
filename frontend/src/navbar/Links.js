import React from "react";
import { Link } from "react-router-dom";

import { useTheme } from "../hooks";

export default function Links() {
  const [isDarkMode] = useTheme();
  const themeClasses = `${
    isDarkMode
      ? "text-system-grey3 hover:text-system-grey1"
      : "text-system-grey5 hover:text-system-grey7"
  }`;

  return (
    <div className='flex items-center'>
      <div className='flex-shrink-0'>
        <div className='pt-1'>
          <Link to={"/"}>
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
          </Link>
        </div>
      </div>
      <div className='hidden md:block md:ml-6'>
        <div className='flex space-x-4'>
          <Link to={"/"}>
            <a
              href={"/"}
              className={`${themeClasses} px-2 py-2 transition ease-in-out duration-300	`}
            >
              Journey Planner
            </a>
          </Link>
          <Link to='#'>
            <a
              href='/'
              className={`${themeClasses} px-2 py-2 transition ease-in-out duration-300	`}
            >
              Stops
            </a>
          </Link>
          <Link to='#'>
            <a
              href='/'
              className={`${themeClasses} px-2 py-2 transition ease-in-out duration-300	`}
            >
              Routes
            </a>
          </Link>
          <Link to='#'>
            <a
              href='/'
              className={`${themeClasses} px-2 py-2 transition ease-in-out duration-300	`}
            >
              Fare Calculator
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
