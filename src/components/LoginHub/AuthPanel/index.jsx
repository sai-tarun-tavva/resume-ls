import ActionPanel from "./ActionPanel";
import classes from "./index.module.css";

const AuthPanel = () => {
  return (
    <div className={classes.authPanel}>
      <ActionPanel />
    </div>
  );
};

AuthPanel.displayName = "AuthPanel";
export default AuthPanel;
