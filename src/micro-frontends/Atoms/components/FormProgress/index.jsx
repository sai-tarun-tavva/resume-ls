import PropTypes from "prop-types"; // Import PropTypes for validation
import classes from "./index.module.scss";

/**
 * FormProgress Component
 *
 * Displays a progress bar that shows the current section of the form.
 * Users can click on previous sections to navigate through the form.
 *
 * @param {Object} props - Props for the FormProgress component.
 * @param {boolean} props.isInNewRoute - Determines if the form is in a new route (navigation restrictions).
 * @param {number} props.currentSectionIndex - The index of the current active section.
 * @param {Function} props.titleClickHandler - Function to handle clicks on section titles.
 * @param {Array<string>} props.titles - An array of section titles.
 * @returns {JSX.Element} The rendered FormProgress component.
 */
const FormProgress = ({
  isInNewRoute,
  currentSectionIndex,
  titleClickHandler,
  titles,
}) => {
  return (
    <div className={classes.progressContainer}>
      <ul className={classes.progressList}>
        {titles.map((title, index) => (
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

/**
 * PropTypes validation for the FormProgress component.
 */
FormProgress.propTypes = {
  isInNewRoute: PropTypes.bool.isRequired,
  currentSectionIndex: PropTypes.number.isRequired,
  titleClickHandler: PropTypes.func.isRequired,
  titles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default FormProgress;
