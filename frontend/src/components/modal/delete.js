import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { Modal, ModalHeader } from ".";
import { Input } from "../elements/form";
import { LoadingSpinner } from "../loading";
import { editUser, getUser } from "../../lib/api";
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
      setOpen(false);
      removeToken();
      navigate("/");
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    } catch (err) {
      setLoading(false);
      setError("Network error");
    }
  };

  useEffect(() => {
    const userId = getPayload().sub;
    const now = String(Math.floor(Date.now() / 1000));
    const getUserData = async (userId) => {
      try {
        const { data } = await getUser(userId);
        setFormData({ email: `${now}${data.email}` });
      } catch (err) {
        console.log("err", err);
        setError("Network error");
      }
    };
    getUserData(userId);
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
              "Login"
            )}
          </DestructiveButton>
        </div>
      </div>
    </Modal>
  );
}
