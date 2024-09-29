import { useTargetCount } from "../../hooks";
import WelcomePanel from "./WelcomePanel";
import AuthPanel from "./AuthPanel";
import Loader from "../Atoms/Loader";
import classes from "./index.module.css";

const LoginHub = () => {
  const { targetCount, isLoading } = useTargetCount(); // Use the custom hook

  return isLoading ? (
    <Loader />
  ) : (
    <div className={classes["login-hub"]}>
      <WelcomePanel targetCount={targetCount} />
      <AuthPanel />
    </div>
  );
};

LoginHub.displayName = "LoginHub";
export default LoginHub;
