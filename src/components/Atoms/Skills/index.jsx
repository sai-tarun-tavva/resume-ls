import PropTypes from "prop-types";
import Skill from "../Skill";
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
 * @param {function} props.onClick - Function to call when a skill is clicked for removal.
 * @returns {JSX.Element} The rendered Skills component.
 */
const Skills = ({ skills = [], isEditable = false, onClick = () => {} }) => {
  return (
    <div
      className={classes.skills}
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
          <p className={classes.noSkill}>No skills found</p>
        )}
      </div>
    </div>
  );
};

Skills.propTypes = {
  skills: PropTypes.arrayOf(PropTypes.string),
  isEditable: PropTypes.bool,
  onClick: PropTypes.func,
};

Skills.displayName = "Skills";

export default Skills;
