import LoginHub from "../../micro-frontends/Welcome/components/LoginHub";

/**
 * Welcome Component
 *
 * Serves as the entry point for user authentication.
 * It renders the LoginHub component to manage user login functionality.
 *
 * @returns {JSX.Element} The rendered Welcome component.
 */
const Welcome = () => {
  return <LoginHub />;
};

Welcome.displayName = "Welcome";
export default Welcome;
