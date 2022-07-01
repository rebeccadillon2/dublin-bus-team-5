import React from "react";

import DangerSettings from "./Danger";
import ProfileSettings from "./Profile";
import GeneralSettings from "./General";
import { PageContainer } from "../container";

export default function Account() {
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
