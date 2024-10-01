import LoginHub from "../../components/LoginHub";

/**
 * Login Component
 *
 * Serves as the entry point for user authentication.
 * It renders the LoginHub component to manage user login functionality.
 *
 * @returns {JSX.Element} The rendered Login component.
 */
const Login = () => {
  return <LoginHub />;
};

Login.displayName = "Login";
export default Login;
