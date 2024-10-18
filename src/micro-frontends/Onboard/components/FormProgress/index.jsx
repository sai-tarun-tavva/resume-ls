import { useDispatch } from "react-redux";
import { inputActions } from "../../store";
import classes from "./index.module.scss";

const FormProgress = ({ currentSectionIndex }) => {
  const dispatch = useDispatch();
  const titles = [
    "Onboarding",
    "Personal",
    "Current Location",
    "Relocation",
    "Education",
    "Profession",
    "Offer Letter",
    "US Travel and Stay",
    "Emergency Contacts",
    "Additional Information",
  ];

  const titleClickHandler = (index) => {
    if (index < currentSectionIndex)
      dispatch(inputActions.updateCurrentSectionIndex(index));
  };

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
