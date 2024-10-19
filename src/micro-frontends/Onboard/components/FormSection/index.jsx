import Onboarding from "./Onboarding";
import Personal from "./Personal";
import CurrentLocation from "./Address";
import Relocation from "./Relocation";

const FormSection = ({ index }) => {
  switch (index) {
    case 0:
      return <Onboarding />;
    case 1:
      return <Personal />;
    case 2:
      return <CurrentLocation />;
    case 3:
      return <Relocation />;
    default:
      return null;
  }
};

FormSection.displayName = "FormSection";
export default FormSection;
