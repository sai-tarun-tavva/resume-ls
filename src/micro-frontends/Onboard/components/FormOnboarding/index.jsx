import InputV2 from "../../../Atoms/components/InputV2";
import Select from "../../../Atoms/components/Select";
import classes from "./index.module.scss";

const FormOnboarding = () => {
  return (
    <div className={classes.onboardingContainer}>
      <h3>Onboarding</h3>
      <div className={classes.row}>
        <InputV2 extraClass={classes.extraClass} />
        <Select extraClass={classes.extraClass} />
      </div>
    </div>
  );
};

FormOnboarding.displayName = "FormOnboarding";
export default FormOnboarding;
