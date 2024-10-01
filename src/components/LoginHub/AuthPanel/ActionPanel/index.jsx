import { useState } from "react";
import AuthForm from "./AuthForm";
import { content } from "../../../../constants";
import classes from "./index.module.css";

/**
 * ActionPanel Component
 *
 * Switches between the login and sign-up forms.
 * It toggles the display of the authentication form based on the user's current action.
 *
 * @returns {JSX.Element} The rendered ActionPanel component.
 */
const ActionPanel = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and sign-up
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
