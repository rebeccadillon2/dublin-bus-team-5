import React from "react";
import { useTheme } from "../../hooks";

export function TableSkeleton({ variant }) {
  const [isDarkMode] = useTheme();
  const classes = `${variant === "routes" ? "md:w-86 w-78" : "md:w-90 w-80"}`;
  const themeClasses = `${isDarkMode ? "bg-primary-black" : "bg-system-grey3"}`;

  return (
    <div className={classes}>
      <div className='animate-pulse flex space-x-4'>
        <div className='flex-1 space-y-2 py-1'>
          <div className={`h-8  rounded-xl ${themeClasses}`} />
          <div className={`h-5  max-w-[80%] rounded-xl ${themeClasses}`} />
          <div className={`h-5  max-w-[80%] rounded-xl ${themeClasses}`} />
        </div>
      </div>
    </div>
  );
}
