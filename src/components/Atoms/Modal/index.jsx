import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import classes from "./index.module.css";

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
      <div className={classes.backdrop} onClick={handleClose} />
      <dialog open className={classes.modal}>
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
