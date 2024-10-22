import { useCallback, useState } from "react";

/**
 * Custom hook to manage input values and validations.
 *
 * @param {string} defaultValue - The initial value of the input.
 * @param {function} checkForErrors - A function to validate the input value.
 * @param {function} transform - A function to transform the input value on blur.
 * @param {boolean} forceValidationsOnSubmit - Flag to force validation on submit.
 * @returns {object} An object containing input value, handlers, and error state.
 */
export const useInput = (
  defaultValue,
  checkForErrors = () => {},
  transform = (value) => value,
  forceValidationsOnSubmit = false
) => {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const errorMessage = checkForErrors(String(enteredValue).trim());

  const handleInputChange = (event, isCheckbox = false) => {
    if (isCheckbox) setEnteredValue(event.target.checked);
    else setEnteredValue(event.target.value);
    setDidEdit(false);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setDidEdit(true);
    setIsFocused(false);
    setEnteredValue(transform(enteredValue));
  };

  const resetValue = useCallback(() => {
    setEnteredValue(defaultValue);
    setDidEdit(false);
  }, [defaultValue]);

  const clearValue = useCallback(() => {
    setEnteredValue("");
    setDidEdit(false);
  }, []);

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
