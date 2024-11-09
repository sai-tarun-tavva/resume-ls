import PropTypes from "prop-types";
import classes from "./index.module.scss";

/**
 * InputV1 Component
 *
 * Renders a styled input field with optional icons and an error message.
 *
 * @param {Object} props - The component props.
 * @param {string} props.id - The id of the input element.
 * @param {string} [props.error] - Error message to display if validation fails.
 * @param {React.ReactNode} [props.leftIcon] - Icon to be displayed on the left side of the input.
 * @param {React.ReactNode} [props.rightIcon] - Icon to be displayed on the right side of the input.
 * @param {function} [props.rightIconOnClick] - Callback function for the right icon click.
 * @param {string} [props.extraClassControl] - Additional CSS classes to apply to the input control.
 * @param {React.ReactNode} [props.children] - Additional content to display inside the input control.
 * @returns {JSX.Element} The InputV1 component.
 */
const InputV1 = ({
  id,
  error,
  leftIcon,
  rightIcon,
  rightIconOnClick,
  extraClassControl = "",
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

InputV1.propTypes = {
  id: PropTypes.string.isRequired,
  error: PropTypes.string,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  rightIconOnClick: PropTypes.func,
  extraClassControl: PropTypes.string,
  children: PropTypes.node,
};

InputV1.displayName = "InputVersion1";
export default InputV1;
