import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "../toggle";
import { WeatherDisplay, DropDown } from ".";
import { isUserAuthenticated } from "../lib/auth";
import { PrimaryButton, SecondaryButton } from "../components/elements/button";

export function DesktopRight() {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleLoginClick = () => {
    navigate("./login");
  };

  useEffect(() => {
    setAuth(isUserAuthenticated());
  }, []);

  return (
    <div className='hidden md:ml-6 md:block'>
      <div className='flex items-center'>
        <WeatherDisplay variant='large' className='pr-3' />
        <ThemeToggle />
        {auth ? (
          <DropDown />
        ) : (
          <>
            <PrimaryButton onClick={handleSignupClick} type='action'>
              Signup
            </PrimaryButton>
            <div className='w-2' />
            <SecondaryButton onClick={handleLoginClick} type='action'>
              Login
            </SecondaryButton>
          </>
        )}
      </div>
    </div>
  );
}
