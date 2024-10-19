import Onboarding from "./Onboarding";
import Personal from "./Personal";
import CurrentLocation from "./Address";

const FormSection = ({ index }) => {
  switch (index) {
    case 0:
      return <Onboarding />;
    case 1:
      return <Personal />;
    case 2:
      return <CurrentLocation />;
    default:
      return null;
  }
};

FormSection.displayName = "FormSection";
export default FormSection;
