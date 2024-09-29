import { useState } from "react";
import AuthForm from "./AuthForm";
import classes from "./index.module.css";

const ActionPanel = () => {
  const [haveAccount, setHaveAccount] = useState(true);

  return (
    <div className={classes["action-panel"]}>
      <AuthForm haveAccount={haveAccount} />
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
