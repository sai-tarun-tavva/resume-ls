import { createPortal } from "react-dom";
import classes from "./index.module.css";

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

Modal.displayName = "Modal";
export default Modal;
