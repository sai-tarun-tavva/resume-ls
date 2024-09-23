import React from "react";
import styles from "./index.module.css";

const Skills = ({ info }) => {
  return (
    <div className={styles.skills}>
      <div>
        {info.skills.split(",").map((skill, index) => (
          <span key={index} className={styles["skill-bubble"]}>
            {skill.trim()}
          </span>
        ))}
      </div>
    </div>
  );
};

Skills.displayName = "Skills";
export default Skills;
