import PropTypes from "prop-types";
import classes from "./index.module.scss";

/**
 * FloatingButton Component
 *
 * A floating action button that displays an icon and triggers an action on click.
 * Can accept additional CSS classes for custom styling.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title or tooltip text for the button.
 * @param {function} props.clickHandler - Function to call when the button is clicked.
 * @param {JSX.Element} props.icon - The icon to display inside the button.
 * @param {string} [props.extraClass] - Optional additional CSS classes for custom styling.
 * @returns {JSX.Element} The FloatingButton component.
 */
const FloatingButton = ({ title, clickHandler, icon, extraClass }) => {
  return (
    <button
      className={`${classes.floatingButton} floating-button-global ${extraClass}`}
      title={title}
      onClick={clickHandler}
    >
      {icon}
    </button>
  );
};

FloatingButton.propTypes = {
  title: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  icon: PropTypes.element.isRequired,
  extraClass: PropTypes.string,
};

FloatingButton.displayName = "FloatingButton";
export default FloatingButton;
