import React from "react";
import styles from "./index.module.css";

const Button = ({ title, name, ...props }) => (
  <button className={styles["action-button"]} title={title} {...props}>
    <i className={`bi bi-${name}`}></i>
  </button>
);

const Actions = ({ onEdit: handleClick }) => {
  return (
    <>
      <Button title="Edit" name="pencil-square" onClick={handleClick} />
      <Button title="Download" name="download" />
      <Button title="View" name="eye" />
    </>
  );
};

Actions.displayName = "Actions";
export default Actions;
