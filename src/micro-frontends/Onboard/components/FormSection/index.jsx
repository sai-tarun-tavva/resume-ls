import { useMemo, useRef } from "react";
import Onboarding from "./Onboarding";
import Personal from "./Personal";
import CurrentLocation from "./CurrentLocation";
import Relocation from "./Relocation";
import Education from "./Education";
import classes from "./index.module.scss";
import { useScrollShadows } from "../../hooks/useScrollShadows";

const FormSection = ({
  currentSectionIndex,
  refs: { onboarding, personal, location, relocation, education },
}) => {
  const onboardingRef = useRef();
  const personalRef = useRef();
  const locationRef = useRef();
  const relocationRef = useRef();
  const educationRef = useRef();

  const sectionRefs = useMemo(() => {
    return {
      onboarding: onboardingRef,
      personal: personalRef,
      location: locationRef,
      relocation: relocationRef,
      education: educationRef,
    };
  }, []);

  const scrollShadows = useScrollShadows(
    Object.values(sectionRefs)[currentSectionIndex],
    currentSectionIndex
  );

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
        <div className={classes.section} ref={sectionRefs.onboarding}>
          <Onboarding ref={onboarding} />
        </div>
        <div className={classes.section} ref={sectionRefs.personal}>
          <Personal ref={personal} />
        </div>
        <div className={classes.section} ref={sectionRefs.location}>
          <CurrentLocation ref={location} />
        </div>
        <div className={classes.section} ref={sectionRefs.relocation}>
          <Relocation ref={relocation} />
        </div>
        <div className={classes.section} ref={sectionRefs.education}>
          <Education ref={education} />
        </div>
      </div>
    </div>
  );
};

FormSection.displayName = "FormSection";
export default FormSection;
