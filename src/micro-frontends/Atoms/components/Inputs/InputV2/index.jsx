import { useInput } from "../../../hooks";
import classes from "./index.module.scss";

const InputV2 = ({
  id,
  label,
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
      <input
        id={id}
        className={`${isFocused ? classes.focused : ""} ${
          error ? classes.error : ""
        }`}
        value={value}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        aria-required="true"
        {...props}
      />
      <small className={classes.errorText}>{error || ""}</small>
    </div>
  );
};

InputV2.displayName = "InputVersion2";
export default InputV2;
