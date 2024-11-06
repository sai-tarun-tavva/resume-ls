import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../../Atoms/components/Button";
import { useLoading } from "../../../../store";
import classes from "./index.module.scss";

const FormActions = ({ isInNewRoute, previousHandler, nextHandler }) => {
  const navigate = useNavigate();
  const { isLoading } = useLoading();
  const { currentSectionIndex: index, isEditMode } = useSelector(
    (state) => state.input
  );

  return (
    <div className={classes.actions}>
      <Button
        className={classes.closeButton}
        onClick={() => {
          navigate("..");
        }}
      >
        Close
      </Button>
      <div className={classes.navActions}>
        {index !== 0 && (
          <Button
            className={classes.button}
            disabled={!isEditMode}
            onClick={previousHandler}
          >
            <i className="bi bi-caret-left-fill" />
          </Button>
        )}
        <Button
          className={`${classes.button} ${isLoading.fetch ? "loading" : ""}`}
          disabled={!isEditMode}
          onClick={nextHandler}
        >
          {isLoading.fetch
            ? "Saving..."
            : index === 9 || !isInNewRoute
            ? "Save"
            : "Save & Next"}
        </Button>
      </div>
    </div>
  );
};

FormActions.displayName = "FormActions";
export default FormActions;
