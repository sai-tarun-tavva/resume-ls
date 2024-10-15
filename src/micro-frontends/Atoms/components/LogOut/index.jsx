import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "../Button";
import { handleLogout as logout } from "../../../../utilities";
import classes from "./index.module.scss";

/**
 * Logout Component
 *
 * Handles the logout action.
 * It will be executed when the button is clicked.
 *
 * @returns {JSX.Element} - Rendered logout button component
 */
const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate(`/`);
  };

  return (
    <Button className={classes.logout} title="Log Out" onClick={handleLogout}>
      <i className="bi bi-box-arrow-left"></i>
    </Button>
  );
};

Logout.displayName = "Logout";

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Logout;
