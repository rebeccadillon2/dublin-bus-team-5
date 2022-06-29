import React from "react";
import { LoginForm } from "../components/auth";
import { FormHeader } from "../components/elements/form";
import { PageContainer, AuthContainer } from "../components/container";

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
