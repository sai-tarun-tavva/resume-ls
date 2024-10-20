import Onboarding from "./Onboarding";
import Personal from "./Personal";
import CurrentLocation from "./CurrentLocation";
import Relocation from "./Relocation";
import Education from "./Education";
import classes from "./index.module.scss";

const FormSection = ({
  currentSectionIndex,
  refs: { onboarding, personal, location, relocation, education },
}) => {
  return (
    <div
      className={classes.sectionsWrapper}
      style={{ transform: `translateX(-${currentSectionIndex * 100}%)` }}
    >
      <div className={classes.section}>
        <Onboarding ref={onboarding} />
      </div>
      <div className={classes.section}>
        <Personal ref={personal} />
      </div>
      <div className={classes.section}>
        <CurrentLocation ref={location} />
      </div>
      <div className={classes.section}>
        <Relocation ref={relocation} />
      </div>
      <div className={classes.section}>
        <Education ref={education} />
      </div>
    </div>
  );
};

FormSection.displayName = "FormSection";
export default FormSection;
