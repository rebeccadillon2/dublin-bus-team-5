import React from "react";
import { FiSearch } from "react-icons/fi";
import { useTheme } from "../../../hooks";

export function SearchInput(props) {
  const { value, variant, className, ...rest } = props;
  const [isDarkMode] = useTheme();

  const themeClasses = `${
    isDarkMode
      ? "text-system-grey2 placeholder-system-grey5 bg-primary-black"
      : "text-system-grey6 bg-system-grey1"
  }`;
  const base = `border-0 block w-full h-10 pr-12 pl-3 text-subtitle rounded-xl group-hover:placeholder-primary-blue focus:outline-none focus:placeholder-primary-blue caret-system-grey5 focus:caret-primary-blue`;
  const classes = `${base} ${className} ${themeClasses}`;

  if (variant === "contracted")
    return <FiSearch className='text-primary-white h-6 w-6 ' />;

  return (
    <div className='h-10 w-full group'>
      <div className='mt-1 relative flex items-center'>
        <input
          value={value}
          className={classes}
          autoComplete='off'
          {...rest}
          placeholder={"Search"}
        />
        <div className='absolute inset-y-0 right-0 flex pt-2 pb-1.5 pr-2.5'>
          <FiSearch
            className={`h-6 w-6 ${
              isDarkMode ? "text-system-grey5" : "text-system-grey3"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
