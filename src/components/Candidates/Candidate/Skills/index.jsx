import React from "react";
import styles from "./index.module.css";
import Skill from "../Skill";

const Skills = ({ info }) => {
  return (
    <div className={styles.skills}>
      <div>
        {info.skills.split(",").map((skill, index) => (
          <Skill key={index} name={skill.trim()} />
        ))}
      </div>
    </div>
  );
};

Skills.displayName = "Skills";
export default Skills;
