import { forwardRef, useImperativeHandle, useRef } from "react";
import PropTypes from "prop-types";
import classes from "./index.module.scss";

/**
 * RadioGroup Component
 *
 * A customizable radio group component with validation and styles matching other form components.
 *
 * @param {Object} props - The component props.
 * @param {string} props.id - The unique id for the radio group.
 * @param {string} props.label - The label for the radio group.
 * @param {Array<Object>} props.options - The array of options for radio buttons, each option should have { value, label }.
 * @param {string} props.value - The currently selected radio value.
 * @param {function} props.changeHandler - Function to call when a radio button is changed.
 * @param {function} props.blurHandler - Function to call when the radio group loses focus.
 * @param {function} props.focusHandler - Function to call when the radio group gains focus.
 * @param {boolean} props.error - The error state of the radio group.
 * @param {string} extraClass - Additional CSS classes to apply to the input control.
 * @param {boolean} props.isRequired - Whether the radio group is required.
 * @returns {JSX.Element} The RadioGroup component.
 */
const RadioGroup = forwardRef(
  (
    {
      id,
      label,
      options,
      value,
      changeHandler,
      blurHandler,
      focusHandler,
      error,
      extraClass = "",
      isRequired = false,
    },
    ref
  ) => {
    const inputRef = useRef();

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current.focus(),
    }));

    return (
      <div className={`${classes.radioGroup} ${extraClass}`}>
        <div>
          <span className={classes.radioLabel}>
            {label} {isRequired && <span className={classes.required}>*</span>}
          </span>
          {options.map((option, index) => (
            <label
              key={option.value}
              htmlFor={`${id}-${option.value}`}
              className={classes.radioControl}
            >
              <input
                ref={index === 0 ? inputRef : null}
                id={`${id}-${option.value}`}
                type="radio"
                name={id}
                value={option.value}
                checked={value === option.value}
                onChange={changeHandler}
                onBlur={blurHandler}
                onFocus={focusHandler}
                data-error={error ? "true" : undefined}
                className={`${classes.radioInput} ${
                  error ? classes.error : ""
                }`}
              />
              <label htmlFor={`${id}-${option.value}`}>
                <span className={classes.radioOptionLabel}>{option.label}</span>
              </label>
            </label>
          ))}
        </div>
        <small className={classes.errorText}>{error || ""}</small>
      </div>
    );
  }
);

RadioGroup.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string.isRequired,
  changeHandler: PropTypes.func.isRequired,
  blurHandler: PropTypes.func,
  focusHandler: PropTypes.func,
  error: PropTypes.string,
  extraClass: PropTypes.string,
  isRequired: PropTypes.bool,
};

export default RadioGroup;
