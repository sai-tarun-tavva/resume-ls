import { useLocation } from "react-router-dom";
import Onboarding from "./Onboarding";
import Personal from "./Personal";
import Location from "./Location";
import Relocation from "./Relocation";
import Education from "./Education";
import Profession from "./Profession";
import OfferLetter from "./OfferLetter";
import USTravelAndStay from "./USTravelAndStay";
import EmergencyContacts from "./EmergencyContacts";
import Miscellaneous from "./Miscellaneous";
import { ROUTES } from "../../../../constants";
import classes from "./index.module.scss";
import PropTypes from "prop-types";

/**
 * FormSection Component
 *
 * Renders the different sections of the form, controlling which section is displayed based on
 * the current section index. The sections are wrapped inside a `div` and are horizontally scrollable.
 * The component uses refs to navigate between sections.
 *
 * @param {Object} props - The component props.
 * @param {number} props.currentSectionIndex - The index of the current section to be displayed.
 * @param {Object} props.refs - The references for each form section.
 * @param {React.Ref} props.refs.onboarding - Ref for the onboarding section.
 * @param {React.Ref} props.refs.personal - Ref for the personal section.
 * @param {React.Ref} props.refs.location - Ref for the location section.
 * @param {React.Ref} props.refs.relocation - Ref for the relocation section.
 * @param {React.Ref} props.refs.education - Ref for the education section.
 * @param {React.Ref} props.refs.profession - Ref for the profession section.
 * @param {React.Ref} props.refs.offerLetter - Ref for the offer letter section.
 * @param {React.Ref} props.refs.usTravelAndStay - Ref for the US travel and stay section.
 * @param {React.Ref} props.refs.emergencyContacts - Ref for the emergency contacts section.
 * @param {React.Ref} props.refs.miscellaneous - Ref for the miscellaneous section.
 * @returns {JSX.Element} The rendered FormSection component.
 */
const FormSection = ({
  currentSectionIndex,
  refs: {
    onboarding,
    personal,
    location,
    relocation,
    education,
    profession,
    offerLetter,
    usTravelAndStay,
    emergencyContacts,
    miscellaneous,
  },
}) => {
  // Get the current route location to check if we're in the "new" route for the onboarding section
  const routeLocation = useLocation();
  const isInNewRoute = routeLocation.pathname.endsWith(
    ROUTES.ONBOARD.CANDIDATE_FORM.NEW
  );

  // Array of section components and their corresponding refs
  const sections = [
    { Component: Onboarding, ref: onboarding },
    { Component: Personal, ref: personal },
    { Component: Location, ref: location },
    { Component: Relocation, ref: relocation },
    { Component: Education, ref: education },
    { Component: Profession, ref: profession },
    { Component: OfferLetter, ref: offerLetter },
    { Component: USTravelAndStay, ref: usTravelAndStay },
    { Component: EmergencyContacts, ref: emergencyContacts },
    { Component: Miscellaneous, ref: miscellaneous },
  ];

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

FormSection.propTypes = {
  currentSectionIndex: PropTypes.number.isRequired,
  refs: PropTypes.shape({
    onboarding: PropTypes.object.isRequired,
    personal: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    relocation: PropTypes.object.isRequired,
    education: PropTypes.object.isRequired,
    profession: PropTypes.object.isRequired,
    offerLetter: PropTypes.object.isRequired,
    usTravelAndStay: PropTypes.object.isRequired,
    emergencyContacts: PropTypes.object.isRequired,
    miscellaneous: PropTypes.object.isRequired,
  }).isRequired,
};

FormSection.displayName = "FormSection";
export default FormSection;
