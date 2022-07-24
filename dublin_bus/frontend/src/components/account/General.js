import React from "react";
import { useNavigate } from "react-router-dom";

import { useTheme } from "../../hooks";
import { FareToggle, ThemeToggle } from "../toggle";
import { AccountSection, Card } from "../container";
import { SecondaryButton } from "../elements/button";

export function GeneralSettings() {
  const [isDarkMode] = useTheme();
  const navigate = useNavigate();

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
            Dublin Street Wordle
          </p>
          <p className='text-sm'>
            Why not pass the time with our custom dublin street wordle game.
          </p>
        </div>
        <SecondaryButton onClick={() => navigate("/wordle")} type='action'>
          Play
        </SecondaryButton>
      </Card>
    </AccountSection>
  );
}
