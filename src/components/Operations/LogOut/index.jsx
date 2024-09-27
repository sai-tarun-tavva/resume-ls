import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./index.module.css";
import Button from "../../Atoms/Button";

const Logout = () => {
  return (
    <Button className={styles.logout} title="Log Out">
      <i className="bi bi-box-arrow-left"></i>
    </Button>
  );
};

Logout.displayName = "LogOut";
export default Logout;
