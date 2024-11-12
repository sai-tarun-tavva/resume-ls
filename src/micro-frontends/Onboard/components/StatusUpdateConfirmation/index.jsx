import PropTypes from "prop-types";
import Modal from "../../../Atoms/components/Modal";
import Button from "../../../Atoms/components/Button";
import { useLoading } from "../../../../store";
import { CONTENT, LOADING_ACTION_TYPES } from "../../../../constants";
import classes from "./index.module.scss";

const { BUTTON } = LOADING_ACTION_TYPES;
const { closeButton, importantNotice, incompleteDetails } =
  CONTENT.ONBOARD.candidates.statusUpdateModal;

/**
 * StatusUpdateConfirmation Component
 *
 * Renders a confirmation modal for updating the onboarding status of a candidate.
 * Displays a warning if candidate details are incomplete and prompts the user to review.
 * Otherwise, it alerts the user that setting the status to "COMPLETED" will finalize the onboarding.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.isDetailsProvided - Indicates if all required candidate details have been provided.
 * @param {function} props.handleClose - Callback function to close the modal.
 * @param {function} props.handleSave - Callback function to proceed with the status update.
 * @returns {JSX.Element} The rendered StatusUpdateConfirmation component.
 */
const StatusUpdateConfirmation = ({
  isDetailsProvided,
  handleClose,
  handleSave,
}) => {
  const { isLoading } = useLoading();

  const buttonText =
    isDetailsProvided === false
      ? incompleteDetails.editButton.default
      : isLoading[BUTTON]
      ? importantNotice.saveButton.loading
      : importantNotice.saveButton.default;

  return (
    <Modal handleClose={handleClose}>
      <div
        className={`${classes.contentContainer} ${
          isDetailsProvided === false
            ? classes.warningStyle
            : classes.errorStyle
        }`}
      >
        {isDetailsProvided === false ? (
          <>
            <p className={classes.primaryMessage}>
              <strong>{incompleteDetails.primaryMessageHeading}</strong>
              <br />
              {incompleteDetails.primaryMessageParagraph}
            </p>
            <p className={classes.secondaryMessage}>
              {incompleteDetails.secondaryMessage}
            </p>
            <p className={classes.confirmMessage}>
              {incompleteDetails.confirmMessage}
            </p>
          </>
        ) : (
          <>
            <p className={classes.primaryMessage}>
              <strong>{importantNotice.primaryMessageHeading}</strong>
              <br />
              {importantNotice.primaryMessageParagraph}
            </p>
            <p className={classes.secondaryMessage}>
              {importantNotice.secondaryMessage}
            </p>
            <p className={classes.confirmMessage}>
              {importantNotice.confirmMessage}
            </p>
          </>
        )}
      </div>

      <div className={classes.buttonGroup}>
        <Button
          title={closeButton.default}
          className={classes.closeButton}
          onClick={handleClose}
        >
          {closeButton.default}
        </Button>
        <Button
          title={buttonText}
          className={`${classes.saveButton} ${
            isLoading[BUTTON] ? "loading" : ""
          }`}
          onClick={handleSave}
        >
          {buttonText}
        </Button>
      </div>
    </Modal>
  );
};

StatusUpdateConfirmation.propTypes = {
  isDetailsProvided: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};

StatusUpdateConfirmation.displayName = "StatusUpdateConfirmation";
export default StatusUpdateConfirmation;
