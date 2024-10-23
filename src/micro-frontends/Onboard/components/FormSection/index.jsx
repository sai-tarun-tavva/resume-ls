import React from "react";
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
import classes from "./index.module.scss";

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
            <Component ref={ref} />
          </div>
        ))}
      </div>
    </div>
  );
};

FormSection.displayName = "FormSection";
export default FormSection;
