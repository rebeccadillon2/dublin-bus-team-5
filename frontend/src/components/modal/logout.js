import React from "react";
import { useNavigate } from "react-router-dom";

import { Modal, ModalHeader } from ".";
import { PrimaryButton } from "../elements/button";

export function LogoutModal(props) {
  const { open, setOpen, handleClose, ...rest } = props;

  const navigate = useNavigate();

  const handleLogout = () => {
    const inner = async () => {
      await window.localStorage.removeItem("token");
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    };
    try {
      inner();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal modalOpen={open} setModalOpen={setOpen}>
      <div {...rest}>
        <ModalHeader
          title='Are you sure you want to logout?'
          subtitle='When you logout you will still have full access to all bus related functionality.'
        />
        <div className='mt-5 sm:mt-6'>
          <PrimaryButton onClick={handleLogout} type='large'>
            Logout
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}
