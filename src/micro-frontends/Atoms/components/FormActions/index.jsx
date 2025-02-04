import PropTypes from "prop-types"; // Import PropTypes for validation
import { Link } from "react-router-dom";
import Button from "../Button";
import { useLoading, useUI } from "../../../../store";
import { CONTENT, LOADING_ACTION_TYPES } from "../../../../constants";
import classes from "./index.module.scss";

const { BUTTON } = LOADING_ACTION_TYPES;
const { save, close } = CONTENT.ONBOARD.candidateForm.buttons;

/**
 * FormActions Component
 *
 * Renders the form's navigation actions including:
 *  - Close button: Closes the current form and allows refetching.
 *  - Previous and Next buttons: For navigating between sections of the form.
 *  - Save & Next or Save button: Depending on the form's progress.
 *
 * @param {Object} props - Props for the FormActions component.
 * @param {boolean} props.isInNewRoute - Whether the form is part of a new route (navigation flow).
 * @param {Function} props.previousHandler - Function to handle the previous button action.
 * @param {Function} props.nextHandler - Function to handle the next button action.
 * @param {Function} props.nextAndSaveHandler - Function to handle the next and save button action.
 * @param {number} props.index - Current index of the form section.
 * @param {boolean} props.isEditMode - Whether the form is in edit mode.
 * @param {string} props.closeRedirectRoute - Route to navigate to when the form is closed.
 * @returns {JSX.Element} The rendered FormActions component.
 */
const FormActions = ({
  isInNewRoute,
  previousHandler,
  nextHandler,
  nextAndSaveHandler,
  index,
  isEditMode,
  closeRedirectRoute,
}) => {
  const { isLoading } = useLoading(); // Fetch loading status for the button
  const { enableRefetch } = useUI(); // Refetch flag from UI state

  /**
   * Handle closing the form and enabling refetch
   */
  const handleClose = () => {
    enableRefetch(); // Trigger refetch when closing the form
  };

  return (
    <div className={`${classes.actions} ${!isInNewRoute ? classes.edit : ""}`}>
      {/* Close button to exit the form */}
      <Link to={closeRedirectRoute} onClick={handleClose}>
        {close}
      </Link>
      <div className={classes.navActions}>
        {/* Previous button: Disabled if it's the first section */}
        {index !== 0 && (
          <Button className={classes.button} onClick={previousHandler}>
            <i className="bi bi-caret-left-fill" />
          </Button>
        )}
        {index < 9 && !isInNewRoute && (
          <Button className={classes.button} onClick={nextHandler}>
            <i className="bi bi-caret-right-fill" />
          </Button>
        )}
        {/* Next button: Text changes based on loading status and current section */}
        <Button
          className={`${classes.button} ${isLoading[BUTTON] ? "loading" : ""}`}
          disabled={!isEditMode} // Disable if not in edit mode
          onClick={nextAndSaveHandler}
        >
          {
            isLoading[BUTTON]
              ? save.loading // Show 'Saving...' when loading
              : index === 9 || !isInNewRoute
              ? save.default // If it's the last section or not in new route, show "Save"
              : save.next // Otherwise, show "Save & Next"
          }
        </Button>
      </div>
    </div>
  );
};

FormActions.propTypes = {
  isInNewRoute: PropTypes.bool.isRequired,
  previousHandler: PropTypes.func.isRequired,
  nextHandler: PropTypes.func.isRequired,
  nextAndSaveHandler: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  closeRedirectRoute: PropTypes.string.isRequired,
};

FormActions.displayName = "FormActions";
export default FormActions;
