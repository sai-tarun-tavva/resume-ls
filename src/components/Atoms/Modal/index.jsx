import React from "react";
import styles from "./index.module.css";
import { createPortal } from "react-dom";

const Modal = ({ handleClose, children }) => {
  return createPortal(
    <div className={styles["modal-container"]}>
      <div className={styles.backdrop} onClick={handleClose} />
      <dialog open className={styles.modal}>
        {children}
      </dialog>
    </div>,
    document.getElementById("modal")
  );
};

Modal.displayName = "Modal";
export default Modal;
