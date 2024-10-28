import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../Atoms/components/Button";
import { useLoading } from "../../../../store";
import { ROUTES } from "../../../../constants";
import classes from "./index.module.scss";

const FormActions = ({ isNextDisabled, previousHandler, nextHandler }) => {
  const navigate = useNavigate();
  const routeLocation = useLocation();
  const { isLoading } = useLoading();
  const { currentSectionIndex: index } = useSelector((state) => state.input);

  const isInNewRoute = routeLocation.pathname.endsWith(
    ROUTES.ONBOARD.CANDIDATE_FORM.NEW
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
          <Button className={classes.button} onClick={previousHandler}>
            <i className="bi bi-caret-left-fill" />
          </Button>
        )}
        <Button
          className={`${classes.button} ${isLoading.fetch ? "loading" : ""}`}
          disabled={isNextDisabled}
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
