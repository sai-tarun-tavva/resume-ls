import PropTypes from "prop-types";
import { useUI } from "../../../../store";
import { highlightText } from "../../../../utilities";
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
 * @param {boolean} props.isSelectable - Indicates if the skill bubble is selectable or clickable.
 * @param {function} props.onRemove - Function to call when the close icon is clicked.
 * @param {function} props.onSelect - Function to call when the skill bubble is clicked.
 * @returns {JSX.Element} The rendered Skill component.
 */
const Skill = ({ name, id, isEditable, isSelectable, onRemove, onSelect }) => {
  const {
    state: { searchTerm },
  } = useUI();

  return (
    <span
      className={`${classes.skillBubble} ${isEditable && classes.editable} ${
        isSelectable && classes.selectable
      }`}
      onClick={() => onSelect(name)}
    >
      {highlightText(name, searchTerm)}
      {isEditable && <i className="bi bi-x" onClick={() => onRemove(id)}></i>}
    </span>
  );
};

Skill.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  isEditable: PropTypes.bool.isRequired,
  isSelectable: PropTypes.bool.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

Skill.displayName = "Skill";
export default Skill;
