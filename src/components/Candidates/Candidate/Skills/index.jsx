import React from "react";
import styles from "./index.module.css";
import Skill from "../Skill";

const Skills = ({ skills, isEditable = false, onClick = () => {} }) => {
  return (
    <div
      className={styles.skills}
      style={isEditable ? { marginRight: 0, height: "10rem" } : {}}
    >
      <div>
        {skills.map((skill, index) => (
          <Skill
            key={index}
            id={index}
            name={skill.trim()}
            isEditable={isEditable}
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  );
};

Skills.displayName = "Skills";
export default Skills;
