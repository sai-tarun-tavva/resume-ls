import PropTypes from "prop-types";
import Button from "../../../Atoms/Button";
import classes from "./index.module.scss";

/**
 * Logout Component
 *
 * Handles the logout action.
 * It will be executed when the button is clicked.
 *
 * @param {Object} props - Component props
 * @param {function} props.onLogout - Callback function to handle logout action
 * @returns {JSX.Element} - Rendered logout button component
 */
const Logout = ({ onLogout }) => {
  return (
    <Button className={classes.logout} title="Log Out" onClick={onLogout}>
      <i className="bi bi-box-arrow-left"></i>
    </Button>
  );
};

Logout.displayName = "Logout";

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Logout;
