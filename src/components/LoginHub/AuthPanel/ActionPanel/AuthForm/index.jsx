import React, { useEffect, useState } from "react";
import Input from "../../../../Atoms/Input";
import Button from "../../../../Atoms/Button";
import { useInput } from "../../../../../hooks/useInput";
import {
  loginValidations,
  signupValidations,
} from "../../../../../utilities/validation";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./index.module.css";

const AuthForm = ({ haveAccount }) => {
  const {
    value: userNameValue,
    handleInputChange: handleUserNameChange,
    handleInputBlur: handleUserNameBlur,
    resetValue: resetUserName,
    error: userNameError,
    forceValidations: forceUserNameValidations,
  } = useInput("", loginValidations.userName, undefined, true);

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    resetValue: resetPassword,
    error: passwordError,
    forceValidations: forcePasswordValidations,
  } = useInput("", loginValidations.password, undefined, true);

  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    resetValue: resetEmail,
    error: emailError,
    forceValidations: forceEmailValidations,
  } = useInput("", signupValidations.email, undefined, true);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Utility function to check for validation errors
  const hasValidationErrors = () => {
    return [userNameError, passwordError, !haveAccount && emailError].some(
      Boolean
    );
  };

  const enableAuth =
    userNameValue !== "" &&
    passwordValue !== "" &&
    !hasValidationErrors() &&
    (!haveAccount ? emailValue !== "" : true);

  const handleAuth = (event) => {
    event.preventDefault();

    if (!enableAuth) {
      forceUserNameValidations();
      forcePasswordValidations();
      !haveAccount && forceEmailValidations();
      return;
    }

    const formData = {
      userName: userNameValue,
      passwordValue: passwordValue,
      ...(!haveAccount && { email: emailValue }),
    };

    console.log(formData);
  };

  useEffect(() => {
    resetUserName();
    resetPassword();
    haveAccount && resetEmail();
  }, [haveAccount, resetUserName, resetPassword, resetEmail]);

  return (
    <form className={styles["auth-form"]}>
      <Input
        label="user name"
        id="userName"
        name="userName"
        value={userNameValue}
        autoComplete="username"
        onChange={handleUserNameChange}
        onBlur={handleUserNameBlur}
        error={userNameError}
      />

      <Input
        label="password"
        id="password"
        name="password"
        type={showPassword ? "text" : "password"}
        value={passwordValue}
        autoComplete={haveAccount ? "current-password" : "new-password"}
        onChange={handlePasswordChange}
        onBlur={handlePasswordBlur}
        error={passwordError}
      >
        <span
          onClick={togglePasswordVisibility}
          className={styles["view-icon"]}
        >
          {showPassword ? (
            <i className="bi bi-eye-slash"></i>
          ) : (
            <i className="bi bi-eye"></i>
          )}
        </span>
      </Input>

      {!haveAccount && (
        <Input
          label="email"
          id="email"
          name="email"
          type="email"
          value={emailValue}
          autoComplete="email"
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          error={emailError}
        />
      )}

      <Button
        title={haveAccount ? "Login" : "Sign Up"}
        className={`${styles["auth-button"]} loading`}
        onClick={handleAuth}
      >
        {haveAccount ? "Login" : "Sign Up"}
      </Button>
    </form>
  );
};

AuthForm.displayName = "AuthForm";
export default AuthForm;
