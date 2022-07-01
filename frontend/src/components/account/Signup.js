import React from "react";
import { SignupForm } from "../auth";
import { AuthContainer, PageContainer } from "../container";
import { FormHeader } from "../elements/form";

export default function Signup() {
  return (
    <PageContainer>
      <AuthContainer>
        <FormHeader title={"Signup"} />
        <SignupForm />
      </AuthContainer>
    </PageContainer>
  );
}
