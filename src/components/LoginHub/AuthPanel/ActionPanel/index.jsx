import React, { useState } from "react";
import LoginForm from "../LoginForm";
import SignUpForm from "../SignUpForm";
import styles from "./index.module.css";

const ActionPanel = () => {
  const [haveAccount, setHaveAccount] = useState(true);

  return (
    <div className={styles["action-panel"]}>
      {haveAccount && <LoginForm />}
      {!haveAccount && <SignUpForm />}
      <p onClick={() => setHaveAccount((prevValue) => !prevValue)}>
        {haveAccount
          ? "New here? Create an Account!"
          : "Have an account? Login!"}
      </p>
    </div>
  );
};

ActionPanel.displayName = "ActionPanel";
export default ActionPanel;
