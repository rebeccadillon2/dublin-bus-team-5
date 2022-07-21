import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

import { SidePanel } from ".";
import { useAuthenticate } from "../../hooks";
import { getUser } from "../../lib/api";
import { getPayload } from "../../lib/auth";

export function MobileSidePanel({ open, setOpen, handleClose }) {
  const uid = getPayload().sub;
  const [isAuthenticated] = useAuthenticate();
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      if (!isAuthenticated) return;
      try {
        const { data } = await getUser(uid);
        console.log("data", data);
        setEmail(data.email);
      } catch (e) {
        console.log(e);
      }
    };
    getUserData();
  }, []);

  return (
    <SidePanel
      open={open}
      handleClose={handleClose}
      className=''
      setIsOpen={setOpen}
    >
      <div className='flex flex-col items-start justify-start w-[100%]'>
        <div className='flex items-center justify-between w-[100%] border-b border-system-grey2 pb-4'>
          <div className='outline-none pl-6'>
            <Link to='/' className='outline-none'>
              <img
                alt='profile'
                className='block'
                height={45}
                width={45}
                style={{ height: "45px", width: "45px", outline: "none" }}
                src={
                  "https://res.cloudinary.com/dk0r9bcxy/image/upload/v1654877396/research-practicum/bl2e_qkc1u6.png"
                }
              />
            </Link>
          </div>
          <div className='pr-6' onClick={() => setOpen(false)}>
            <FiX className='w-6 h-6' />
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='pt-4 pb-2 pl-6 cursor-pointer'>Journey</div>
          <div className='py-2 pl-6 cursor-pointer'>Stops</div>
          <div className='py-2 pl-6 cursor-pointer'>Routes</div>
          <div className='pt-2 pb-4 pl-6 cursor-pointer'>Weather</div>
        </div>
        {isAuthenticated ? (
          <>
            {email && (
              <div className='flex flex-col border-y border-system-grey2 w-[100%]'>
                <div className='pt-4 pb-1 pl-6 text-sm'>Signed in as</div>
                <div className='pt-1 pb-4 pl-6'>{email}</div>
              </div>
            )}
            <div className='flex flex-col '>
              <div className='pt-4 pb-2 pl-6 cursor-pointer'>Account</div>
              <div className='pt-2 pb-4 pl-6 cursor-pointer'>Sign out</div>
            </div>
          </>
        ) : (
          <>
            <div className='flex flex-col border-t border-system-grey2 w-[100%]'>
              <div className='pt-4 pb-2 pl-6 cursor-pointer'>Sign in</div>
              <div className='pt-2 pb-4 pl-6 cursor-pointer'>Register</div>
            </div>
          </>
        )}
      </div>
    </SidePanel>
  );
}
