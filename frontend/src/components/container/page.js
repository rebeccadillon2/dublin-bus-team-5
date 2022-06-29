import React from "react";
import { useTheme } from "../../hooks";

export function PageContainer(props) {
  const { children, ...rest } = props;
  const [isDarkMode] = useTheme();
  const themeClasses = `${isDarkMode ? "bg-system-grey7" : "bg-system-grey2"}`;
  const classes = `page-me flex items-start justify-center min-h-screen w-100 md:px-8 px-4 transition-all ease-in-out duration-300 ${themeClasses}`;

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
