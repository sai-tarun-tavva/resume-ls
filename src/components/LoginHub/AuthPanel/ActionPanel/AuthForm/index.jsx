import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useInput } from "../../../../../hooks";
import Input from "../../../../Atoms/Input";
import Button from "../../../../Atoms/Button";
import { authValidations } from "../../../../../utilities";
import { content } from "../../../../../constants";
import "bootstrap-icons/font/bootstrap-icons.css";
import classes from "./index.module.scss";

/**
 * AuthForm Component
 *
 * Handles the authentication form (Login/SignUp).
 * It manages input validation, form state, and submission logic.
 *
 * @param {boolean} haveAccount - Determines if the form is for login (true) or sign-up (false).
 * @returns {JSX.Element} The rendered AuthForm component.
 */
const AuthForm = ({ haveAccount }) => {
  const {
    value: userNameValue,
    handleInputChange: handleUserNameChange,
    handleInputBlur: handleUserNameBlur,
    resetValue: resetUserName,
    error: userNameError,
    forceValidations: forceUserNameValidations,
  } = useInput("", authValidations.userName, undefined, true);

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    resetValue: resetPassword,
    error: passwordError,
    forceValidations: forcePasswordValidations,
  } = useInput("", authValidations.password, undefined, true);

  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    resetValue: resetEmail,
    error: emailError,
    forceValidations: forceEmailValidations,
  } = useInput("", authValidations.email, undefined, true);

  const [showPassword, setShowPassword] = useState(false);

  /**
   * Toggles the visibility of the password input field.
   */
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  /**
   * Checks if there are any validation errors present in the form.
   * @returns {boolean} True if there are validation errors, false otherwise.
   */
  const hasValidationErrors = () => {
    return [userNameError, passwordError, !haveAccount && emailError].some(
      Boolean
    );
  };

  /**
   * Determines if the authentication action (login/sign-up) is enabled.
   * @returns {boolean} True if the action is enabled, false otherwise.
   */
  const enableAuth =
    userNameValue !== "" &&
    passwordValue !== "" &&
    !hasValidationErrors() &&
    (!haveAccount ? emailValue !== "" : true);

  /**
   * Handles the form submission for login/sign-up.
   * Validates input fields and logs form data if valid.
   * Forces validation errors to appear if the form is incomplete or invalid.
   *
   * @param {Event} event - The form submit event.
   */
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

  // Reset input fields when switching between login and sign-up
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
        placeholder={content.authPage.authPanel.placeholders.username}
        autoComplete="username"
        value={userNameValue}
        onChange={handleUserNameChange}
        onBlur={handleUserNameBlur}
        error={userNameError}
        leftIcon={<i className="bi bi-person-fill"></i>}
      />

      <Input
        id="password"
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder={content.authPage.authPanel.placeholders.password}
        autoComplete={haveAccount ? "current-password" : "new-password"}
        value={passwordValue}
        onChange={handlePasswordChange}
        onBlur={handlePasswordBlur}
        error={passwordError}
        leftIcon={<i className="bi bi-key-fill"></i>}
        rightIcon={
          showPassword ? (
            <i className="bi bi-eye-slash"></i>
          ) : (
            <i className="bi bi-eye"></i>
          )
        }
        rightIconOnClick={togglePasswordVisibility}
      />

      {!haveAccount && (
        <Input
          id="email"
          name="email"
          type="email"
          placeholder={content.authPage.authPanel.placeholders.email}
          autoComplete="email"
          value={emailValue}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          error={emailError}
          leftIcon={<i className="bi bi-envelope-fill"></i>}
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

AuthForm.propTypes = {
  haveAccount: PropTypes.bool.isRequired,
};

export default AuthForm;
