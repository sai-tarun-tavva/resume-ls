import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../../../Atoms/components/Button";
import { useLoading, useUI } from "../../../../store";
import { CONTENT, LOADING_ACTION_TYPES } from "../../../../constants";
import classes from "./index.module.scss";

const { BUTTON } = LOADING_ACTION_TYPES;
const { save, close } = CONTENT.ONBOARD.candidateForm.buttons;

/**
 * FormActions Component
 *
 * This component renders the form's navigation actions including:
 *  - Close button: Closes the current form and allows refetching.
 *  - Previous and Next buttons: For navigating between sections of the form.
 *  - Save & Next or Save button: Depending on the form's progress.
 *
 * @param {boolean} isInNewRoute - Whether the form is part of a new route (navigation flow).
 * @param {Function} previousHandler - Function to handle the previous button action.
 * @param {Function} nextHandler - Function to handle the next button action.
 * @returns {JSX.Element} The rendered FormActions component.
 */
const FormActions = ({ isInNewRoute, previousHandler, nextHandler }) => {
  const { isLoading } = useLoading(); // Fetch loading status for the button
  const { enableRefetch } = useUI(); // Refetch flag from UI state
  const { currentSectionIndex: index, isEditMode } = useSelector(
    (state) => state.input // Get the current section index and edit mode state
  );

  /**
   * Handle closing the form and enabling refetch
   */
  const handleClose = () => {
    enableRefetch(); // Trigger refetch when closing the form
  };

  return (
    <div className={classes.actions}>
      {/* Close button to exit the form */}
      <Link to=".." onClick={handleClose}>
        {close}
      </Link>
      <div className={classes.navActions}>
        {/* Previous button: Disabled if it's the first section */}
        {index !== 0 && (
          <Button
            className={classes.button}
            disabled={!isEditMode} // Disable if not in edit mode
            onClick={previousHandler}
          >
            <i className="bi bi-caret-left-fill" />
          </Button>
        )}
        {/* Next button: Text changes based on loading status and current section */}
        <Button
          className={`${classes.button} ${isLoading[BUTTON] ? "loading" : ""}`}
          disabled={!isEditMode} // Disable if not in edit mode
          onClick={nextHandler}
        >
          {
            isLoading[BUTTON]
              ? save.loading // Show 'Saving...' when loading
              : index === 9 || !isInNewRoute
              ? save.default // If it's the last section or not in new route, show "Save"
              : save.next // Otherwise, show "Save & Next
          }
        </Button>
      </div>
    </div>
  );
};

FormActions.displayName = "FormActions";
export default FormActions;
