import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useInput } from "../../../../../hooks";
import Input from "../../../../../atoms/Input";
import Button from "../../../../../atoms/Button";
import { loadingActions, statusActions } from "../../../../../store";
import {
  authenticateUser,
  authValidations,
  resetStatusAsync,
} from "../../../../../utilities";
import {
  CONTENT,
  END_POINTS,
  ROUTES,
  STATUS_CODES,
} from "../../../../../constants";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isButtonLoading: isLoading } = useSelector((state) => state.loading);

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

  const buttonText = isLoading
    ? haveAccount
      ? CONTENT.authPage.authPanel.buttons.login.loading
      : CONTENT.authPage.authPanel.buttons.signUp.loading
    : haveAccount
    ? CONTENT.authPage.authPanel.buttons.login.default
    : CONTENT.authPage.authPanel.buttons.signUp.default;

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
  const handleAuth = async (event) => {
    event.preventDefault();
    if (isLoading) return;
    await dispatch(resetStatusAsync(statusActions.resetStatus));

    if (!enableAuth) {
      forceUserNameValidations();
      forcePasswordValidations();
      !haveAccount && forceEmailValidations();
      return;
    }

    dispatch(loadingActions.enableButtonLoading());

    const formData = new FormData();
    formData.append("username", userNameValue);
    formData.append("password", passwordValue);
    if (!haveAccount) {
      formData.append("email", emailValue);
    }

    if (haveAccount) {
      const { status, data } = await authenticateUser(
        END_POINTS.LOGIN,
        formData
      );

      if (status === STATUS_CODES.SUCCESS) {
        localStorage.setItem("refreshToken", data.data.refresh); // For persistent storage
        sessionStorage.setItem("accessToken", data.data.access); // Or store in memory/state
        navigate(`/${ROUTES.HOME}`, { replace: true });
      } else if (status === STATUS_CODES.INVALID) {
        dispatch(
          statusActions.updateStatus({
            message: CONTENT.authPage.authPanel.errors.server.login,
            type: "failure",
            darkMode: true,
          })
        );
      } else {
        dispatch(
          statusActions.updateStatus({
            message: CONTENT.serverError,
            type: "failure",
            darkMode: true,
          })
        );
      }
    } else {
      const { status, data } = await authenticateUser(
        END_POINTS.SIGN_UP,
        formData
      );

      if (status === STATUS_CODES.CREATED) {
        localStorage.setItem("refreshToken", data.data.refresh); // For persistent storage
        sessionStorage.setItem("accessToken", data.data.access); // Or store in memory/state
        navigate(`/${ROUTES.HOME}`, { replace: true });
      } else if (status === STATUS_CODES.INVALID) {
        dispatch(
          statusActions.updateStatus({
            message: CONTENT.authPage.authPanel.errors.server.signUp,
            type: "failure",
            darkMode: true,
          })
        );
      } else {
        dispatch(
          statusActions.updateStatus({
            message: CONTENT.serverError,
            type: "failure",
            darkMode: true,
          })
        );
      }
    }

    dispatch(loadingActions.disableButtonLoading());
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
        placeholder={CONTENT.authPage.authPanel.placeholders.username}
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
        placeholder={CONTENT.authPage.authPanel.placeholders.password}
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
          placeholder={CONTENT.authPage.authPanel.placeholders.email}
          autoComplete="email"
          value={emailValue}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          error={emailError}
          leftIcon={<i className="bi bi-envelope-fill"></i>}
        />
      )}

      <Button
        title={buttonText}
        className={`${classes.authButton} ${isLoading ? "loading" : ""}`}
        onClick={handleAuth}
      >
        {buttonText}
      </Button>
    </form>
  );
};

AuthForm.displayName = "AuthForm";

AuthForm.propTypes = {
  haveAccount: PropTypes.bool.isRequired,
};

export default AuthForm;
