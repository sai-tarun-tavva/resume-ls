import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
// import HelperMessage from "./HelperMessage";
import DropArea from "./DropArea";
import FileList from "./FileList";
import Button from "../../../Atoms/components/Button";
import Modal from "../../../Atoms/components/Modal";
import FloatingButton from "../../../Atoms/components/FloatingButton";
import { useLoading, useStatus, useUI } from "../../../../store";
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
 * Provides functionality to upload files through drag-and-drop or file input,
 * displays the selected files, and manages the upload process.
 *
 * @returns {JSX.Element} The rendered Upload component.
 */
const Upload = () => {
  const navigate = useNavigate();
  const { isLoading, enableButtonLoading, disableButtonLoading } = useLoading();
  const { updateStatus } = useStatus();
  const { enableRefetch } = useUI();
  const [files, setFiles] = useState([]);
  const [allowUpload, setAllowUpload] = useState(false);
  const [dummyProgress, setDummyProgress] = useState(0);
  const [unparsedFiles, setUnparsedFiles] = useState([]);
  const [parsedFilesCount, setParsedFilesCount] = useState(0);

  /**
   * Toggles the upload modal visibility and manages body overflow style.
   */
  const toggleAllowUpload = () => {
    setAllowUpload((prevValue) => {
      if (!prevValue) document.body.style.overflow = "hidden";
      else document.body.style.overflow = "";
      return !prevValue;
    });
    setFiles([]);
    setUnparsedFiles([]);
    setParsedFilesCount(0);
  };

  /**
   * Handles file selection through file input and adds selected files.
   *
   * @param {Event} event - The file input change event.
   */
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    addFiles(selectedFiles);
  };

  /**
   * Adds validated files to the list, enforcing max file limit.
   *
   * @param {File[]} selectedFiles - Array of selected files.
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
   * Handles file drag-and-drop event and adds dropped files.
   *
   * @param {DragEvent} event - The drag event.
   */
  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      const droppedFiles = Array.from(event.dataTransfer.files);
      addFiles(droppedFiles);
    },
    [addFiles]
  );

  /**
   * Handles drag over event to allow file dropping.
   *
   * @param {DragEvent} event - The drag event.
   */
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  /**
   * Removes a file from the list by its name.
   *
   * @param {string} fileName - Name of the file to be removed.
   */
  const removeFile = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const buttonText = isLoading[BUTTON]
    ? files.length === 1
      ? "Uploading 1 file..."
      : `Uploading ${dummyProgress} of ${files.length} files...`
    : CONTENT.INSIGHT.upload.button + (files.length > 1 ? "s" : "");

  /**
   * Initiates file upload process and updates upload status.
   *
   * @param {Event} event - The click event on upload button.
   */
  const handleUpload = async (event) => {
    event.preventDefault();

    if (isLoading[BUTTON]) return;

    enableButtonLoading();

    let intervalId;
    setDummyProgress(1); // Start progress at 1

    // Only set up interval for multiple files
    if (files.length > 1) {
      intervalId = setInterval(() => {
        setDummyProgress((prev) => {
          if (prev < files.length) return prev + 1;
          return prev;
        });
      }, 1500); // Increment progress every second
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("file", file));

    const { status, unparsed, uploadedCount } = await uploadFiles(formData);

    if (status === STATUS_CODES.SUCCESS) {
      if (unparsed.length === 0) {
        updateStatus({
          message: `${uploadedCount} of ${files.length} file${
            files.length > 1 ? "s" : ""
          } uploaded successfully!`,
          type: "success",
        });
        toggleAllowUpload();
      } else {
        setParsedFilesCount(uploadedCount);
        setUnparsedFiles(unparsed);
      }

      enableRefetch();
      navigate(`/${ROUTES.INSIGHT.HOME}`);
    } else {
      updateStatus({
        message: CONTENT.COMMON.serverError,
        type: "failure",
        darkMode: true,
      });
    }

    if (intervalId) clearInterval(intervalId);
    setDummyProgress(0);
    disableButtonLoading();
  };

  return (
    <>
      {allowUpload ? (
        <Modal handleClose={toggleAllowUpload}>
          {unparsedFiles.length > 0 ? (
            <div className={classes.uploadStatusContent}>
              <div className={classes.uploadStatusHeader}>
                <h5 className={classes.uploadStatusTitle}>
                  {CONTENT.INSIGHT.upload.status.title}
                </h5>
              </div>
              <div className={classes.uploadStatusBody}>
                <p className={classes.uploadStatus}>
                  <strong>{parsedFilesCount}</strong> of{" "}
                  <strong>{files.length}</strong>
                  {CONTENT.INSIGHT.upload.status.body}
                </p>

                <div className={classes.unparsedInfo}>
                  <p>{CONTENT.INSIGHT.upload.status.unparsed}</p>
                  <ul className={classes.unparsedFilesList}>
                    {unparsedFiles.map((file, index) => (
                      <li key={index} className={classes.fileItem}>
                        <span className={classes.fileIcon}>
                          <i className="bi bi-file-earmark" />
                        </span>
                        <span className={classes.fileName}>
                          {file.file_name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* <HelperMessage /> */}
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
            </>
          )}
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
