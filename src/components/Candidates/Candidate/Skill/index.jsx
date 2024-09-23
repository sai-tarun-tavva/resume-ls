import React from "react";
import styles from "./index.module.css";

const Skill = ({ name }) => {
  return <span className={styles.skillBubble}>{name}</span>;
};

Skill.displayName = "Skill";
export default Skill;
