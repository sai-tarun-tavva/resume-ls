import { useDispatch } from "react-redux";
import { inputActions } from "../../store";
import { SECTION_TITLES } from "../../constants";
import classes from "./index.module.scss";

const FormProgress = ({ currentSectionIndex }) => {
  const dispatch = useDispatch();

  const titleClickHandler = (index) => {
    if (index < currentSectionIndex)
      dispatch(inputActions.updateCurrentSectionIndex(index));
  };

  return (
    <div className={classes.progressContainer}>
      <ul className={classes.progressList}>
        {SECTION_TITLES.map((title, index) => (
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
            onClick={() => titleClickHandler(index)}
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
