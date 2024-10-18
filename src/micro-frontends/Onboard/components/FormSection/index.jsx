import Onboarding from "./Onboarding";

const FormSection = ({ index }) => {
  return <div>{index === 0 && <Onboarding />}</div>;
};

FormSection.displayName = "FormSection";
export default FormSection;
