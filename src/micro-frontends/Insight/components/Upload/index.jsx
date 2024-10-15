import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HelperMessage from "./HelperMessage";
import DropArea from "./DropArea";
import FileList from "./FileList";
import Button from "../../../Atoms/components/Button";
import Modal from "../../../Atoms/components/Modal";
import { loadingActions, statusActions, uiActions } from "../../../../store";
import { isValidFile, uploadFiles } from "../../../../utilities";
import {
  CONTENT,
  MAX_FILES,
  MAX_FILE_SIZE,
  ROUTES,
  STATUS_CODES,
} from "../../../../constants";
import classes from "./index.module.scss";

/**
 * Upload Component
 *
 * Manages file uploads in the application.
 * It provides functionality to upload files through drag-and-drop or file input,
 * displays the selected files, and manages the upload process.
 *
 * @returns {JSX.Element} The rendered Upload component.
 */
const Upload = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isButtonLoading: isLoading } = useSelector((state) => state.loading);
  const [files, setFiles] = useState([]);
  const [allowUpload, setAllowUpload] = useState(false);

  /**
   * Toggles the upload modal visibility and manages body overflow style.
   */
  const toggleAllowUpload = () => {
    setAllowUpload((prevValue) => {
      if (!prevValue) document.body.style.overflow = "hidden";
      else document.body.style.overflow = "";
      return !prevValue;
    });
  };

  /**
   * Handles file selection through input and adds selected files.
   * @param {Event} event - The file input change event.
   */
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    addFiles(selectedFiles);
  };

  /**
   * Adds files to the list after validating them.
   * @param {File[]} selectedFiles - The array of selected files.
   */
  const addFiles = useCallback(
    (selectedFiles) => {
      const validFiles = selectedFiles.filter(
        (file) =>
          isValidFile(file) &&
          !files.some((existingFile) => existingFile.name === file.name)
      );

      if (
        files.length + validFiles.length > MAX_FILES ||
        selectedFiles.length - validFiles.length > 0
      ) {
        dispatch(
          statusActions.updateStatus({
            message: CONTENT.candidateHub.upload.errors.maxFiles
              .replace("{{MAX_FILES}}", MAX_FILES)
              .replace("{{MAX_FILE_SIZE}}", MAX_FILE_SIZE),
            type: "failure",
            darkMode: true,
          })
        );
        validFiles.splice(MAX_FILES - files.length); // Ensure we don't exceed the limit
      }

      setFiles((prevFiles) => [...validFiles, ...prevFiles]);
    },
    [files, dispatch]
  );

  /**
   * Handles file drag-and-drop event.
   * @param {DragEvent} event - The drag event.
   */
  const handleDrop = useCallback(
    (event) => {
      event.preventDefault(); // Prevent default behavior (Prevent file from being opened)
      const droppedFiles = Array.from(event.dataTransfer.files);
      addFiles(droppedFiles);
    },
    [addFiles]
  );

  /**
   * Handles drag over event to allow dropping.
   * @param {DragEvent} event - The drag event.
   */
  const handleDragOver = (event) => {
    event.preventDefault(); // Prevent default behavior to allow dropping
  };

  /**
   * Removes a file from the list based on its name.
   * @param {string} fileName - The name of the file to be removed.
   */
  const removeFile = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const buttonText = isLoading
    ? `Uploading ${files.length} file${files.length > 1 ? "s" : ""}...`
    : CONTENT.candidateHub.upload.button + (files.length > 1 ? "s" : "");

  /**
   * Handles file upload on button click.
   * @param {Event} event - The click event.
   */
  const handleUpload = async (event) => {
    event.preventDefault();

    if (isLoading) return;

    dispatch(loadingActions.enableButtonLoading());

    // Prepare form data for upload
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("file", file);
    });

    const { status } = await uploadFiles(formData);

    if (status === STATUS_CODES.SUCCESS) {
      dispatch(
        statusActions.updateStatus({
          message: `${files.length} file${
            files.length > 1 ? "s" : ""
          } uploaded successfully!`,
          type: "success",
        })
      );
      setFiles([]); // Clear files after successful upload
      toggleAllowUpload();
      dispatch(uiActions.enableRefetch());
      navigate(`/${ROUTES.INSIGHT.HOME}`);
    } else {
      dispatch(
        statusActions.updateStatus({
          message: CONTENT.serverError,
          type: "failure",
          darkMode: true,
        })
      );
    }
    dispatch(loadingActions.disableButtonLoading());
  };

  return (
    <>
      {allowUpload ? (
        <Modal handleClose={toggleAllowUpload}>
          {/* Drag and Drop Area */}
          <HelperMessage />
          <form className={classes.uploadFormContainer}>
            <DropArea
              handleDrop={handleDrop}
              handleDragOver={handleDragOver}
              handleFileChange={handleFileChange}
            />
            <FileList
              files={files}
              handleDeleteFile={(fileName) => removeFile(fileName)}
            />
            <Button
              disabled={files.length === 0}
              onClick={handleUpload}
              className={`${classes.uploadButton} ${
                isLoading ? "loading" : ""
              }`}
            >
              {buttonText}
            </Button>
          </form>
        </Modal>
      ) : (
        <Button
          className={`${classes.upload} upload-global`}
          title="Upload New Resume"
          onClick={toggleAllowUpload}
        >
          <i className="bi bi-upload"></i>
        </Button>
      )}
    </>
  );
};

Upload.displayName = "Upload";
export default Upload;
