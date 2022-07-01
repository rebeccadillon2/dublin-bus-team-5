import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";

import { Modal, ModalHeader } from ".";
import { editUser } from "../../lib/api";
import { Input } from "../elements/form";
import { LoadingSpinner } from "../loading";
import { UserDetailsContext } from "../../App";
import { DestructiveButton } from "../elements/button";
import { getPayload, removeToken } from "../../lib/auth";

export function DeleteModal(props) {
  const { open, setOpen, handleClose, ...rest } = props;
  const navigate = useNavigate();
  const userId = getPayload().sub;
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);
  const [inputError, setInputError] = useState(null);
  const { userDetails } = useContext(UserDetailsContext);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleDelete = async () => {
    if (!input) {
      setError("Must type delete");
      return;
    }
    if (!formData) {
      setError("Network error");
      return;
    }
    if (input !== "delete") {
      setInputError("Must type delete");
      return;
    }
    try {
      setLoading(true);
      await editUser(userId, formData);
      setLoading(false);
      removeToken();
      navigate("/");
      // eslint-disable-next-line no-restricted-globals
      location.reload();
      setOpen(false);
    } catch (err) {
      setLoading(false);
      setError("Network error");
    }
  };

  useEffect(() => {
    const now = String(Math.floor(Date.now() / 1000));
    try {
      setFormData({ email: `${now}${userDetails.email}` });
    } catch (err) {
      console.log("err", err);
      setError("Network error");
    }
  }, []);

  const handleFocus = () => {
    setError(false);
    setInputError(null);
  };

  return (
    <Modal modalOpen={open} setModalOpen={setOpen}>
      <div {...rest}>
        <ModalHeader
          title='Are your sure you want to delete your account?'
          subtitle='When you delete your account all your data will be permanently destroyed. Please type delete below to delete your account.'
        />
        <Input
          specialWidth
          type='text'
          value={input}
          label='delete'
          variant='large'
          className='mt-6'
          error={inputError}
          placeholder='delete'
          onFocus={handleFocus}
          onChange={handleChange}
        />
        {error ? (
          <div className='flex items-center justify-center h-6 px-2 text-sm text-primary-red'>
            <p>{error}</p>
          </div>
        ) : (
          <div className='h-6' />
        )}
        <div>
          <DestructiveButton onClick={handleDelete} type='large'>
            {loading ? (
              <LoadingSpinner size={"small"} color='border-primary-white' />
            ) : (
              "Delete"
            )}
          </DestructiveButton>
        </div>
      </div>
    </Modal>
  );
}
