import { forwardRef, useImperativeHandle, useRef } from "react";
import PropTypes from "prop-types";
import classes from "./index.module.scss";

/**
 * Select Component
 *
 * A styled select dropdown component with label, error handling, and focus control.
 *
 * @param {Object} props - The component props.
 * @param {string} props.id - The id of the select element.
 * @param {string} props.label - The label text for the select field.
 * @param {Array<{ value: string, label: string }>} props.options - The options to display in the dropdown.
 * @param {string} [props.extraClass] - Additional CSS classes to apply to the select control.
 * @param {string} props.value - The currently selected value.
 * @param {function} props.changeHandler - Function to call when the selected option changes.
 * @param {function} props.blurHandler - Function to call when the select loses focus.
 * @param {function} props.focusHandler - Function to call when the select gains focus.
 * @param {string} [props.error] - Error message to display if validation fails.
 * @param {string} [props.helperText] - Additional helper text to display after the select label.
 * @param {boolean} [props.isFocused] - Whether the select is focused initially.
 * @param {boolean} [props.isRequired] - Whether the select field is required.
 * @param {string} [props.version] - Style version to apply ("version-1" or "version-2").
 * @returns {JSX.Element} The Select component.
 */
const Select = forwardRef(
  (
    {
      id,
      label,
      options,
      extraClass = "",
      value,
      changeHandler,
      blurHandler,
      focusHandler,
      error,
      helperText = "",
      isFocused,
      isRequired = false,
      version = "version-2", // Default to version-2
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
      <div className={`${classes[version]} ${extraClass}`}>
        <label htmlFor={id}>
          {label} {isRequired && <span className={classes.required}>*</span>}{" "}
          {helperText && (
            <small className={classes.helperText}>{helperText}</small>
          )}
        </label>
        <select
          ref={inputRef}
          id={id}
          className={`${isFocused ? classes.focused : ""} ${
            error ? classes.error : ""
          }`}
          value={value}
          aria-required={isRequired}
          data-error={error ? "true" : undefined}
          data-focusable="true"
          onChange={changeHandler}
          onBlur={blurHandler}
          onFocus={focusHandler}
          {...props}
        >
          {options.map(({ value, label }, index) => (
            <option key={index} value={value}>
              {label}
            </option>
          ))}
        </select>
        {isRequired && (
          <small className={classes.errorText}>{error || ""}</small>
        )}
      </div>
    );
  }
);

Select.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  extraClass: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  changeHandler: PropTypes.func.isRequired,
  blurHandler: PropTypes.func,
  focusHandler: PropTypes.func,
  error: PropTypes.string,
  helperText: PropTypes.string,
  isFocused: PropTypes.bool,
  isRequired: PropTypes.bool,
  version: PropTypes.oneOf(["version-1", "version-2"]),
};

Select.displayName = "Select";
export default Select;
