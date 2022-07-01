import React, { useState } from "react";

import { useTheme } from "../../hooks";
import { DeleteModal } from "../modal";
import { AccountSection, Card } from "../container";
import { DestructiveButton } from "../elements/button";

export function DangerSettings() {
  const [isDarkMode] = useTheme();
  const [deletetModalOpen, setDeleteModalOpen] = useState(false);

  const handleClose = () => {
    setDeleteModalOpen(false);
  };

  return (
    <AccountSection title='Danger Zone'>
      <Card isFirst={true} isLast={true}>
        <div className='pr-10'>
          <p
            className={`${
              isDarkMode ? "text-primary-white" : "text-primary-black"
            }`}
          >
            Delete Account
          </p>
          <p className='text-sm'>
            Once you delete your account, your data will be permanently deleted.
          </p>
        </div>
        <DestructiveButton
          type='action'
          onClick={() => setDeleteModalOpen(true)}
        >
          Delete
        </DestructiveButton>
      </Card>
      <DeleteModal
        open={deletetModalOpen}
        handleClose={handleClose}
        setOpen={setDeleteModalOpen}
      />
    </AccountSection>
  );
}
