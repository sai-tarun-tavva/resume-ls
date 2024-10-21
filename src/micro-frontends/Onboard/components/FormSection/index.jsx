import React, { useMemo, useRef } from "react";
import Onboarding from "./Onboarding";
import Personal from "./Personal";
import Location from "./Location";
import Relocation from "./Relocation";
import Education from "./Education";
import Profession from "./Profession";
import classes from "./index.module.scss";
import { useScrollShadows } from "../../hooks/useScrollShadows";

const FormSection = ({
  currentSectionIndex,
  refs: { onboarding, personal, location, relocation, education, profession },
}) => {
  const onboardingRef = useRef();
  const personalRef = useRef();
  const locationRef = useRef();
  const relocationRef = useRef();
  const educationRef = useRef();
  const professionRef = useRef();

  const sectionRefs = useMemo(
    () => ({
      onboarding: onboardingRef,
      personal: personalRef,
      location: locationRef,
      relocation: relocationRef,
      education: educationRef,
      profession: professionRef,
    }),
    []
  );

  const scrollShadows = useScrollShadows(
    Object.values(sectionRefs)[currentSectionIndex],
    currentSectionIndex
  );

  const sections = [
    { Component: Onboarding, ref: onboarding },
    { Component: Personal, ref: personal },
    { Component: Location, ref: location },
    { Component: Relocation, ref: relocation },
    { Component: Education, ref: education },
    { Component: Profession, ref: profession },
  ];

  return (
    <div className={classes.sectionsWrapper}>
      <div className={classes.shadows}>
        {scrollShadows.top && <div className={classes.topShadow} />}
        {scrollShadows.bottom && <div className={classes.bottomShadow} />}
      </div>
      <div
        className={classes.sectionsContent}
        style={{ transform: `translateX(-${currentSectionIndex * 100}%)` }}
      >
        {sections.map(({ Component, ref }, index) => (
          <div
            key={index}
            className={classes.section}
            ref={sectionRefs[Object.keys(sectionRefs)[index]]}
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
