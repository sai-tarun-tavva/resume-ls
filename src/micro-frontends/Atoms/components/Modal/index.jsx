import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import Button from "../Button";
import classes from "./index.module.scss";

/**
 * Modal Component
 *
 * Displays content in a dialog overlay.
 *
 * @param {function} handleClose - Function to close the modal.
 * @param {React.ReactNode} children - The content to be displayed inside the modal.
 * @returns {JSX.Element} The rendered Modal component.
 */
const Modal = ({ handleClose, children }) => {
  return createPortal(
    <div className={classes.modalContainer}>
      <div className={classes.backdrop} />
      <dialog open className={classes.modal}>
        <Button
          onClick={handleClose}
          className={classes.closeButton}
          aria-label="Close modal"
        >
          <i className="bi bi-x-lg" />
        </Button>
        {children}
      </dialog>
    </div>,
    document.getElementById("modal")
  );
};

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

Modal.displayName = "Modal";

export default Modal;
