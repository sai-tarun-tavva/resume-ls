import React from "react";
import WelcomePanel from "./WelcomePanel";
import AuthPanel from "./AuthPanel";
import styles from "./index.module.css";
import { useTargetCount } from "../../hooks/useTargetCount";
import Loader from "../Atoms/Loader";

const LoginHub = () => {
  const { targetCount, isLoading } = useTargetCount(); // Use the custom hook

  return isLoading ? (
    <Loader />
  ) : (
    <div className={styles["login-hub"]}>
      <WelcomePanel targetCount={targetCount} />
      <AuthPanel />
    </div>
  );
};

LoginHub.displayName = "LoginHub";
export default LoginHub;
