import { cloneElement } from "react";
import { sections } from "../../../constants";
import classes from "./index.module.scss";

const Onboarding = () => {
  const fields = sections[0].fields;

  return (
    <>
      {fields.map(({ element, ...field }, index) => {
        return (
          <div key={index} className={classes.formElement}>
            {cloneElement(element, {
              ...field,
            })}
          </div>
        );
      })}
    </>
  );
};

Onboarding.displayName = "FormOnboarding";
export default Onboarding;
