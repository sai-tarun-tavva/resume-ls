import React from "react";
import styles from "./index.module.css";
import Skill from "../Skill";

const Skills = ({ skills, isEditable = false, onClick = () => {} }) => {
  return (
    <div
      className={styles.skills}
      style={isEditable ? { marginRight: 0, height: "29rem" } : {}}
    >
      <div>
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <Skill
              key={index}
              id={index}
              name={skill.trim()}
              isEditable={isEditable}
              onClick={onClick}
            />
          ))
        ) : (
          <p className={styles["no-skill"]}>No skills found</p>
        )}
      </div>
    </div>
  );
};

Skills.displayName = "Skills";
export default Skills;
