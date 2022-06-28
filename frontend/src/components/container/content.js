import React, { useContext } from "react";
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";

import { ThemeContext, ExpandedContext } from "../App";

function ExpandToggle() {
  const { isDarkMode } = useContext(ThemeContext);
  const { isExpanded, setIsExpanded } = useContext(ExpandedContext);

  const themeClasses = `${
    isDarkMode
      ? "bg-primary-black text-system-grey3"
      : "bg-primary-white text-primary-black"
  }`;
  const classes = `flex items-center justify-center h-6 w-8 rounded-tl-lg item-center transition-all ease-in-out duration-500 absolute bottom-0 z-50 cursor-pointer ${themeClasses}`;

  return (
    <div onClick={() => setIsExpanded(!isExpanded)} className={classes}>
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
  const { isDarkMode } = useContext(ThemeContext);
  const { isExpanded } = useContext(ExpandedContext);

  const containerClasses = `relative flex items-end flex-col w-full overflow-y-scroll shadow-2xl  md:absolute md:top-20 md:left-4 md:z-50 md:w-100.1 md:rounded-lg`;
  const themeClasses = `${isDarkMode ? "bg-system-grey6" : "bg-system-grey2"}`;
  const expandedClasses = `${
    isExpanded ? "min-h-80vh max-h-80vh h-80vh" : "max-h-54 min-h-54 h-54"
  }`;
  const innerClasses = `container-to-make py-2 md:px-4 px-2 w-full md:w-100.1 transition-all ease-in-out duration-500  overflow-y-scroll md:rounded-lg ${themeClasses} ${expandedClasses}`;
  return (
    <div className={containerClasses} {...rest}>
      <div className={innerClasses}>{children}</div>
      <ExpandToggle />
    </div>
  );
}
