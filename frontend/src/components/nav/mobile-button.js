import React from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

import { useTheme, useMobileDropDown } from "../../hooks";

export function MobileButton() {
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
