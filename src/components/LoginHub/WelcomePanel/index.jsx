import React from "react";
import Logo from "../../../assets/logo.png";
import styles from "./index.module.css";

const WelcomePanel = () => {
  return (
    <div className={styles["welcome-panel"]}>
      <img src={Logo} alt={"Logisoft logo"} />
      <h1>Parse your resume</h1>
    </div>
  );
};

WelcomePanel.displayName = "WelcomePanel";
export default WelcomePanel;
