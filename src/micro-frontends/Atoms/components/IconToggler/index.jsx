import PropTypes from "prop-types";
import classes from "./index.module.scss";

/**
 * IconToggler Component
 *
 * A toggle button that displays a primary and secondary icon, switching based on toggle mode.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.toggleMode - The current toggle state (true for secondary mode, false for primary).
 * @param {function} props.clickHandler - Function to call when the toggle button is clicked.
 * @param {React.ReactNode} props.primaryIcon - The primary icon to display in non-toggled state.
 * @param {React.ReactNode} props.secondaryIcon - The secondary icon to display in toggled state.
 * @returns {JSX.Element} The IconToggler component.
 */
const IconToggler = ({
  toggleMode,
  clickHandler,
  primaryIcon,
  secondaryIcon,
}) => {
  return (
    <div className={classes.toggleContainer}>
      <button
        className={`${classes.toggleButton} ${
          toggleMode ? classes.secondMode : undefined
        }`}
        onClick={clickHandler}
      >
        <div className={classes.backgroundIcons}>
          {primaryIcon}
          {secondaryIcon}
        </div>
        <div className={classes.slidingOverlay}>
          {toggleMode ? secondaryIcon : primaryIcon}
        </div>
      </button>
    </div>
  );
};

IconToggler.propTypes = {
  toggleMode: PropTypes.bool.isRequired,
  clickHandler: PropTypes.func.isRequired,
  primaryIcon: PropTypes.node.isRequired,
  secondaryIcon: PropTypes.node.isRequired,
};

IconToggler.displayName = "IconToggler";
export default IconToggler;
