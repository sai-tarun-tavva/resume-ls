import { useState } from "react";
import classes from "./index.module.scss";

const Select = ({
  id,
  label,
  placeholder = "default",
  //   value,
  //   isFocused,
  //   error,
  extraClass,
  ...props
}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setError("");
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!value) setError("Select is required.");
  };

  return (
    <div className={`${classes.control} ${extraClass}`}>
      <label
        htmlFor={id}
        className={`${isFocused || value ? classes.active : ""} ${
          error ? classes.error : ""
        }`}
      >
        {placeholder}
      </label>
      <select
        id={id}
        className={`${isFocused ? classes.focused : ""} ${
          error ? classes.error : ""
        }`}
        value={value}
        aria-required="true"
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
        <option value="manager">Manager</option>
      </select>
      <small className={classes.errorText}>{error || ""}</small>
    </div>
  );
};

Select.displayName = "Select";
export default Select;
