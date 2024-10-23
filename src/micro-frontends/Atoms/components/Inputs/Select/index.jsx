import { forwardRef, useImperativeHandle, useRef } from "react";
import classes from "./index.module.scss";

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
      isFocused,
      isRequired = false,
      ...props
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
        <select
          ref={inputRef}
          id={id}
          className={`${isFocused ? classes.focused : ""} ${
            error ? classes.error : ""
          }`}
          value={value}
          aria-required="true"
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
        <small className={classes.errorText}>{error || ""}</small>
      </div>
    );
  }
);

Select.displayName = "Select";
export default Select;
