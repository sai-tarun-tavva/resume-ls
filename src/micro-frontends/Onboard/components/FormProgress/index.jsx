import { useDispatch } from "react-redux";
import { inputActions } from "../../store";
import { SECTION_TITLES } from "../../constants";
import classes from "./index.module.scss";

/**
 * FormProgress Component
 *
 * Displays a progress bar that shows the current section of the form.
 * Users can click on previous sections to navigate through the form.
 *
 * @param {boolean} isInNewRoute - Determines if the form is in a new route (navigation restrictions).
 * @param {number} currentSectionIndex - The index of the current active section.
 */
const FormProgress = ({ isInNewRoute, currentSectionIndex }) => {
  const dispatch = useDispatch();

  /**
   * Handler for section title click event.
   * Updates the current section index in the Redux store when a section is clicked.
   *
   * @param {number} index - The index of the section clicked.
   */
  const titleClickHandler = (index) => {
    // Only allow navigating to previous sections or within a new route
    if (index < currentSectionIndex || !isInNewRoute) {
      dispatch(inputActions.updateCurrentSectionIndex(index));
    }
  };

  return (
    <div className={classes.progressContainer}>
      <ul className={classes.progressList}>
        {SECTION_TITLES.map((title, index) => (
          <li
            key={index}
            style={!isInNewRoute ? { cursor: "pointer" } : {}}
            className={`
              ${classes.section}
              ${
                index === currentSectionIndex
                  ? classes.active + " " + classes.currentSection
                  : ""
              }
              ${index < currentSectionIndex ? classes.completed : ""}
            `}
            onClick={() => titleClickHandler(index)} // Trigger click handler on section title click
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
