import React from "react";
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";

import { useTheme, useExpanded, useWindowSize } from "../../hooks";

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
  const [width] = useWindowSize();

  const containerClasses = `${
    width > 768
      ? "md:min-h-[calc(100vh-64px)] md:absolute md:top-18 md:left-0 md:z-50 md:w-100.1  overflow-y-scroll"
      : "absolute z-10 top-14 left-2 right-2 z-10 mx-auto"
  }  overflow-y-scroll shadow-2xl `;
  const themeClasses = `${isDarkMode ? "bg-system-grey6" : "bg-system-grey2"}`;
  const expandedClasses = `${
    isExpanded
      ? "min-h-[85vh] max-h-[85vh] h-[85vh] "
      : "hidden min-h-0 h-0 max-h-0 "
  } md:h-full`;
  const innerClasses = `container-to-make py-2 md:px-4 px-4 md:w-100.1 transition-all ease-in-out duration-500 md:min-h-[calc(100vh-64px)] md:max-h-[calc(100vh-64px)] overflow-y-scroll ${themeClasses} ${
    width > 768 ? "" : expandedClasses
  }`;
  return (
    <div className={containerClasses} {...rest}>
      <div className={innerClasses}>{children}</div>
      {/* <ExpandToggle /> */}
    </div>
  );
}
