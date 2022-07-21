import React from "react";
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";

import { useTheme, useExpanded } from "../../hooks";

function ExpandToggle() {
  const [isDarkMode] = useTheme();
  const [isExpanded, handleExpandedToggle] = useExpanded();

  const themeClasses = `${
    isDarkMode
      ? "bg-primary-black text-system-grey3"
      : "bg-primary-white text-primary-black"
  }`;
  const classes = `md:hidden flex items-center justify-center h-6 w-8 rounded-tl-lg item-center transition-all ease-in-out duration-500 absolute bottom-0 z-50 cursor-pointer ${themeClasses}`;

  return (
    <div onClick={() => handleExpandedToggle()} className={classes}>
      {isExpanded ? (
        <MdOutlineExpandLess className='h4 w-4' />
      ) : (
        <MdOutlineExpandMore className='h4 w-4' />
      )}
    </div>
  );
}

export function ContentContainer(props) {
  const { children, ...rest } = props;
  const [isDarkMode] = useTheme();
  const [isExpanded] = useExpanded();

  const containerClasses = `flex items-end flex-col w-full overflow-y-scroll shadow-2xl  md:absolute md:top-18 md:left-0 md:z-50 md:w-100.1 `;
  const themeClasses = `${isDarkMode ? "bg-system-grey6" : "bg-system-grey2"}`;
  const expandedClasses = `${
    isExpanded
      ? "min-h-80vh max-h-80vh h-80vh md:min-h-[calc(100vh-64px)]"
      : "max-h-54 min-h-54 h-54 md:min-h-[calc(100vh-64px)]"
  }`;
  const innerClasses = `container-to-make py-2 md:px-4 px-2 w-full md:w-100.1 transition-all ease-in-out duration-500  overflow-y-scroll ${themeClasses} ${expandedClasses}`;
  return (
    <div className={containerClasses} {...rest}>
      <div className={innerClasses}>{children}</div>
      <ExpandToggle />
    </div>
  );
}
