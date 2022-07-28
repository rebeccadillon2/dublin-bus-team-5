import React from "react";

import { useTheme } from "../../hooks";
import { AccountSection, Card } from "../container";
import { FareToggle, PaymentToggle, ThemeToggle } from "../toggle";

export function GeneralSettings() {
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
      <Card>
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
      <Card isLast={true}>
        <div className='pr-10'>
          <p
            className={`${
              isDarkMode ? "text-primary-white" : "text-primary-black"
            }`}
          >
            Payment Type
          </p>
          <p className='text-sm'>
            Let us know if you are paying with cash or a leap card, so we can
            accurately calculate your fare.
          </p>
        </div>
        <PaymentToggle />
      </Card>
    </AccountSection>
  );
}
