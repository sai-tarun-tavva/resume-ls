import { useState, useCallback } from "react";

/**
 * Custom hook to manage file input with drag and drop support.
 *
 * @param {File} defaultValue - The initial file value (if any).
 * @param {function} validateFile - Function to validate the selected file.
 * @param {function} transform - Function to transform the file before submission (if needed).
 * @param {boolean} forceValidationsOnSubmit - Flag to force validation on submit.
 * @returns {Object} An object containing file value, handlers, and error state.
 */
export const useFileInput = (
  defaultValue = undefined,
  validateFile = () => {},
  forceValidationsOnSubmit = false
) => {
  const [file, setFile] = useState(defaultValue);
  const [error, setError] = useState("");

  const handleFileChange = useCallback(
    (event) => {
      const selectedFile = event.target.files[0];

      setFile(selectedFile);
      setError(validateFile(selectedFile));
    },
    [validateFile]
  );

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();

      const selectedFile = event.dataTransfer.files[0];
      setFile(selectedFile);
      setError(validateFile(selectedFile));
    },
    [validateFile]
  );

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
  }, []);

  const resetFile = useCallback(() => {
    setFile(undefined);
    setError(validateFile(undefined));
  }, [validateFile]);

  const forceValidations = useCallback(() => {
    if (forceValidationsOnSubmit) {
      console.log(file);
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
