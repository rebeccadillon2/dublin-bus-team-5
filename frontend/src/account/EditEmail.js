import React, { useState } from "react";

import { editUser } from "../lib/api";
import { getPayload } from "../lib/auth";
import { Input } from "../components/elements/form";
import { LoadingSpinner } from "../components/loading";
import { PrimaryButton } from "../components/elements/button";

export default function EditProfileEmail({
  setIsEditingEmail,
  setPopup,
  setPopupText,
}) {
  const initalState = {
    email: "",
  };

  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState(null);
  const [confirmEmail, setConfirmEmail] = useState("");
  const [formData, setFormData] = useState(initalState);
  const [missingError, setMissingValuesError] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleConfirmEmail = (e) => {
    setConfirmEmail(e.target.value);
  };

  const handleSubmit = async () => {
    if (!formData.email || !confirmEmail) {
      setMissingValuesError("Must provide an email and confirmation email");
      return;
    }
    if (formData.email !== confirmEmail) {
      setMissingValuesError("Email and confirm email do not match");
      return;
    }

    const userId = getPayload().sub;

    try {
      setLoading(true);
      console.log("FD", formData);
      await editUser(userId, formData);
      setPopupText("Successfully updated email");
      setLoading(false);
      setPopup(true);
      setTimeout(() => {
        setPopup(false);
      }, 2000);
      setIsEditingEmail(false);
    } catch (err) {
      setLoading(false);
      console.log(err.response.data);
      setFormErrors(err.response.data);
      if (!err.response.data) {
        setMissingValuesError("Opps something went wrong");
      }
    }
  };

  const handleFocus = () => {
    setFormErrors(null);
    setMissingValuesError(null);
  };

  return (
    <div className='pt-6'>
      <Input
        specialTheme
        type='email'
        name={"email"}
        variant='small'
        label='New email'
        onFocus={handleFocus}
        value={formData.email}
        placeholder='New email'
        className='md:w-90 w-86'
        onChange={(e) => handleChange(e)}
        error={formErrors && formErrors.email && formErrors.email[0]}
      />
      <div className='h-3' />
      <Input
        specialTheme
        type='email'
        variant='small'
        value={confirmEmail}
        name={"confirmEmail"}
        onFocus={handleFocus}
        label='Confirm email'
        placeholder='Confirm email'
        className='md:w-90 w-86'
        onChange={(e) => handleConfirmEmail(e)}
        error={formErrors && formErrors.email && formErrors.email[0]}
      />
      {missingError ? (
        <div className='flex items-center h-6 px-2 text-sm text-primary-red'>
          <p>{missingError}</p>
        </div>
      ) : (
        <div className='h-6' />
      )}
      <PrimaryButton
        className='min-h-9 min-w-19.5'
        onClick={handleSubmit}
        type='action'
      >
        {loading ? (
          <LoadingSpinner size={"small"} color='border-primary-white' />
        ) : (
          "Submit"
        )}
      </PrimaryButton>
    </div>
  );
}
