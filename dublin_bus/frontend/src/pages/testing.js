import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MobileSidePanel } from "../components/sidepanel";
import { getMLPrediction } from "../lib/api";

export function Testing() {
  const [openSidePanel, setOpenSidePanel] = useState(false);

  const handlePrediction = async () => {
    try {
      const res = await getMLPrediction();
      console.log("res", res);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSidePanelClose = () => {
    setOpenSidePanel(false);
  };

  return (
    <>
      <div>
        <button
          onClick={handlePrediction}
          className='p-2 rounded-lg bg-primary-blue m-4'
        >
          Get prediction
        </button>
        <div className='pr-2' onClick={() => setOpenSidePanel(true)}>
          <GiHamburgerMenu />
        </div>
      </div>
      <MobileSidePanel
        open={openSidePanel}
        setOpen={setOpenSidePanel}
        handleClose={handleSidePanelClose}
      />
    </>
  );
}
