import { forwardRef, useImperativeHandle } from "react";
import InputV2 from "../../../../Atoms/components/Inputs/InputV2";
import { useInput } from "../../../../Atoms/hooks";
import { onboardingValidations } from "../../../../../utilities";
import classes from "./index.module.scss";

const SingleInput = forwardRef(({ label, defaultValue, id }, ref) => {
  const { education: validations } = onboardingValidations;
  const {
    value: singleInputValue,
    handleInputChange: singleInputChange,
    handleInputBlur: singleInputBlur,
    handleInputFocus: singleInputFocus,
    error: singleInputError,
    isFocused: singleInputFocused,
    forceValidations: forceSingleInputValidations,
  } = useInput(defaultValue, validations.singleInput, undefined, true);

  const allErrors = [singleInputError];

  const allValues = [singleInputValue];

  const noErrors = allErrors.every((error) => !error); // Ensure no errors
  const allValuesPresent = allValues.every((value) => value); // Ensure all values are filled

  const isSectionValid = noErrors && allValuesPresent;

  const forceValidations = () => {
    forceSingleInputValidations();
  };

  const submit = () => {
    if (!isSectionValid) {
      forceValidations();
      return { isSectionValid: false, item: singleInputValue };
    }

    return { isSectionValid: true, item: singleInputValue };
  };

  useImperativeHandle(ref, () => ({
    submit,
  }));

  return (
    <InputV2
      id={`${label} ${id}`}
      label={`${label} ${id}`}
      value={singleInputValue}
      changeHandler={singleInputChange}
      blurHandler={singleInputBlur}
      focusHandler={singleInputFocus}
      isFocused={singleInputFocused}
      error={singleInputError}
      extraClass={classes.fullInputWidth}
      isRequired
    />
  );
});

SingleInput.displayName = "SingleInput";
export default SingleInput;
