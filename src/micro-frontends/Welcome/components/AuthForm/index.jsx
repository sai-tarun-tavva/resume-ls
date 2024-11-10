import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useInput } from "../../../Atoms/hooks";
import InputV1 from "../../../Atoms/components/Inputs/InputV1";
import Button from "../../../Atoms/components/Button";
import { useLoading, useStatus } from "../../../../store";
import {
  authenticateUser,
  authValidations,
  dispatchAsync,
} from "../../../../utilities";
import {
  CONTENT,
  END_POINTS,
  LOADING_ACTION_TYPES,
  ROUTES,
  STATUS_CODES,
} from "../../../../constants";
import classes from "./index.module.scss";

const { BUTTON } = LOADING_ACTION_TYPES;

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
  const navigate = useNavigate();
  const { isLoading, enableButtonLoading, disableButtonLoading } = useLoading();
  const { updateStatus, resetStatus } = useStatus();

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

  const buttonText = isLoading[BUTTON]
    ? haveAccount
      ? CONTENT.WELCOME.authPanel.buttons.login.loading
      : CONTENT.WELCOME.authPanel.buttons.signUp.loading
    : haveAccount
    ? CONTENT.WELCOME.authPanel.buttons.login.default
    : CONTENT.WELCOME.authPanel.buttons.signUp.default;

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
    if (isLoading[BUTTON]) return;
    await dispatchAsync(resetStatus);

    if (!enableAuth) {
      forceUserNameValidations();
      forcePasswordValidations();
      !haveAccount && forceEmailValidations();
      return;
    }

    enableButtonLoading();

    const formData = new FormData();
    formData.append("username", userNameValue.trim());
    formData.append("password", passwordValue.trim());
    if (!haveAccount) {
      formData.append("email", emailValue.trim());
    }

    if (haveAccount) {
      const { status, data } = await authenticateUser(
        END_POINTS.WELCOME.LOGIN,
        formData
      );

      if (status === STATUS_CODES.SUCCESS) {
        localStorage.setItem("refreshToken", data.data.refresh); // For persistent storage
        sessionStorage.setItem("accessToken", data.data.access); // Or store in memory/state
        navigate(`/${ROUTES.INSIGHT.HOME}`, { replace: true });
      } else if (status === STATUS_CODES.INVALID) {
        updateStatus({
          message: CONTENT.WELCOME.statusMessages.login,
          type: "failure",
          darkMode: true,
        });
      } else {
        updateStatus({
          message: CONTENT.COMMON.serverError,
          type: "failure",
          darkMode: true,
        });
      }
    } else {
      const { status, data } = await authenticateUser(
        END_POINTS.WELCOME.SIGN_UP,
        formData
      );

      if (status === STATUS_CODES.CREATED) {
        localStorage.setItem("refreshToken", data.data.refresh); // For persistent storage
        sessionStorage.setItem("accessToken", data.data.access); // Or store in memory/state
        navigate(`/${ROUTES.INSIGHT.HOME}`, { replace: true });
      } else if (status === STATUS_CODES.INVALID) {
        updateStatus({
          message: CONTENT.WELCOME.statusMessages.signUp,
          type: "failure",
          darkMode: true,
        });
      } else {
        updateStatus({
          message: CONTENT.COMMON.serverError,
          type: "failure",
          darkMode: true,
        });
      }
    }

    disableButtonLoading();
  };

  // Reset input fields when switching between login and sign-up
  useEffect(() => {
    resetUserName();
    resetPassword();
    haveAccount && resetEmail();
  }, [haveAccount, resetUserName, resetPassword, resetEmail]);

  return (
    <form className={classes.authForm}>
      <InputV1
        id="userName"
        name="userName"
        placeholder={CONTENT.WELCOME.authPanel.placeholders.username}
        autoComplete="username"
        value={userNameValue}
        onChange={handleUserNameChange}
        onBlur={handleUserNameBlur}
        error={userNameError}
        leftIcon={<i className="bi bi-person-fill"></i>}
      />

      <InputV1
        id="password"
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder={CONTENT.WELCOME.authPanel.placeholders.password}
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
        <InputV1
          id="email"
          name="email"
          type="email"
          placeholder={CONTENT.WELCOME.authPanel.placeholders.email}
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
        className={`${classes.authButton} ${
          isLoading[BUTTON] ? "loading" : ""
        }`}
        onClick={handleAuth}
      >
        {buttonText}
      </Button>
    </form>
  );
};

AuthForm.propTypes = {
  haveAccount: PropTypes.bool.isRequired,
};

AuthForm.displayName = "AuthForm";
export default AuthForm;
