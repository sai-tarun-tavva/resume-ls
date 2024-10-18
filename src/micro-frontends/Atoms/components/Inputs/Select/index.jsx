import { useInput } from "../../../hooks";
import classes from "./index.module.scss";

const Select = ({
  id,
  label,
  options,
  extraClass = "",
  defaultValue = "",
  validationFunc = () => {},
  transformFunc = (value) => value,
  ...props
}) => {
  const {
    value,
    handleInputChange,
    handleInputBlur,
    handleInputFocus,
    error,
    isFocused,
  } = useInput(defaultValue, validationFunc, transformFunc);

  return (
    <div className={`${classes.control} ${extraClass}`}>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        className={`${isFocused ? classes.focused : ""} ${
          error ? classes.error : ""
        }`}
        value={value}
        aria-required="true"
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
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
};

Select.displayName = "Select";
export default Select;
