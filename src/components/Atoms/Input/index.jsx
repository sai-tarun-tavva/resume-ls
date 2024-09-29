import classes from "./index.module.css";

const Input = ({ label, id, error, extraClass = "", children, ...props }) => {
  return (
    <div
      className={`${classes.control} ${
        error ? classes.error : ""
      } ${extraClass}`}
    >
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
      {children}
      <div className={classes.controlError}>
        <p>{error}</p>
      </div>
    </div>
  );
};

Input.displayName = "Input";
export default Input;
