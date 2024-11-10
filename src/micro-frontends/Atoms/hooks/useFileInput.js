import { useState, useCallback } from "react";

/**
 * Custom hook to manage file input with drag-and-drop support.
 *
 * @param {File} [defaultValue=undefined] - The initial file value (if any).
 * @param {function} validateFile - Function to validate the selected file.
 * @param {boolean} [forceValidationsOnSubmit=false] - Flag to force validation on submit.
 * @returns {Object} An object containing file value, handlers, and error state.
 */
export const useFileInput = (
  defaultValue = undefined,
  validateFile = () => {},
  forceValidationsOnSubmit = false
) => {
  const [file, setFile] = useState(defaultValue);
  const [error, setError] = useState("");

  /**
   * Handles file selection changes from file input.
   *
   * @param {Event} event - The file input change event.
   */
  const handleFileChange = useCallback(
    (event) => {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setError(validateFile(selectedFile));
    },
    [validateFile]
  );

  /**
   * Handles file drop event for drag-and-drop functionality.
   *
   * @param {DragEvent} event - The drop event.
   */
  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      const selectedFile = event.dataTransfer.files[0];
      setFile(selectedFile);
      setError(validateFile(selectedFile));
    },
    [validateFile]
  );

  /**
   * Prevents default behavior for drag-over event.
   *
   * @param {DragEvent} event - The drag-over event.
   */
  const handleDragOver = useCallback((event) => {
    event.preventDefault();
  }, []);

  /**
   * Resets the file state to initial value and clears any error.
   */
  const resetFile = useCallback(() => {
    setFile(undefined);
    setError(validateFile(undefined));
  }, [validateFile]);

  /**
   * Forces validation of the current file when submitting, if enabled.
   */
  const forceValidations = useCallback(() => {
    if (forceValidationsOnSubmit) {
      setError(validateFile(file));
    }
  }, [forceValidationsOnSubmit, validateFile, file]);

  return {
    file,
    error,
    handleFileChange,
    handleDrop,
    handleDragOver,
    resetFile,
    forceValidations,
  };
};
