import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./index.module.css";

const Logout = () => {
  return (
    <span className={styles.logout} title="Log Out">
      <i className="bi bi-box-arrow-left"></i>
    </span>
  );
};

Logout.displayName = "LogOut";
export default Logout;
