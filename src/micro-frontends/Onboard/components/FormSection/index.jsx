import Onboarding from "./Onboarding";

const FormSection = ({ index }) => {
  switch (index) {
    case 0:
      return <Onboarding index={index} />;
    default:
      return null;
  }
};

FormSection.displayName = "FormSection";
export default FormSection;
