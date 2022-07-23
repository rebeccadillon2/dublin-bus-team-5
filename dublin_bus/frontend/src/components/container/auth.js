import React from "react";
import { useTheme } from "../../hooks";

export function AuthContainer(props) {
  const { children, ...rest } = props;
  const [isDarkMode] = useTheme();
  const themeClasses = `${
    isDarkMode
      ? "bg-system-grey6 text-system-grey2"
      : "bg-system-grey3 text-system-grey6"
  }`;
  const classes = `max-w-130 md:w-98 w-86 px-4 py-6 md:mt-14 mt-6 rounded-lg ${themeClasses}`;
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
