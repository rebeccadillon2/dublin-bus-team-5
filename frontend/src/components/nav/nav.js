import React from "react";

import { useTheme } from "../../hooks";
import { Links, DesktopRight, MobileButton, MobileMenu } from ".";

export function Nav() {
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
