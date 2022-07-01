import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTheme } from "../../hooks";
import { Input } from "../elements/form";
import { LoadingSpinner } from "../loading";
import { registerUser } from "../../lib/api";
import { PrimaryButton } from "../elements/button";

export function SignupForm() {
  const [isDarkMode] = useTheme();
  const initialState = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    profileImage:
      "https://res.cloudinary.com/dn11uqgux/image/upload/v1631736676/sei_project_3_studio_images/Screenshot_2021-09-15_at_21.09.58_vd6hdq.png",
  };

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState(null);
  const [formData, setFormData] = useState(initialState);
  const [missingError, setMissingValuesError] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
      username: formData.email,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirmation) {
      setMissingValuesError("Password and confirmation do not match");
      return;
    }
    try {
      setLoading(true);
      await registerUser(formData);
      setLoading(false);
      navigate("/login");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setFormErrors(err.response.data);
      if (!formData.email) {
        setMissingValuesError("Must provide an email");
      } else if (!formData.password) {
        setMissingValuesError("Must provide a password");
      } else if (!formData.passwordConfirmation) {
        setMissingValuesError("Must provide password confirmation");
      }
    }
  };

  const handleFocus = () => {
    setFormErrors(null);
    setMissingValuesError(null);
  };

  return (
    <>
      <Input
        type='text'
        specialWidth
        label='Email'
        name={"email"}
        variant='large'
        placeholder='Email'
        onFocus={handleFocus}
        value={formData.email}
        className='md:w-90 w-78'
        onChange={(e) => handleChange(e)}
        error={formErrors && formErrors.username && formErrors.username[0]}
      />
      <div className='h-3' />
      <Input
        specialWidth
        type='password'
        name='password'
        variant='large'
        label='Password'
        onFocus={handleFocus}
        placeholder='Password'
        className='md:w-90 w-78'
        value={formData.password}
        onChange={(e) => handleChange(e)}
        error={formErrors && formErrors.password && formErrors.password[0]}
      />
      <div className='h-3' />

      <Input
        error={
          formErrors &&
          formErrors.passwordConfirmation &&
          formErrors.passwordConfirmation[0]
        }
        specialWidth
        type='password'
        variant='large'
        onFocus={handleFocus}
        label='Confirm Password'
        className='md:w-90 w-78'
        name='passwordConfirmation'
        placeholder='Confirm Password'
        onChange={(e) => handleChange(e)}
        value={formData.passwordConfirmation}
      />
      {missingError ? (
        <div className='flex items-center justify-center h-6 px-2 text-sm text-primary-red'>
          <p>{missingError}</p>
        </div>
      ) : (
        <div className='h-6' />
      )}
      <PrimaryButton onClick={handleSignup} type='large'>
        {loading ? (
          <LoadingSpinner size={"small"} color='border-primary-white' />
        ) : (
          "Signup"
        )}
      </PrimaryButton>
      <div
        className={`flex flex-col items-center justify-center text-sm mt-4 isDarkMode ${
          isDarkMode ? "text-system-grey4" : "text-system-grey5"
        } text-center`}
      >
        <p>
          By continuing, you agree to our Terms of Service and acknowledge
          you've read our <strong>Privacy Policy</strong>
        </p>
        <div
          className={`border-b ${
            isDarkMode ? "border-b-system-grey4" : "border-b-system-grey4"
          }  w-[90%] my-2`}
        />
        <a href={"/login"}>
          <p className='text-center'>
            Already have an account?
            <br />
            <strong>Click here to login</strong>
          </p>
        </a>
      </div>
    </>
  );
}
