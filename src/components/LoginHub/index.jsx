import React from "react";
import WelcomePanel from "./WelcomePanel";
import AuthPanel from "./AuthPanel";
import styles from "./index.module.css";

const LoginHub = () => {
  return (
    <div className={styles["login-hub"]}>
      <WelcomePanel />
      <AuthPanel />
    </div>
  );
};

LoginHub.displayName = "LoginHub";
export default LoginHub;
