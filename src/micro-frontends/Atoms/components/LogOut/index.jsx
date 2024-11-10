import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { handleLogout as logout } from "../../../../utilities";
import classes from "./index.module.scss";

/**
 * Logout Component
 *
 * Renders a button that triggers the logout action and navigates to the home page.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional CSS class for the button styling.
 * @returns {JSX.Element} The rendered logout button component.
 */
const Logout = ({ className = "" }) => {
  const navigate = useNavigate();

  /**
   * Logs the user out and redirects to the home page.
   *
   * Calls the logout function to perform necessary logout actions,
   * then uses navigate to redirect the user to the home page.
   */
  const handleLogout = () => {
    logout();
    navigate(`/`);
  };

  return (
    <Button
      className={`${classes.logout} ${className}`}
      title="Log Out"
      onClick={handleLogout}
    >
      <i className="bi bi-box-arrow-left"></i>
    </Button>
  );
};

Logout.propTypes = {
  className: PropTypes.string,
};

Logout.displayName = "Logout";
export default Logout;
