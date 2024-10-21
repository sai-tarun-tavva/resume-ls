import { forwardRef, useImperativeHandle } from "react";
import InputV2 from "../../../../Atoms/components/Inputs/InputV2";
import { useInput } from "../../../../Atoms/hooks";
import classes from "./index.module.scss";
import { determineSectionValidity } from "../../../../../utilities";

const SingleInput = forwardRef(
  ({ labels, defaultValue, validationFuncs, id }, ref) => {
    const {
      value: singleInputValue,
      handleInputChange: singleInputChange,
      handleInputBlur: singleInputBlur,
      handleInputFocus: singleInputFocus,
      error: singleInputError,
      isFocused: singleInputFocused,
      forceValidations: forceSingleInputValidations,
    } = useInput(defaultValue, validationFuncs.input, undefined, true);

    const allErrors = [singleInputError];
    const allValues = [singleInputValue];

    const isSectionValid = determineSectionValidity(allErrors, allValues);

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
        id={`${labels.input} ${id}`}
        label={`${labels.input} ${id}`}
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
  }
);

SingleInput.displayName = "SingleInput";
export default SingleInput;
