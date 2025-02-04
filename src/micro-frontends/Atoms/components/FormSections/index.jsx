import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import classes from "./index.module.scss";

/**
 * FormSections Component
 *
 * Renders the different sections of the form, controlling which section is displayed based on
 * the current section index. The sections are wrapped inside a `div` and are horizontally scrollable.
 * The component uses refs to navigate between sections.
 *
 * @param {Object} props - The component props.
 * @param {number} props.currentSectionIndex - The index of the current section to be displayed.
 * @param {Object} props.sections - The array of sections with each reference and corresponding component.
 * @returns {JSX.Element} The rendered FormSections component.
 */
const FormSections = ({ currentSectionIndex, sections }) => {
  // Get the current route location to check if we're in the "new" route for the form section
  const routeLocation = useLocation();
  const isInNewRoute = routeLocation.pathname.endsWith("new");

  return (
    <div className={classes.sectionsWrapper}>
      <div
        className={classes.sectionsContent}
        style={{ transform: `translateX(-${currentSectionIndex * 100}%)` }}
      >
        {sections.map(({ Component, ref }, index) => (
          <div
            key={index}
            className={`${classes.section} ${
              currentSectionIndex === index ? classes.current : ""
            }`}
            ref={ref}
          >
            {/* Render each section and pass `isInNewRoute` to each section component */}
            <Component ref={ref} isInNewRoute={isInNewRoute} />
          </div>
        ))}
      </div>
    </div>
  );
};

FormSections.propTypes = {
  currentSectionIndex: PropTypes.number.isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      Component: PropTypes.elementType.isRequired,
      ref: PropTypes.object.isRequired,
    })
  ),
};

FormSections.displayName = "FormSections";
export default FormSections;
