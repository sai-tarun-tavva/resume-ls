import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import HelperMessage from "./HelperMessage";
import DropArea from "./DropArea";
import FileList from "./FileList";
import Button from "../../../Atoms/components/Button";
import Modal from "../../../Atoms/components/Modal";
import FloatingButton from "../../../Atoms/components/FloatingButton";
import { uiActions } from "../../store";
import { useLoading, useStatus } from "../../../../store";
import { isValidFile, uploadFiles } from "../../../../utilities";
import {
  CONTENT,
  INSIGHT,
  LOADING_ACTION_TYPES,
  ROUTES,
  STATUS_CODES,
} from "../../../../constants";
import classes from "./index.module.scss";

const { MAX_FILES, MAX_FILE_SIZE } = INSIGHT;
const { BUTTON } = LOADING_ACTION_TYPES;

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
  const [files, setFiles] = useState([]);
  const [allowUpload, setAllowUpload] = useState(false);
  const { isLoading, enableButtonLoading, disableButtonLoading } = useLoading();
  const { updateStatus } = useStatus();

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
        updateStatus({
          message: CONTENT.INSIGHT.statusMessages.upload.maxFiles
            .replace("{{MAX_FILES}}", MAX_FILES)
            .replace("{{MAX_FILE_SIZE}}", MAX_FILE_SIZE),
          type: "failure",
          darkMode: true,
        });
        validFiles.splice(MAX_FILES - files.length); // Ensure we don't exceed the limit
      }

      setFiles((prevFiles) => [...validFiles, ...prevFiles]);
    },
    [files, updateStatus]
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

  const buttonText = isLoading[BUTTON]
    ? `Uploading ${files.length} file${files.length > 1 ? "s" : ""}...`
    : CONTENT.INSIGHT.upload.button + (files.length > 1 ? "s" : "");

  /**
   * Handles file upload on button click.
   * @param {Event} event - The click event.
   */
  const handleUpload = async (event) => {
    event.preventDefault();

    if (isLoading[BUTTON]) return;

    enableButtonLoading();

    // Prepare form data for upload
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("file", file);
    });

    const { status } = await uploadFiles(formData);

    if (status === STATUS_CODES.SUCCESS) {
      updateStatus({
        message: `${files.length} file${
          files.length > 1 ? "s" : ""
        } uploaded successfully!`,
        type: "success",
      });
      setFiles([]); // Clear files after successful upload
      toggleAllowUpload();
      dispatch(uiActions.enableRefetch());
      navigate(`/${ROUTES.INSIGHT.HOME}`);
    } else {
      updateStatus({
        message: CONTENT.COMMON.serverError,
        type: "failure",
        darkMode: true,
      });
    }
    disableButtonLoading();
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
                isLoading[BUTTON] ? "loading" : ""
              }`}
            >
              {buttonText}
            </Button>
          </form>
        </Modal>
      ) : (
        <FloatingButton
          title="Upload New Resume"
          clickHandler={toggleAllowUpload}
          icon={<i className="bi bi-upload" />}
        />
      )}
    </>
  );
};

Upload.displayName = "Upload";
export default Upload;
