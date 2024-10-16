import PropTypes from "prop-types";
import classes from "./index.module.scss";

/**
 * InputV1 Component
 *
 * Renders a styled input field with optional icons and error message.
 *
 * @param {string} id - The id of the input element.
 * @param {string} error - Error message to be displayed if validation fails.
 * @param {React.ReactNode} leftIcon - Icon to be displayed on the left side of the input.
 * @param {React.ReactNode} rightIcon - Icon to be displayed on the right side of the input.
 * @param {function} rightIconOnClick - Callback function to be called when the right icon is clicked.
 * @param {string} extraClassControl - Additional CSS classes to apply to the input control.
 * @param {object} props - Additional props to be passed to the input element.
 * @returns {JSX.Element} The rendered InputV1 component.
 */
const InputV1 = ({
  id,
  error,
  leftIcon,
  rightIcon,
  rightIconOnClick,
  extraClassControl,
  children,
  ...props
}) => {
  return (
    <div
      className={`${classes.control} ${extraClassControl} ${
        error ? classes.error : ""
      }`}
    >
      {leftIcon && <span className={classes.leftIcon}>{leftIcon}</span>}
      <input id={id} {...props} />
      {children}

      <div className={classes.controlError}>{error && <p>{error}</p>}</div>

      {rightIcon && (
        <span onClick={rightIconOnClick} className={classes.rightIcon}>
          {rightIcon}
        </span>
      )}
    </div>
  );
};

InputV1.displayName = "InputVersion1";

InputV1.propTypes = {
  id: PropTypes.string.isRequired,
  error: PropTypes.string,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  rightIconOnClick: PropTypes.func,
  extraClassControl: PropTypes.string,
  children: PropTypes.node,
};

export default InputV1;
