import React, { useContext } from "react";
import { CgArrowRight } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

import { Modal, ModalHeader } from "../modal";
import { PrimaryButton } from "../elements/button";
import { MapContainerContext, MapDetailsContext } from "../../App";

export function WordleModal(props) {
  const {
    turn,
    open,
    setOpen,
    solution,
    isCorrect,
    handleStartOver,
    coords,
    ...rest
  } = props;
  const navigate = useNavigate();
  const { mapContainerType, setMapContainerType } =
    useContext(MapContainerContext);
  const { mapDetails, setMapDetails } = useContext(MapDetailsContext);
  const formattedSolution = solution[0].toUpperCase() + solution.slice(1);

  const title = isCorrect ? "You got it!" : "You didn't get it!";
  const subtitle = isCorrect
    ? ""
    : `The correct answer was: ${formattedSolution}`;

  const handleAddToMap = () => {
    setMapContainerType({ type: "default", place: null });
    setMapDetails({
      ...mapDetails,
      markers: [...mapDetails.markers, coords],
    });

    navigate("/");
  };

  return (
    <Modal modalOpen={open} setModalOpen={setOpen}>
      <div {...rest}>
        <ModalHeader title={title} subtitle={subtitle} />
        <div
          onClick={handleAddToMap}
          className='flex items-center justify-center text-primary-blue text-center cursor-pointer my-1'
        >
          <p className='text-sm '>{`View ${formattedSolution} ${
            solution === "spire" ? "" : "Street"
          } on map`}</p>
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
