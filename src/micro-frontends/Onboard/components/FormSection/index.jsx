import { forwardRef } from "react";
import Onboarding from "./Onboarding";
import Personal from "./Personal";
import CurrentLocation from "./Address";
import Relocation from "./Relocation";

const FormSection = forwardRef(({ index }, ref) => {
  switch (index) {
    case 0:
      return <Onboarding ref={ref} />;
    case 1:
      return <Personal ref={ref} />;
    case 2:
      return <CurrentLocation ref={ref} />;
    case 3:
      return <Relocation ref={ref} />;
    default:
      return null;
  }
});

FormSection.displayName = "FormSection";
export default FormSection;
