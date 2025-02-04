import { forwardRef, useImperativeHandle, useRef } from "react";
import PropTypes from "prop-types";
import classes from "./index.module.scss";

/**
 * InputV2 Component
 *
 * A styled input component with label, error handling, focus control, and optional right icon.
 *
 * @param {Object} props - The component props.
 * @param {string} props.id - The id of the input element.
 * @param {string} props.label - The label text for the input field.
 * @param {string} [props.extraClass] - Additional CSS classes to apply to the input control.
 * @param {string} props.value - The current value of the input field.
 * @param {function} props.changeHandler - Function to call when the input value changes.
 * @param {function} props.blurHandler - Function to call when the input loses focus.
 * @param {function} props.focusHandler - Function to call when the input gains focus.
 * @param {string} [props.error] - Error message to display if validation fails.
 * @param {boolean} [props.isFocused] - Whether the input is focused initially.
 * @param {boolean} [props.isRequired] - Whether the input field is required.
 * @param {React.ReactNode} [props.rightIcon] - Icon to be displayed on the right side of the input.
 * @param {function} [props.rightIconOnClick] - Callback function for the right icon click.
 * @param {string} [props.prefix] - Text or symbol to display before the input field.
 * @returns {JSX.Element} The InputV2 component.
 */
const InputV2 = forwardRef(
  (
    {
      id,
      label,
      extraClass = "",
      value,
      changeHandler,
      blurHandler,
      focusHandler,
      error,
      isFocused,
      isRequired = false,
      rightIcon,
      rightIconOnClick,
      prefix = "",
      ...props
    },
    ref
  ) => {
    const inputRef = useRef();

    /**
     * Exposes focus control to parent components.
     *
     * Sets up an imperative handle to allow parent components to trigger
     * the focus event on the input element using the ref.
     */
    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current.focus(),
    }));

    return (
      <div className={`${classes.control} ${extraClass}`}>
        <label htmlFor={id}>
          {label} {isRequired && <span className={classes.required}>*</span>}
        </label>
        <div className={classes.inputWrapper}>
          {prefix && <span className={classes.prefix}>{prefix}</span>}
          <input
            ref={inputRef}
            id={id}
            className={`${isFocused ? classes.focused : ""} ${
              error ? classes.error : ""
            }`}
            value={value}
            onChange={changeHandler}
            onBlur={blurHandler}
            onFocus={focusHandler}
            aria-required={isRequired}
            data-error={error ? "true" : undefined}
            data-focusable="true"
            {...props}
          />
          {rightIcon && (
            <span
              onClick={rightIconOnClick}
              className={classes.rightIcon}
              role="button"
              tabIndex={0}
            >
              {rightIcon}
            </span>
          )}
        </div>
        <small className={classes.errorText}>{error || ""}</small>
      </div>
    );
  }
);

InputV2.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  extraClass: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  changeHandler: PropTypes.func.isRequired,
  blurHandler: PropTypes.func,
  focusHandler: PropTypes.func,
  error: PropTypes.string,
  isFocused: PropTypes.bool,
  isRequired: PropTypes.bool,
  rightIcon: PropTypes.node,
  rightIconOnClick: PropTypes.func,
  prefix: PropTypes.string,
};

InputV2.displayName = "InputVersion2";
export default InputV2;
