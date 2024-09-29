import React from "react";
import Logo from "../../../assets/logo.png";
import { useCountAnimation } from "../../../hooks/useCountAnimation";
import styles from "./index.module.css";

const WelcomePanel = ({ targetCount }) => {
  const count = useCountAnimation(targetCount);

  return (
    <div className={styles["welcome-panel"]}>
      <img src={Logo} alt={"Logisoft logo"} className={styles["logo"]} />
      <h1>Parse your resume</h1>

      {targetCount > 0 && (
        <div className={styles["counter-wrapper"]}>
          <span className={styles["count-up"]}>{count}</span>
          <p>resumes parsed</p>
        </div>
      )}
    </div>
  );
};

WelcomePanel.displayName = "WelcomePanel";
export default WelcomePanel;
