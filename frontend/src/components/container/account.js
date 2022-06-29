import React from "react";
import { useTheme } from "../../hooks";

export function AccountSection(props) {
  const { title, className, children, first, ...rest } = props;
  const [isDarkMode] = useTheme();

  const headerClasses = `${
    isDarkMode ? "text-system-grey5" : "text-system-grey6"
  } font-medium ml-4 mb-2.5 text-subtitle font-normal`;
  const classes = `${
    isDarkMode
      ? "bg-primary-black text-system-grey4"
      : "bg-system-grey1 text-system-grey6"
  } md:w-180   w-full rounded-default`;

  return (
    <div className={`${first && "mt-10"} mb-10 min-w-117`} {...rest}>
      <p className={headerClasses}>{title}</p>
      <ul className={classes}>{children}</ul>
    </div>
  );
}
