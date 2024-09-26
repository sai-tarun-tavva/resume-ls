import React from "react";
import styles from "./index.module.css";

const Input = ({ label, id, error, children, ...props }) => {
  return (
    <div className={`${styles.control} ${error ? styles.error : ""}`}>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
      {children}
      <div className={styles["control-error"]}>
        <p>{error}</p>
      </div>
    </div>
  );
};

Input.displayName = "Input";
export default Input;