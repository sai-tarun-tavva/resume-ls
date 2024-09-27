import React from "react";
import styles from "./index.module.css";

const Loader = () => {
  return (
    <div className={styles["loader-container"]}>
      <div className={styles.loader} />
    </div>
  );
};

Loader.displayName = "Loader";
export default Loader;
