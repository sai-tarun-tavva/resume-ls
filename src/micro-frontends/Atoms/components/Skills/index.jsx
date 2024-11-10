import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Skill from "../Skill";
import { CONTENT } from "../../../../constants";
import classes from "./index.module.scss";

/**
 * Skills Component
 *
 * Displays a list of skills.
 * It renders each skill as a Skill component and allows for editing.
 *
 * @param {Object} props - The props for the Skills component.
 * @param {Array<string>} props.skills - The array of skills to display.
 * @param {boolean} props.isEditable - Indicates if the skills are editable.
 * @param {boolean} props.isSelectable - Indicates if the skill is selectable.
 * @param {function} props.removeHandler - Function to call when a skill is clicked for removal.
 * @param {function} props.selectHandler - Function to call when a skill is clicked.
 * @returns {JSX.Element} The rendered Skills component.
 */
const Skills = ({
  skills = [],
  isEditable = false,
  isSelectable = false,
  removeHandler = () => {},
  selectHandler = () => {},
}) => {
  const { show: makeSmaller } = useSelector((state) => state.viewResume);

  return (
    <div
      className={`${classes.skills} ${makeSmaller && classes.smaller} ${
        isEditable && classes.editable
      } ${isSelectable && classes.selectable}`}
    >
      <div>
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <Skill
              key={index}
              id={index}
              name={skill.trim()}
              isEditable={isEditable}
              isSelectable={isSelectable}
              onRemove={removeHandler}
              onSelect={selectHandler}
            />
          ))
        ) : (
          <p className={classes.noSkill}>
            {CONTENT.INSIGHT.candidateForm.noSkills}
          </p>
        )}
      </div>
    </div>
  );
};

Skills.propTypes = {
  skills: PropTypes.arrayOf(PropTypes.string),
  isEditable: PropTypes.bool,
  isSelectable: PropTypes.bool,
  removeHandler: PropTypes.func,
  selectHandler: PropTypes.func,
};

Skills.displayName = "Skills";
export default Skills;
