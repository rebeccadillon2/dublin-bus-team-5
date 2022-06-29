import React from "react";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

import { useTheme } from "../hooks";

export default function MobileButton(props) {
  const [isDarkMode] = useTheme();
  const themeClasses = `${
    isDarkMode
      ? "text-system-grey3 hover:text-system-grey1"
      : "text-system-grey5 hover:text-system-grey7"
  }`;

  const { open } = props;
  return (
    <div className='-mr-2 flex md:hidden transition-all ease-in-out duration-300'>
      {/* Mobile menu button */}
      <Disclosure.Button
        className={`inline-flex items-center justify-center p-2 rounded-md ${themeClasses} transition-all ease-in-out duration-300	`}
      >
        <span className='sr-only'>Open main menu</span>
        {open ? (
          <XIcon className='block h-6 w-6' aria-hidden='true' />
        ) : (
          <MenuIcon className='block h-6 w-6' aria-hidden='true' />
        )}
      </Disclosure.Button>
    </div>
  );
}
