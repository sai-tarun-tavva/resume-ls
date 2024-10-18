import { useInput } from "../../../hooks";
import classes from "./index.module.scss";

const Select = ({
  id,
  label,
  options,
  extraClass,
  defaultValue,
  validationFunc = () => {},
  transformFunc = () => {},
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
      <label
        htmlFor={id}
        className={`${isFocused || value ? classes.active : ""} ${
          error ? classes.error : ""
        }`}
      >
        {label}
      </label>
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
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <small className={classes.errorText}>{error || ""}</small>
    </div>
  );
};

Select.displayName = "Select";
export default Select;
