import classes from "./index.module.css";

const Input = ({
  id,
  error,
  leftIcon,
  rightIcon,
  rightIconOnClick,
  children,
  ...props
}) => {
  return (
    <div className={`${classes.control} ${error ? classes.error : ""}`}>
      {leftIcon && <span className={classes.leftIcon}>{leftIcon}</span>}
      <input id={id} {...props} />
      {children}
      <div className={classes.controlError}>
        <p>{error}</p>
      </div>
      {rightIcon && (
        <span onClick={rightIconOnClick} className={classes.rightIcon}>
          {rightIcon}
        </span>
      )}
    </div>
  );
};

Input.displayName = "Input";
export default Input;
