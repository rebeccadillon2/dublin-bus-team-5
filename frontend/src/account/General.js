import React from "react";
import { useTheme } from "../hooks";

import { FareToggle, ThemeToggle } from "../components/toggle";
import { AccountSection, Card } from "../components/container";

export default function GeneralSettings() {
  const [isDarkMode] = useTheme();

  return (
    <AccountSection title='General' first={true}>
      <Card isFirst={true}>
        <div className='pr-10'>
          <p
            className={`${
              isDarkMode ? "text-primary-white" : "text-primary-black"
            }`}
          >
            Theme
          </p>
          <p className='text-sm'>
            Decide if you want the application in dark or light theme.
          </p>
        </div>
        <ThemeToggle />
      </Card>
      <div className={`${isDarkMode ? "bg-system-grey7 h-px" : ""} `} />
      <Card isLast={true}>
        <div className='pr-10'>
          <p
            className={`${
              isDarkMode ? "text-primary-white" : "text-primary-black"
            }`}
          >
            Fare Calculator
          </p>
          <p className='text-sm'>
            Let us know if you are an adult or child, so we can accurately
            calculate your fare.
          </p>
        </div>
        <FareToggle />
      </Card>
    </AccountSection>
  );
}
