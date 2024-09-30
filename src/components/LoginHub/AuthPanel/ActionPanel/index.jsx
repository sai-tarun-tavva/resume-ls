import { useState } from "react";
import AuthForm from "./AuthForm";
import { content } from "../../../../constants";
import classes from "./index.module.css";

const ActionPanel = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, signUp } = content.authPage.authPanel.advisor;

  return (
    <div className={classes.actionPanel}>
      <AuthForm haveAccount={isLogin} />
      <p onClick={() => setIsLogin((prevValue) => !prevValue)}>
        {isLogin ? login : signUp}
      </p>
    </div>
  );
};

ActionPanel.displayName = "ActionPanel";
export default ActionPanel;
