import React from "react";
import styles from "./index.module.css";

const Button = ({ title, name }) => (
  <button className={styles["action-button"]} title={title}>
    <i className={`bi bi-${name}`}></i>
  </button>
);

const Actions = () => {
  return (
    <>
      <Button title="Edit" name="pencil-square" />
      <Button title="Download" name="download" />
      <Button title="View" name="eye" />
    </>
  );
};

Actions.displayName = "Actions";
export default Actions;
