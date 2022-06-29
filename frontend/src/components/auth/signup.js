import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Input } from "../elements/form";
import { PrimaryButton } from "../elements/button";

export function SignpForm() {
  const navigate = useNavigate();
  const [dummy, setDummy] = useState(null);
  const [name, setName] = useState("");
  const [name2, setName2] = useState("");
  const [name3, setName3] = useState("");

  const handleSignup = async () => {
    try {
      console.log("here");
      await window.localStorage.removeItem("token");
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handleChange2 = (e) => {
    setName2(e.target.value);
  };
  const handleChange3 = (e) => {
    setName3(e.target.value);
  };

  return (
    <>
      <Input
        specialWidth
        error={dummy}
        type='text'
        value={name}
        variant='large'
        onChange={handleChange}
        // onFocus={handleFocus}
        placeholder='Email'
        label='Email'
        className='md:w-90 w-78'
      />
      <div className='h-3' />
      <Input
        specialWidth
        error={dummy}
        type='password'
        value={name2}
        variant='large'
        onChange={handleChange2}
        // onFocus={handleFocus}
        placeholder='Password'
        label='Password'
        className='md:w-90 w-78'
      />
      <div className='h-3' />

      <Input
        specialWidth
        error={dummy}
        type='password'
        value={name3}
        variant='large'
        onChange={handleChange3}
        // onFocus={handleFocus}
        placeholder='Confirm Password'
        label='Confirm Password'
        className='md:w-90 w-78'
      />
      <div className='pt-6' />
      <PrimaryButton onClick={handleSignup} type='large'>
        Signup
      </PrimaryButton>
      <a href={"/login"}>
        <div className='flex items-center justify-center text-sm mt-3 text-system-grey5'>
          <p className='text-center'>
            Already have an account?
            <br /> Click here to login
          </p>
        </div>
      </a>
    </>
  );
}
