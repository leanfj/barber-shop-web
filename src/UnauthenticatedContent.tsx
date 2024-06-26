import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { SingleCard } from "./layouts";
import {
  LoginForm,
  ResetPasswordForm,
  ChangePasswordForm,
  CreateAccountForm,
  ActivationAccount,
} from "./components";

export default function UnauthenticatedContent(): JSX.Element {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <SingleCard title="Sign In">
            <LoginForm />
          </SingleCard>
        }
      />
      <Route
        path="/create-account"
        element={
          <SingleCard title="Sign Up">
            <CreateAccountForm />
          </SingleCard>
        }
      />
      <Route
        path="/reset-password"
        element={
          <SingleCard
            title="Reset Password"
            description="Please enter the email address that you used to register, and we will send you a link to reset your password via Email."
          >
            <ResetPasswordForm />
          </SingleCard>
        }
      />
      <Route
        path="/change-password"
        element={
          <SingleCard title="Change Password">
            <ChangePasswordForm />
          </SingleCard>
        }
      />
      <Route
        path="/activation"
        element={
          <SingleCard title="Acitivation Account">
            <ActivationAccount />
          </SingleCard>
        }
      />

      <Route path="*" element={<Navigate to={"/login"} />}></Route>
    </Routes>
  );
}
