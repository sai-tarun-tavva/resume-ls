import { forwardRef, useImperativeHandle, useRef } from "react";
import PropTypes from "prop-types";
import classes from "./index.module.scss";

/**
 * Textarea Component
 *
 * Provides a controlled textarea for user input with validation and consistent styling with InputV2.
 *
 * @param {Object} props - The component props.
 * @param {string} props.id - Unique identifier for the textarea.
 * @param {string} props.label - Label for the textarea.
 * @param {boolean} props.isRequired - If the textarea is required.
 * @param {string} props.error - Error message related to the textarea.
 * @param {function} props.setError - Function to set the error message.
 * @param {string} props.value - The value of the textarea.
 * @param {function} props.changeHandler - Function to handle textarea value change.
 * @param {function} props.blurHandler - Function to handle textarea blur event.
 * @param {function} props.focusHandler - Function to handle textarea focus event.
 * @param {string} extraClass - Additional CSS classes for customization.
 * @returns {JSX.Element} The textarea component.
 */
const Textarea = forwardRef(
  (
    {
      id,
      label,
      isRequired = false,
      error,
      value,
      changeHandler,
      focusHandler,
      blurHandler,
      isFocused,
      extraClass = "",
    },
    ref
  ) => {
    const inputRef = useRef();

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current.focus(),
    }));

    return (
      <div className={`${classes.control} ${extraClass}`}>
        <label htmlFor={id}>
          {label} {isRequired && <span className={classes.required}>*</span>}
        </label>
        <textarea
          ref={inputRef}
          id={id}
          className={`${isFocused ? classes.focused : ""} ${
            error ? classes.error : ""
          }`}
          value={value}
          onChange={changeHandler}
          onFocus={focusHandler}
          onBlur={blurHandler}
          aria-required={isRequired}
          rows={5} // Default height
          style={{ resize: "vertical" }} // Allow vertical resizing only
        />
        <small className={classes.errorText}>{error || ""}</small>
      </div>
    );
  }
);

Textarea.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  changeHandler: PropTypes.func.isRequired,
  focusHandler: PropTypes.func.isRequired,
  blurHandler: PropTypes.func.isRequired,
  isFocused: PropTypes.bool.isRequired,
  extraClass: PropTypes.string,
};

Textarea.displayName = "Textarea";
export default Textarea;
