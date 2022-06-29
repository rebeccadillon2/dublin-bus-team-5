import React, { useState } from "react";

import { Input } from "../components/elements/form";
import { PrimaryButton } from "../components/elements/button";

export default function EditProfileInfo() {
  const [dummy, setDummy] = useState(null);
  const [name, setName] = useState("");
  const [name2, setName2] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handleChange2 = (e) => {
    setName2(e.target.value);
  };

  return (
    <div className='pt-6'>
      <Input
        specialTheme
        error={dummy}
        type='email'
        value={name}
        variant='small'
        onChange={handleChange}
        // onFocus={handleFocus}
        placeholder='New email'
        label='New email'
        className='md:w-90 sm:w-78 w-55'
      />
      <div className='h-3' />
      <Input
        specialTheme
        error={dummy}
        type='email'
        value={name2}
        variant='small'
        onChange={handleChange2}
        // onFocus={handleFocus}
        placeholder='Confirm new email'
        label='Confirm new email'
        className='md:w-90 sm:w-78 w-55'
      />
      <div className='pt-6' />
      <PrimaryButton type='action'>Submit</PrimaryButton>
    </div>
  );
}
