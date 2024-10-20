import { forwardRef, useImperativeHandle } from "react";
import InputV2 from "../../../../Atoms/components/Inputs/InputV2";
import { useInput } from "../../../../Atoms/hooks";
import { onboardingValidations } from "../../../../../utilities";
import classes from "./index.module.scss";

const Certificate = forwardRef(({ defaultValue, id }, ref) => {
  const { education: validations } = onboardingValidations;
  const {
    value: certificateValue,
    handleInputChange: certificateChange,
    handleInputBlur: certificateBlur,
    handleInputFocus: certificateFocus,
    error: certificateError,
    isFocused: certificateFocused,
    forceValidations: forceCertificateValidations,
  } = useInput(defaultValue, validations.certificate, undefined, true);

  const allErrors = [certificateError];

  const allValues = [certificateValue];

  const noErrors = allErrors.every((error) => !error); // Ensure no errors
  const allValuesPresent = allValues.every((value) => value); // Ensure all values are filled

  const isSectionValid = noErrors && allValuesPresent;

  const forceValidations = () => {
    forceCertificateValidations();
  };

  const submit = () => {
    if (!isSectionValid) {
      forceValidations();
      return { isSectionValid: false, item: certificateValue };
    }

    return { isSectionValid: true, item: certificateValue };
  };

  useImperativeHandle(ref, () => ({
    submit,
  }));

  return (
    <InputV2
      id={`Certificate ${id}`}
      label={`Certificate ${id}`}
      value={certificateValue}
      changeHandler={certificateChange}
      blurHandler={certificateBlur}
      focusHandler={certificateFocus}
      isFocused={certificateFocused}
      error={certificateError}
      extraClass={classes.fullInputWidth}
      isRequired
    />
  );
});

Certificate.displayName = "Certificate";
export default Certificate;
