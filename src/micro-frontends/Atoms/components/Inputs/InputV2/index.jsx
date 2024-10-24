import { forwardRef, useImperativeHandle, useRef } from "react";
import classes from "./index.module.scss";

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
          {...props}
        />
        <small className={classes.errorText}>{error || ""}</small>
      </div>
    );
  }
);

InputV2.displayName = "InputVersion2";
export default InputV2;
