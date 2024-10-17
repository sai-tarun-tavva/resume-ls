import FormOnboarding from "../FormOnboarding";
import classes from "./index.module.scss";

const Form = () => {
  return (
    <form className={classes.formContainer}>
      <FormOnboarding />
    </form>
  );
};

Form.displayName = "Form";
export default Form;
