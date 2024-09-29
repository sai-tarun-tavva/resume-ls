import { useCallback, useState } from "react";

export const useInput = (
  defaultValue,
  checkForErrors = () => {},
  transform = (value) => value,
  forceValidationsOnSubmit = false
) => {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const errorMessage = checkForErrors(String(enteredValue).trim());

  const handleInputChange = (event) => {
    setEnteredValue(event.target.value);
    setDidEdit(false);
  };

  const handleInputBlur = () => {
    setDidEdit(true);

    setEnteredValue(transform(enteredValue));
  };

  const resetValue = useCallback(() => {
    setEnteredValue(defaultValue);
    setDidEdit(false);
  }, [defaultValue]);

  const forceValidations = useCallback(() => {
    if (forceValidationsOnSubmit) {
      setDidEdit(true);
    }
  }, [forceValidationsOnSubmit]);

  const showError = didEdit && errorMessage;

  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    resetValue,
    error: showError,
    forceValidations,
  };
};
