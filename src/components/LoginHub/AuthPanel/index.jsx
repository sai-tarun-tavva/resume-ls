import ActionPanel from "./ActionPanel";
import classes from "./index.module.css";

/**
 * AuthPanel Component
 *
 * Responsible for rendering the authentication panel.
 * It contains the ActionPanel component where users can log in or sign up.
 *
 * @returns {JSX.Element} The rendered AuthPanel component.
 */
const AuthPanel = () => {
  return (
    <div className={classes.authPanel}>
      <ActionPanel />
    </div>
  );
};

AuthPanel.displayName = "AuthPanel";

export default AuthPanel;
