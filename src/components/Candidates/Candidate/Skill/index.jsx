import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./index.module.css";

const Skill = ({ name, id, isEditable, onClick }) => {
  return (
    <span className={`${styles.skillBubble} ${isEditable && styles.editable}`}>
      {name}
      {isEditable && <i className="bi bi-x" onClick={() => onClick(id)}></i>}
    </span>
  );
};

Skill.displayName = "Skill";
export default Skill;
