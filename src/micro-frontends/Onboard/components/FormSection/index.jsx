import { cloneElement } from "react";
import classes from "./index.module.scss";

const FormSection = ({ fields }) => {
  return (
    <div>
      {fields.map(({ element, ...field }, index) => {
        return (
          <div key={index} className={classes.formElement}>
            {cloneElement(element, {
              ...field,
            })}
          </div>
        );
      })}
    </div>
  );
};

FormSection.displayName = "FormSection";
export default FormSection;
