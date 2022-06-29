import React from "react";
import { PageContainer } from "../components/container";
import DangerSettings from "./Danger";
import GeneralSettings from "./General";

export default function Account() {
  return (
    <PageContainer>
      <div className='flex flex-col items-center justify-center'>
        <GeneralSettings />
        <DangerSettings />
      </div>
    </PageContainer>
  );
}
