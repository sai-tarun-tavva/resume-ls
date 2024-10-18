import { useSelector } from "react-redux";
import FormProgress from "../FormProgress";
import FormSection from "../FormSection";
import classes from "./index.module.scss";

const Form = () => {
  const { currentSectionIndex: current } = useSelector((state) => state.input);

  return (
    <div className={classes.formContainer}>
      <FormProgress currentSectionIndex={current} />
      <form className={classes.form}>
        <FormSection index={current} />
      </form>
    </div>
  );
};

Form.displayName = "Form";
export default Form;
