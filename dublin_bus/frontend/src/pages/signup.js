import React from "react";
import { SignupForm } from "../components/auth";
import { FormHeader } from "../components/elements/form";
import { AuthContainer, PageContainer } from "../components/container";

export function Signup() {
  return (
    <PageContainer>
      <AuthContainer>
        <FormHeader title={"Signup"} />
        <SignupForm />
      </AuthContainer>
    </PageContainer>
  );
}
