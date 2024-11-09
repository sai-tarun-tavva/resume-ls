import { useCallback, useState } from "react";
import { INPUT_TYPES } from "../../../constants";

/**
 * Custom hook to manage input values and validations.
 *
 * @param {string} defaultValue - The initial value of the input.
 * @param {function} checkForErrors - A function to validate the input value.
 * @param {function} transform - A function to transform the input value on blur.
 * @param {boolean} forceValidationsOnSubmit - Flag to force validation on submit.
 * @param {string} inputType - Type of the input, e.g., text or checkbox.
 * @returns {object} An object containing input value, handlers, and error state.
 */
export const useInput = (
  defaultValue,
  checkForErrors = () => {},
  transform = (value) => value,
  forceValidationsOnSubmit = false,
  inputType = ""
) => {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const errorMessage = checkForErrors(String(enteredValue).trim());

  /**
   * Handles input value changes based on input type.
   *
   * @param {Event} event - The input change event.
   */
  const handleInputChange = (event) => {
    switch (inputType) {
      case INPUT_TYPES.CHECKBOX:
        setEnteredValue(event.target.checked);
        break;
      default:
        setEnteredValue(event.target.value);
    }
    setDidEdit(false);
  };

  /**
   * Sets the input focus state.
   */
  const handleInputFocus = () => {
    setIsFocused(true);
  };

  /**
   * Handles input blur event, applying transformations if specified.
   */
  const handleInputBlur = () => {
    setDidEdit(true);
    setIsFocused(false);
    setEnteredValue(transform(enteredValue));
  };

  /**
   * Resets the input value to its default and clears the edit state.
   */
  const resetValue = useCallback(() => {
    setEnteredValue(defaultValue);
    setDidEdit(false);
  }, [defaultValue]);

  /**
   * Clears the input value and resets the edit state.
   */
  const clearValue = useCallback(() => {
    setEnteredValue("");
    setDidEdit(false);
  }, []);

  /**
   * Forces validation checks by setting the `didEdit` state.
   */
  const forceValidations = useCallback(() => {
    if (forceValidationsOnSubmit) {
      setDidEdit(true);
    }
  }, [forceValidationsOnSubmit]);

  const showError = didEdit ? errorMessage : "";

  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    handleInputFocus,
    resetValue,
    clearValue,
    error: showError,
    isFocused,
    forceValidations,
  };
};
