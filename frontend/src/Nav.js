import React from "react";
import { useTheme } from "./hooks";
import { ThemeToggle } from "./toggle";

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

export default function Nav() {
  return (
    <div className='navbar-N flex items-center justify-between md:px-6 px-4 h-16 w-100'>
      <Links />
      {/* <ThemeToggle /> */}
    </div>
  );
}
