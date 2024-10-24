import { forwardRef, useImperativeHandle, useRef } from "react";
import PropTypes from "prop-types";
import classes from "./index.module.scss";

/**
 * Button Component
 *
 * Renders a customizable button element.
 *
 * @param {React.ReactNode} children - The content to be displayed inside the button.
 * @param {function} onClick - The function to be called when the button is clicked.
 * @param {boolean} disabled - Indicates whether the button is disabled.
 * @param {string} className - Additional class names to apply to the button.
 * @param {Object} props - Additional props to pass to the button element.
 * @returns {JSX.Element} The rendered Button component.
 */
const Button = forwardRef(
  (
    {
      children,
      onClick = () => {},
      disabled = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const buttonRef = useRef();

    useImperativeHandle(ref, () => ({
      focus: () => buttonRef.current.focus(),
    }));

    return (
      <button
        ref={buttonRef}
        className={`${classes.button} ${className || ""}`}
        onClick={onClick}
        disabled={disabled}
        data-focusable="true"
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
