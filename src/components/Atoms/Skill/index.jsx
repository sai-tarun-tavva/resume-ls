import "bootstrap-icons/font/bootstrap-icons.css";
import classes from "./index.module.css";

const Skill = ({ name, id, isEditable, onClick }) => {
  return (
    <span
      className={`${classes.skillBubble} ${isEditable && classes.editable}`}
    >
      {name}
      {isEditable && <i className="bi bi-x" onClick={() => onClick(id)}></i>}
    </span>
  );
};

Skill.displayName = "Skill";
export default Skill;
