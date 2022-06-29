import React from "react";
import { SignupForm } from "../components/auth";
import { AuthContainer, PageContainer } from "../components/container";
import { FormHeader } from "../components/elements/form";

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
