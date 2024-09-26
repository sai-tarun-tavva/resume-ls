import React, { useState } from "react";
import Input from "../../../Atoms/Input";
import Button from "../../../Atoms/Button";
import { useInput } from "../../../../hooks/useInput";
import { loginValidations } from "../../../../utilities/validation";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./index.module.css";

const LoginForm = () => {
  const {
    value: userNameValue,
    handleInputChange: handleUserNameChange,
    handleInputBlur: handleUserNameBlur,
    error: userNameError,
  } = useInput("", loginValidations.userName);

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    error: passwordError,
  } = useInput("", loginValidations.password);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {};

  return (
    <form className={styles["login-form"]}>
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

      <Button
        title="Login"
        className={styles["login-button"]}
        onClick={handleLogin}
      >
        Login
      </Button>
    </form>
  );
};

LoginForm.displayName = "LoginForm";
export default LoginForm;
