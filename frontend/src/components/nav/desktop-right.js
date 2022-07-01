import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { WeatherDisplay, DropDown } from ".";
import { isUserAuthenticated } from "../../lib/auth";
import { PrimaryButton, SecondaryButton } from "../elements/button";

export function DesktopRight() {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    setAuth(isUserAuthenticated());
  }, []);

  return (
    <div className='hidden md:ml-6 md:block'>
      <div className='flex items-center'>
        <WeatherDisplay variant='large' className='pr-3' />
        {auth ? (
          <DropDown />
        ) : (
          <>
            <Link to='/signup'>
              <PrimaryButton type='action'>Signup</PrimaryButton>
            </Link>
            <div className='w-2' />
            <Link to='/login'>
              <SecondaryButton type='action'>Login</SecondaryButton>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
