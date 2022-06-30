import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTheme } from "../../hooks";
import { Input } from "../elements/form";
import { loginUser } from "../../lib/api";
import { setToken } from "../../lib/auth";
import { LoadingSpinner } from "../loading";
import { PrimaryButton } from "../elements/button";

export function LoginForm() {
  const initialState = {
    email: "",
    password: "",
  };

  const [isDarkMode] = useTheme();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState(null);
  const [formData, setFormData] = useState(initialState);
  const [missingError, setMissingValuesError] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const { data } = await loginUser(formData);
      console.log("token", data.token);
      setToken(data.token);
      navigate("/");
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    } catch (err) {
      console.log(err.response.data.detail);
      setFormErrors(err.response);
      setLoading(false);
      setFormErrors(err.response.data);
      if (!formData.email) {
        setMissingValuesError("Must provide an email");
      } else if (!formData.password) {
        setMissingValuesError("Must provide a password");
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
        error={formErrors && formErrors.email && formErrors.email[0]}
      />
      <div className='h-3' />
      <Input
        specialWidth
        type='password'
        variant='large'
        label='Password'
        name={"password"}
        onFocus={handleFocus}
        placeholder='Password'
        className='md:w-90 w-78'
        value={formData.password}
        onChange={(e) => handleChange(e)}
        error={formErrors && formErrors.password && formErrors.password[0]}
      />
      {missingError ? (
        <div className='flex items-center justify-center h-6 px-2 text-sm text-primary-red'>
          <p>{missingError}</p>
        </div>
      ) : formErrors ? (
        <div className='flex items-center justify-center h-6 text-sm text-primary-red'>
          <p>Invalid email and password combination</p>
        </div>
      ) : (
        <div className='h-6' />
      )}
      <PrimaryButton onClick={handleLogin} type='large'>
        {loading ? (
          <LoadingSpinner size={"small"} color='border-primary-white' />
        ) : (
          "Login"
        )}
      </PrimaryButton>
      <a href={"/signup"}>
        <div
          className={`flex items-center justify-center text-sm mt-3 text-center ${
            isDarkMode ? "text-system-grey4" : "text-system-grey5"
          }`}
        >
          <p>
            Don't have an account?
            <br /> <strong> Click here to signup</strong>
          </p>
        </div>
      </a>
    </>
  );
}
