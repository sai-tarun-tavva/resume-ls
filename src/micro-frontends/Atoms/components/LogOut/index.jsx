import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { handleLogout as logout } from "../../../../utilities";
import classes from "./index.module.scss";

/**
 * Logout Component
 *
 * Handles the logout action.
 * It will be executed when the button is clicked.
 *
 * @param {String} - Extra className to be applied for button.
 * @returns {JSX.Element} - Rendered logout button component
 */
const Logout = ({ className }) => {
  const navigate = useNavigate();
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

Logout.displayName = "Logout";
export default Logout;
