import React from "react";
import { LoginForm } from "../auth";
import { FormHeader } from "../elements/form";
import { PageContainer, AuthContainer } from "../container";

export default function Login() {
  return (
    <PageContainer>
      <AuthContainer>
        <FormHeader title={"Login"} />
        <LoginForm />
      </AuthContainer>
    </PageContainer>
  );
}
