import PropTypes from "prop-types";
import Modal from "../../../Atoms/components/Modal";
import Button from "../../../Atoms/components/Button";
import { CONTENT } from "../../../../constants";
import classes from "./index.module.scss";

/**
 * StatusUpdateConfirmation Component
 *
 * Renders a confirmation modal for updating the onboarding status of a candidate.
 * Displays a warning if candidate details are incomplete and prompts the user to review.
 * Otherwise, it alerts the user that setting the status to "COMPLETED" will finalize the onboarding.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {function} props.handleClose - Callback function to close the modal.
 * @param {function} props.handleEdit - Callback function to redirect to the edit page.
 * @returns {JSX.Element} The rendered StatusUpdateConfirmation component.
 */
const StatusUpdateConfirmation = ({ handleClose, handleEdit }) => {
  return (
    <Modal handleClose={handleClose}>
      <div className={classes.container}>
        <div className={classes.iconWrapper}>
          <i className="bi bi-exclamation-circle-fill"></i>
        </div>
        <h2 className={classes.heading}>
          {CONTENT.ONBOARD.candidates.statusUpdateModal.heading}
        </h2>
        <p className={classes.description}>
          {CONTENT.ONBOARD.candidates.statusUpdateModal.description}
        </p>
        <div className={classes.actions}>
          <Button
            title={CONTENT.ONBOARD.candidates.statusUpdateModal.cancel}
            className={classes.cancelButton}
            onClick={handleClose}
          >
            {CONTENT.ONBOARD.candidates.statusUpdateModal.cancel}
          </Button>
          <Button
            title={CONTENT.ONBOARD.candidates.statusUpdateModal.edit}
            className={classes.editButton}
            onClick={handleEdit}
          >
            {CONTENT.ONBOARD.candidates.statusUpdateModal.edit}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

StatusUpdateConfirmation.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

StatusUpdateConfirmation.displayName = "StatusUpdateConfirmation";

export default StatusUpdateConfirmation;
