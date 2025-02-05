import { forwardRef, useImperativeHandle, useRef } from "react";
import PropTypes from "prop-types";
import classes from "./index.module.scss";

/**
 * Checkbox Component
 *
 * A customizable checkbox component with validation and styles matching Action component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.id - The unique id for the checkbox.
 * @param {string} props.label - The label for the checkbox.
 * @param {boolean} props.value - The value of the checkbox (checked/unchecked).
 * @param {function} props.changeHandler - Function to call when the checkbox is changed.
 * @param {function} props.blurHandler - Function to call when the checkbox loses focus.
 * @param {function} props.focusHandler - Function to call when the checkbox gains focus.
 * @param {boolean} props.error - The error state of the checkbox.
 * @param {string} props.helperText - Additional helper text to display below the checkbox.
 * @param {string} props.extraClass - Additional CSS classes to apply to the input control.
 * @param {boolean} props.isRequired - Whether the checkbox is required.
 * @returns {JSX.Element} The Checkbox component.
 */
const Checkbox = forwardRef(
  (
    {
      id,
      label,
      value,
      changeHandler,
      blurHandler,
      focusHandler,
      error,
      helperText,
      extraClass = "",
      isRequired = false,
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
      <>
        <label
          htmlFor={id}
          className={`${classes.checkboxControl} ${extraClass}`}
        >
          <span className={classes.checkboxLabel}>
            {label} {isRequired && <span className={classes.required}>*</span>}{" "}
            {helperText && (
              <small className={classes.helperText}>{helperText}</small>
            )}
          </span>
          <input
            ref={inputRef}
            id={id}
            type="checkbox"
            className={`${classes.checkboxInput} ${error ? classes.error : ""}`}
            checked={value}
            onChange={changeHandler}
            onBlur={blurHandler}
            onFocus={focusHandler}
            aria-required={isRequired}
            data-focusable="true"
            {...props}
          />
          <span className={classes.checkboxSlider}></span>
        </label>

        {error && <small className={classes.errorText}>{error}</small>}
      </>
    );
  }
);

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  changeHandler: PropTypes.func.isRequired,
  blurHandler: PropTypes.func,
  focusHandler: PropTypes.func,
  error: PropTypes.string,
  helperText: PropTypes.string,
  extraClass: PropTypes.string,
  isRequired: PropTypes.bool,
};

Checkbox.displayName = "Checkbox";
export default Checkbox;
