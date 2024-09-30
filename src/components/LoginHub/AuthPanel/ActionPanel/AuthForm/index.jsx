import { useEffect, useState } from "react";
import { useInput } from "../../../../../hooks";
import Input from "../../../../Atoms/Input";
import Button from "../../../../Atoms/Button";
import { loginValidations, signupValidations } from "../../../../../utilities";
import { content } from "../../../../../constants";
import "bootstrap-icons/font/bootstrap-icons.css";
import classes from "./index.module.css";

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
    <form className={classes.authForm}>
      <Input
        id="userName"
        name="userName"
        value={userNameValue}
        placeholder={content.authPage.authPanel.placeholders.username}
        autoComplete="username"
        onChange={handleUserNameChange}
        onBlur={handleUserNameBlur}
        error={userNameError}
      />

      <Input
        id="password"
        name="password"
        type={showPassword ? "text" : "password"}
        value={passwordValue}
        placeholder={content.authPage.authPanel.placeholders.password}
        autoComplete={haveAccount ? "current-password" : "new-password"}
        onChange={handlePasswordChange}
        onBlur={handlePasswordBlur}
        error={passwordError}
      >
        <span onClick={togglePasswordVisibility} className={classes.viewIcon}>
          {showPassword ? (
            <i className="bi bi-eye-slash"></i>
          ) : (
            <i className="bi bi-eye"></i>
          )}
        </span>
      </Input>

      {!haveAccount && (
        <Input
          id="email"
          name="email"
          type="email"
          value={emailValue}
          placeholder={content.authPage.authPanel.placeholders.email}
          autoComplete="email"
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          error={emailError}
        />
      )}

      <Button
        title={
          haveAccount
            ? content.authPage.authPanel.buttons.login.default
            : content.authPage.authPanel.buttons.signUp.default
        }
        className={`${classes.authButton} loading`}
        onClick={handleAuth}
      >
        {haveAccount
          ? content.authPage.authPanel.buttons.login.default
          : content.authPage.authPanel.buttons.signUp.default}
      </Button>
    </form>
  );
};

AuthForm.displayName = "AuthForm";
export default AuthForm;
