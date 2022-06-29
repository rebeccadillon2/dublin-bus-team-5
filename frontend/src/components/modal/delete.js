import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Modal, ModalHeader } from ".";
import { Input } from "../elements/form";
import { DestructiveButton } from "../elements/button";

export function DeleteModal(props) {
  const { open, setOpen, handleClose, ...rest } = props;
  const [dummy, setDummy] = useState(null);
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const navigate = useNavigate();

  const handleDelete = () => {
    setOpen(false);
    navigate("/");
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
          error={dummy}
          type='text'
          value={name}
          variant='large'
          onChange={handleChange}
          // onFocus={handleFocus}
          placeholder='delete'
          label='delete'
          className='my-6'
        />

        <div className='mt-5 sm:mt-6'>
          <DestructiveButton onClick={handleDelete} type='large'>
            Delete Account
          </DestructiveButton>
        </div>
      </div>
    </Modal>
  );
}
