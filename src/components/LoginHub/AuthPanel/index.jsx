import React from "react";
import ActionPanel from "./ActionPanel";
import styles from "./index.module.css";

const AuthPanel = () => {
  return (
    <div className={styles["auth-panel"]}>
      <ActionPanel />
    </div>
  );
};

AuthPanel.displayName = "AuthPanel";
export default AuthPanel;
