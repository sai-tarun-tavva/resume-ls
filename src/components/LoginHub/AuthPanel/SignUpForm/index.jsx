import React, { useState } from "react";
import Input from "../../../Atoms/Input";
import Button from "../../../Atoms/Button";
import { useInput } from "../../../../hooks/useInput";
import { signupValidations } from "../../../../utilities/validation";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./index.module.css";

const SignUpForm = () => {
  const {
    value: userNameValue,
    handleInputChange: handleUserNameChange,
    handleInputBlur: handleUserNameBlur,
    error: userNameError,
  } = useInput("", signupValidations.userName);

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    error: passwordError,
  } = useInput("", signupValidations.password);

  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    error: emailError,
  } = useInput("", signupValidations.email);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Utility function to check for validation errors
  const hasValidationErrors = () => {
    return [userNameError, passwordError, emailError].some(Boolean);
  };

  const enableSignUp =
    userNameValue !== "" &&
    passwordValue !== "" &&
    emailValue !== "" &&
    !hasValidationErrors();

  const handleSignUp = (event) => {
    event.preventDefault();

    const formData = {
      userName: userNameValue,
      passwordValue: passwordValue,
      emailValue: emailValue,
    };

    console.log(formData);
  };

  return (
    <form className={styles["signup-form"]}>
      <Input
        label="user name"
        id="userName"
        name="userName"
        value={userNameValue}
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

      <Input
        label="email"
        id="email"
        name="email"
        type="email"
        value={emailValue}
        onChange={handleEmailChange}
        onBlur={handleEmailBlur}
        error={emailError}
      />

      <Button
        title="Sign Up"
        className={styles["signup-button"]}
        onClick={handleSignUp}
        disabled={!enableSignUp}
      >
        Sign Up
      </Button>
    </form>
  );
};

SignUpForm.displayName = "SignUpForm";
export default SignUpForm;
