import classes from "./index.module.scss";

const FormProgress = ({ currentSectionIndex, titles }) => {
  return (
    <div className={classes.progressContainer}>
      <ul className={classes.progressList}>
        {titles.map((title, index) => (
          <li
            key={index}
            className={`
              ${classes.section}
              ${
                index === currentSectionIndex
                  ? classes.active + " " + classes.currentSection
                  : ""
              }
              ${index < currentSectionIndex ? classes.completed : ""}
            `}
          >
            <h3 className={classes.sectionTitle}>{title}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

FormProgress.displayName = "FormProgress";
export default FormProgress;
