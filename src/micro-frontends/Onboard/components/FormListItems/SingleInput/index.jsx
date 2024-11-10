import { forwardRef, useImperativeHandle } from "react";
import InputV2 from "../../../../Atoms/components/Inputs/InputV2";
import { useInput } from "../../../../Atoms/hooks";
import classes from "./index.module.scss";
import { determineSectionValidity } from "../../../../../utilities";

/**
 * SingleInput Component
 *
 * A reusable input component that handles single input validation and state management.
 * It validates input using the provided validation function and manages focus and blur events.
 *
 * @param {Object} labels - The labels for the input field.
 * @param {string} defaultValue - The initial value for the input field.
 * @param {Object} validationFuncs - The validation functions for the input field.
 * @param {string} id - The identifier for the input field.
 */
const SingleInput = forwardRef(
  ({ labels, defaultValue, validationFuncs, id }, ref) => {
    // Handling input state and validations using custom hook
    const {
      value: singleInputValue,
      handleInputChange: singleInputChange,
      handleInputBlur: singleInputBlur,
      handleInputFocus: singleInputFocus,
      error: singleInputError,
      isFocused: singleInputFocused,
      forceValidations: forceSingleInputValidations,
    } = useInput(defaultValue, validationFuncs.input, undefined, true);

    // Group all errors and values dynamically
    const allErrors = [singleInputError];
    const allValues = [singleInputValue];

    const isSectionValid = determineSectionValidity(allErrors, allValues);

    /**
     * Force validations for the input field.
     */
    const forceValidations = () => {
      forceSingleInputValidations();
    };

    /**
     * Handles form submission for this input field.
     * Validates the field and returns its validity and value.
     *
     * @returns {Object} - Contains validation status and input value.
     */
    const submit = () => {
      if (!isSectionValid) {
        forceValidations();
        return { isSectionValid: false, item: singleInputValue };
      }

      return { isSectionValid: true, item: singleInputValue };
    };

    // Exposing the submit method to the parent component
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
