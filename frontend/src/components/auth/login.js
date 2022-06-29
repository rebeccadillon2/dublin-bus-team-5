import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Input } from "../elements/form";
import { PrimaryButton } from "../elements/button";

export function LoginForm() {
  const navigate = useNavigate();

  const [dummy, setDummy] = useState(null);
  const [name, setName] = useState("");
  const [name2, setName2] = useState("");

  const handleLogin = () => {
    const inner = async () => {
      console.log("here");
      await window.localStorage.setItem(
        "token",
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMsImV4cCI6MTY1NjM1MjI2OH0.nLXPDm2qQunyKEwntazThEyfl9S6AeKthf63FIkycuY"
      );
      navigate("/");
    };
    try {
      inner();
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
      <div className='pt-6' />
      <PrimaryButton onClick={handleLogin} type='large'>
        Login
      </PrimaryButton>
      <a href={"/signup"}>
        <div className='flex items-center justify-center text-sm mt-3 text-system-grey5'>
          <p className='text-center'>
            Don't have an account?
            <br /> Click here to signup
          </p>
        </div>
      </a>
    </>
  );
}
