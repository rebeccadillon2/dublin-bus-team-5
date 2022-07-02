import React from "react";
import { Switch } from "@headlessui/react";

import { useTheme } from "../../hooks";

export function Toggle(props) {
  const { check, callback, iconOne, iconTwo, fillOne, fillTwo } = props;
  const [isDarkMode] = useTheme();
  const IconOne = iconOne;
  const IconTwo = iconTwo;

  return (
    <Switch
      checked={check}
      onChange={callback}
      className={`${
        isDarkMode ? "bg-system-grey6" : "bg-system-grey3"
      } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 mr-2`}
    >
      <span className='sr-only'>Use setting</span>
      <span
        className={`${check ? "translate-x-5 " : "translate-x-0 "} ${
          isDarkMode ? "bg-system-grey2" : "bg-system-grey2"
        } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
      >
        <span
          className={`${
            check
              ? "opacity-0 ease-out duration-100"
              : "opacity-100 ease-in duration-200"
          }
            absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
          aria-hidden='true'
        >
          <IconOne fill={fillOne} className='h-3 w-3' />
        </span>
        <span
          className={`${
            check
              ? "opacity-100 ease-in duration-200"
              : "opacity-0 ease-out duration-100"
          }
            absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
          aria-hidden='true'
        >
          <IconTwo fill={fillTwo} className='h-3 w-3' />
        </span>
      </span>
    </Switch>
  );
}
