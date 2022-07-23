import React from "react";

import { Modal, ModalHeader } from "../modal";
import { PrimaryButton } from "../elements/button";

export function WordleModal(props) {
  const { turn, open, setOpen, solution, isCorrect, handleStartOver, ...rest } =
    props;
  const title = isCorrect ? "You got it!" : "You didn't get it!";
  const subtitle = isCorrect ? "" : `The correct answer was: ${solution}`;

  return (
    <Modal modalOpen={open} setModalOpen={setOpen}>
      <div {...rest}>
        <ModalHeader title={title} subtitle={subtitle} />
        <div className='mt-5 sm:mt-6'>
          <PrimaryButton onClick={handleStartOver} type='large'>
            Play again
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}
