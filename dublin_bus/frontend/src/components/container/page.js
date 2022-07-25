import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

import { useTheme } from "../../hooks";
import { MobileSidePanel } from "../sidepanel";

export function PageContainer(props) {
  const { children, ...rest } = props;
  const [isDarkMode] = useTheme();
  const [openSidePanel, setOpenSidePanel] = useState(false);

  const themeClasses = `${isDarkMode ? "bg-system-grey7" : "bg-system-grey2"}`;
  const classes = `page-me flex flex-col items-center justify-start md:min-h-[calc(100vh-64px)] min-h-[calc(100vh)] w-100 transition-all ease-in-out duration-300 ${themeClasses}`;

  const handleSidePanelClose = () => {
    setOpenSidePanel(false);
  };

  return (
    <>
      <div className={classes} {...rest}>
        <div className='md:hidden flex justify-end items-center pt-4 w-[100%]'>
          <div
            className={`${
              isDarkMode
                ? "text-system-grey4 hover:text-system-grey5"
                : "text-system-grey6 hover:text-system-grey5"
            } cursor-pointer pr-1`}
            onClick={() => setOpenSidePanel(true)}
          >
            <GiHamburgerMenu className='h-6 w-6' />
          </div>
        </div>
        {children}
      </div>
      <MobileSidePanel
        open={openSidePanel}
        setOpen={setOpenSidePanel}
        handleClose={handleSidePanelClose}
      />
    </>
  );
}
