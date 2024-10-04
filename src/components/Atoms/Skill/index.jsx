import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { highlightText } from "../../../utilities";
import "bootstrap-icons/font/bootstrap-icons.css";
import classes from "./index.module.scss";

/**
 * Skill Component
 *
 * Represents an individual skill as a bubble.
 * It can be editable, allowing for the skill to be removed via a click event.
 *
 * @param {Object} props - The props for the Skill component.
 * @param {string} props.name - The name of the skill.
 * @param {string} props.id - The unique identifier for the skill.
 * @param {boolean} props.isEditable - Indicates if the skill bubble is editable.
 * @param {function} props.onClick - Function to call when the close icon is clicked.
 * @returns {JSX.Element} The rendered Skill component.
 */
const Skill = ({ name, id, isEditable, onClick }) => {
  const { searchTerm } = useSelector((state) => state.ui);

  return (
    <span
      className={`${classes.skillBubble} ${isEditable && classes.editable}`}
    >
      {highlightText(name, searchTerm)}
      {isEditable && <i className="bi bi-x" onClick={() => onClick(id)}></i>}
    </span>
  );
};

Skill.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  isEditable: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

Skill.displayName = "Skill";

export default Skill;
