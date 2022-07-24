import React from "react";
import { CgArrowRight } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

import { Modal, ModalHeader } from "../modal";
import { PrimaryButton } from "../elements/button";

export function WordleModal(props) {
  const { turn, open, setOpen, solution, isCorrect, handleStartOver, ...rest } =
    props;

  const navigate = useNavigate();
  const title = isCorrect ? "You got it!" : "You didn't get it!";
  const subtitle = isCorrect ? "" : `The correct answer was: ${solution}`;

  return (
    <Modal modalOpen={open} setModalOpen={setOpen}>
      <div {...rest}>
        <ModalHeader title={title} subtitle={subtitle} />
        <div
          onClick={() => navigate("/")}
          className='flex items-center justify-center text-primary-blue text-center cursor-pointer'
        >
          <p className='text-sm '>Back to journey</p>
          <CgArrowRight />
        </div>
        <div className='flex items-center justify-center mt-5 sm:mt-6'>
          <PrimaryButton onClick={handleStartOver} type='large'>
            Play again
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}
