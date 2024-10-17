import { useState } from "react";
import classes from "./index.module.scss";

const InputV2 = ({
  id,
  label,
  placeholder,
  value,
  error,
  isFocused,
  extraClass,
  ...props
}) => {
  return (
    <div className={`${classes.control} ${extraClass}`}>
      <label
        htmlFor={id}
        className={`${isFocused || value ? classes.active : ""} ${
          error ? classes.error : ""
        }`}
      >
        {label}
      </label>
      <input
        id={id}
        placeholder=""
        className={`${isFocused ? classes.focused : ""} ${
          error ? classes.error : ""
        }`}
        value={value}
        aria-required="true"
        {...props}
      />
      <small className={classes.errorText}>{error || ""}</small>
    </div>
  );
};

InputV2.displayName = "InputVersion2";
export default InputV2;
