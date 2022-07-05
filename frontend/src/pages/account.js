import React, { useContext } from "react";

import { PageContainer } from "../components/container";
import {
  DangerSettings,
  ProfileSettings,
  GeneralSettings,
} from "../components/account";

export function Account() {
  return (
    <PageContainer>
      <div className='flex flex-col items-center justify-center'>
        <GeneralSettings />
        <ProfileSettings />
        <DangerSettings />
      </div>
    </PageContainer>
  );
}
