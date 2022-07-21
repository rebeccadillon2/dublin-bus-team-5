import React from "react";
import { Disclosure } from "@headlessui/react";

import { useTheme } from "../../hooks";
import { Links, DesktopRight, MobileButton, MobileMenu } from ".";

export function Nav() {
  const [isDarkMode] = useTheme();

  return (
    <div
      className={`hidden md:inline-block w-[100%]	 ${
        isDarkMode ? "bg-primary-black" : "bg-system-grey1"
      } transition-all ease-in-out`}
    >
      <Disclosure as='nav'>
        {({ open }) => (
          <>
            <div className='mx-auto px-4 sm:px-6 lg:px-6'>
              <div className='flex items-center justify-between h-16'>
                <Links />
                <DesktopRight />
                <MobileButton open={open} />
              </div>
            </div>
            <MobileMenu />
          </>
        )}
      </Disclosure>
    </div>
  );
}
