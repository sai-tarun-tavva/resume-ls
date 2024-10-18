import FormProgress from "../FormProgress";
import FormSection from "../FormSection";
import Button from "../../../Atoms/components/Button";
import classes from "./index.module.scss";

const Form = () => {
  return (
    <div className={classes.formContainer}>
      <FormProgress />
      <form className={classes.form}>
        <FormSection />
        <div className={classes.actions}>
          <Button className={classes.closeButton}>Close</Button>
          <div className={classes.navActions}>
            <Button className={classes.button}>
              <i className="bi bi-caret-left-fill" />
            </Button>
            <Button className={classes.button}>
              <i className="bi bi-caret-right-fill" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

Form.displayName = "Form";
export default Form;
