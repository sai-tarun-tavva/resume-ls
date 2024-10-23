import { useSelector } from "react-redux";
import Button from "../../../Atoms/components/Button";
import classes from "./index.module.scss";

const FormActions = ({ isNextDisabled, previousHandler, nextHandler }) => {
  const { currentSectionIndex: index } = useSelector((state) => state.input);

  return (
    <div className={classes.actions}>
      <Button className={classes.closeButton}>Close</Button>
      <div className={classes.navActions}>
        {index !== 0 && (
          <Button className={classes.button} onClick={previousHandler}>
            <i className="bi bi-caret-left-fill" />
          </Button>
        )}
        <Button
          className={classes.button}
          disabled={isNextDisabled}
          onClick={nextHandler}
        >
          {index === 9 ? "Save" : <i className="bi bi-caret-right-fill" />}
        </Button>
      </div>
    </div>
  );
};

FormActions.displayName = "FormActions";
export default FormActions;
