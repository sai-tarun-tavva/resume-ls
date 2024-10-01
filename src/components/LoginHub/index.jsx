import { useTargetCount } from "../../hooks";
import WelcomePanel from "./WelcomePanel";
import AuthPanel from "./AuthPanel";
import Loader from "../Atoms/Loader";
import classes from "./index.module.scss";

/**
 * LoginHub Component
 *
 * Responsible for rendering the login page. It displays a loading indicator while fetching
 * the target count (using the `useTargetCount` hook) and then shows the welcome panel and authentication panel.
 *
 * @returns {JSX.Element} The LoginHub component containing either a Loader (while fetching) or the login page content.
 */
const LoginHub = () => {
  // Fetch target count and loading state using the custom hook
  const { targetCount, isLoading } = useTargetCount();

  // Render loader while fetching data, then render panels
  return isLoading ? (
    <Loader />
  ) : (
    <div className={classes.loginHub}>
      <WelcomePanel targetCount={targetCount} />
      <AuthPanel />
    </div>
  );
};

LoginHub.displayName = "LoginHub";

export default LoginHub;
