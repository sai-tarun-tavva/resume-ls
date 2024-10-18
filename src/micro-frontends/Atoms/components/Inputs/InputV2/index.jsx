import classes from "./index.module.scss";

const InputV2 = ({
  id,
  label,
  extraClass = "",
  value,
  changeHandler,
  blurHandler,
  focusHandler,
  error,
  isFocused,
  ...props
}) => {
  return (
    <div className={`${classes.control} ${extraClass}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className={`${isFocused ? classes.focused : ""} ${
          error ? classes.error : ""
        }`}
        value={value}
        onChange={changeHandler}
        onBlur={blurHandler}
        onFocus={focusHandler}
        aria-required="true"
        {...props}
      />
      <small className={classes.errorText}>{error || ""}</small>
    </div>
  );
};

InputV2.displayName = "InputVersion2";
export default InputV2;
