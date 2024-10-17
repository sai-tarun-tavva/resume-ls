import { sections } from "../../constants";
import classes from "./index.module.scss";

const FormProgress = ({ currentSection }) => {
  return (
    <div className={classes.progressContainer}>
      <ul className={classes.progressList}>
        {sections.map((section, index) => (
          <li
            key={index}
            className={`
              ${classes.section}
              ${
                index === currentSection
                  ? classes.active + " " + classes.currentSection
                  : ""
              }
              ${index < currentSection ? classes.completed : ""}
            `}
          >
            <h3 className={classes.sectionTitle}>{section.title}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

FormProgress.displayName = "FormProgress";
export default FormProgress;
