import React from "react";
import { useTheme } from "../../hooks";

export function AccountSection(props) {
  const { title, className, children, first, ...rest } = props;
  const [isDarkMode] = useTheme();

  const headerClasses = `${
    isDarkMode ? "text-system-grey4" : "text-system-grey6"
  } font-medium ml-4 mb-2.5 text-subtitle font-normal`;
  const classes = `${
    isDarkMode
      ? "bg-primary-black text-system-grey3"
      : "bg-system-grey1 text-system-grey6"
  } md:w-180   w-full rounded-default`;

  return (
    <div className={`${first && "md:mt-10 mt-2"} mb-10 min-w-117`} {...rest}>
      <p className={headerClasses}>{title}</p>
      <ul className={classes}>{children}</ul>
    </div>
  );
}
