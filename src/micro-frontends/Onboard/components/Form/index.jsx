import { useSelector } from "react-redux";
import FormProgress from "../FormProgress";
import FormSection from "../FormSection";
import { sections } from "../../constants";
import Button from "../../../Atoms/components/Button";
import classes from "./index.module.scss";

const Form = () => {
  const { currentSection: index } = useSelector((state) => state.input);
  const fields = sections[index];
  const fieldTitles = sections.map((section) => section.title);

  return (
    <div className={classes.formContainer}>
      <FormProgress currentSectionIndex={index} titles={fieldTitles} />
      <form className={classes.form}>
        <FormSection fields={fields} />
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
