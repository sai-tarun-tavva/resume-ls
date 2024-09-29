import Skill from "../Skill";
import classes from "./index.module.css";

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

Skills.displayName = "Skills";
export default Skills;
