import { useState } from "react";

export const useInput = (
  defaultValue,
  checkForErrors = () => {},
  transform = (value) => value
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

  const resetValue = () => {
    setEnteredValue(defaultValue);
    setDidEdit(false);
  };

  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    resetValue,
    error: didEdit && errorMessage,
  };
};
