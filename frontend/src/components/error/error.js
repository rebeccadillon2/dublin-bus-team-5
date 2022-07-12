import React from "react";
import { FiAlertCircle } from "react-icons/fi";
import { MdOutlineSearchOff } from "react-icons/md";

import { useTheme } from "../../hooks";

export function Error(props) {
  const { variant, ...rest } = props;
  const [isDarkMode] = useTheme();

  const iconClasses = `w-12 h-12 mt-4 mb-2`;
  const themeClasses = `${
    isDarkMode ? "text-system-grey3" : "text-system-grey5"
  }`;
  const classes = `flex-col h-full items-center justify-center text-center  ${themeClasses}`;

  return (
    <div className={classes} {...rest}>
      <div className='flex justify-center'>
        {variant === "default" ? (
          <FiAlertCircle className={iconClasses} />
        ) : (
          <MdOutlineSearchOff className={iconClasses} />
        )}
      </div>
      {variant === "default" ? (
        <p>Ow snap! something seems to have gone wrong...</p>
      ) : variant === "bus-stop" ? (
        <p>No available information for this stop</p>
      ) : (
        <p>We couldn't find anything for you to explore...</p>
      )}
    </div>
  );
}
