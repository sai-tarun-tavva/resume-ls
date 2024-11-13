import { Helmet } from "react-helmet-async";
import LoginHub from "../../micro-frontends/Welcome/components/LoginHub";
import { CONTENT } from "../../constants";

/**
 * Welcome Component
 *
 * Serves as the entry point for user authentication, providing a seamless
 * user experience by rendering the LoginHub component. The LoginHub manages
 * the login process, handling user inputs and validation within a contained interface.
 *
 * @component
 * @returns {JSX.Element} A component that displays the LoginHub for user authentication.
 */
const Welcome = () => {
  return (
    <>
      <Helmet>
        <title>{CONTENT.COMMON.pageTitles.welcome}</title>
      </Helmet>
      <LoginHub />
    </>
  );
};

Welcome.displayName = "Welcome";
export default Welcome;
