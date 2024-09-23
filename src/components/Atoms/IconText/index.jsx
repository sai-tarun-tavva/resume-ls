import React from "react";
import styles from "./index.module.css";

const IconText = ({ iconName, children }) => {
  return (
    <div className={styles["icon-text"]}>
      <span>
        <i className={`bi bi-${iconName}-fill`}></i>
      </span>
      {children}
    </div>
  );
};

IconText.displayName = "IconText";
export default IconText;
