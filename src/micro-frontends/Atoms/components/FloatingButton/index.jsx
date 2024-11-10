import PropTypes from "prop-types";
import Button from "../Button";
import classes from "./index.module.scss";

/**
 * FloatingButton Component
 *
 * A floating action button that displays an icon and triggers an action on click.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title or tooltip text for the button.
 * @param {function} props.clickHandler - Function to call when the button is clicked.
 * @param {JSX.Element} props.icon - The icon to display inside the button.
 * @returns {JSX.Element} The FloatingButton component.
 */
const FloatingButton = ({ title, clickHandler, icon }) => {
  return (
    <Button
      className={`${classes.floatingButton} floating-button-global`}
      title={title}
      onClick={clickHandler}
    >
      {icon}
    </Button>
  );
};

FloatingButton.propTypes = {
  title: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  icon: PropTypes.element.isRequired,
};

FloatingButton.displayName = "FloatingButton";
export default FloatingButton;
