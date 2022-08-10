import React, { useState } from "react";

import { useTheme } from "../../hooks";
import { AccountSection, Card } from "../container";
import { FareSelect, PaymentToggle, ThemeToggle } from "../toggle";

import { SecondaryButton } from "../elements/button";

import { Support } from "../support/support";

export function GeneralSettings() {
  const [isDarkMode] = useTheme();

  const [is_support_open, set_support] = useState(false);

  const handle_support_click = () => {
    set_support(!is_support_open);
  };

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
            Let us know if you are an adult, student or child, so we can
            accurately calculate your fare.
          </p>
        </div>
        <FareSelect />
      </Card>
      <Card>
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

      <Card isLast={true} className='relative'>
        <div className='sm:pr-0 pr-10'>
          <p
            className={`${
              isDarkMode ? "text-primary-white" : "text-primary-black"
            }`}
          >
            Support
          </p>
          <p className='text-sm md:max-w-[500px] max-w-[240px]'>
            Let us know if you experienced technical problems and one of our
            admins will talk to you in real time.
          </p>
          <Support></Support>
        </div>
        <SecondaryButton
          type='action'
          aria-expanded='false'
          onClick={handle_support_click}
          data-bs-toggle='collapse'
          aria-controls='collapse_support'
          className='absolute top-8 right-4'
          data-bs-target='#collapse_support'
        >
          {is_support_open ? "Close" : "Open"}
        </SecondaryButton>
      </Card>
    </AccountSection>
  );
}
