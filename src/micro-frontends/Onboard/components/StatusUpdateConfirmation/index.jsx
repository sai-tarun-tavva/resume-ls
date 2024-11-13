import PropTypes from "prop-types";
import Modal from "../../../Atoms/components/Modal";
import Button from "../../../Atoms/components/Button";
import { CONTENT } from "../../../../constants";
import styles from "./index.module.scss";

const { closeButton, onboardDetails, incompleteDetails } =
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
 * @param {function} props.handleEdit - Callback function to redirect to the edit page.
 * @returns {JSX.Element} The rendered StatusUpdateConfirmation component.
 */
const StatusUpdateConfirmation = ({
  isDetailsProvided,
  handleClose,
  handleEdit,
}) => {
  const buttonText = isDetailsProvided
    ? closeButton.default
    : incompleteDetails.editButton.default;

  return (
    <Modal handleClose={handleClose}>
      <div
        className={`${styles.contentContainer} ${
          isDetailsProvided ? styles.successStyle : styles.warningStyle
        }`}
      >
        <div className={styles.innerContainer}>
          {isDetailsProvided ? (
            <div className={styles.message}>
              <i className="bi bi-check-circle-fill" />
              <div>
                <h3>{onboardDetails.primaryMessageHeading}</h3>
                <p>{onboardDetails.primaryMessageParagraph}</p>
              </div>
            </div>
          ) : (
            <div className={styles.message}>
              <i className="bi bi-exclamation-triangle-fill" />
              <div>
                <h3>{incompleteDetails.primaryMessageHeading}</h3>
                <p>{incompleteDetails.primaryMessageParagraph}</p>
              </div>
            </div>
          )}

          <div className={styles.footer}>
            {!isDetailsProvided && (
              <>
                <p
                  className={`${styles.secondaryMessage} ${styles.warningMessage}`}
                >
                  {incompleteDetails.secondaryMessage}
                </p>
                <p className={styles.confirmMessage}>
                  {incompleteDetails.confirmMessage}
                </p>
              </>
            )}

            <div className={styles.buttonGroup}>
              {!isDetailsProvided && (
                <Button
                  title={closeButton.default}
                  className={styles.closeButton}
                  onClick={handleClose}
                >
                  {closeButton.default}
                </Button>
              )}
              <Button
                title={buttonText}
                className={styles.saveButton}
                onClick={isDetailsProvided ? handleClose : handleEdit}
              >
                {buttonText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

StatusUpdateConfirmation.propTypes = {
  isDetailsProvided: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

StatusUpdateConfirmation.displayName = "StatusUpdateConfirmation";
export default StatusUpdateConfirmation;
