import PropTypes from "prop-types";
import classes from "./index.module.css";

const Button = ({
  children,
  onClick = () => {},
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`${classes.button} ${className || ""}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

Button.displayName = "Button";
export default Button;
