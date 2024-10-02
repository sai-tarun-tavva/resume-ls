import { useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import HelperMessage from "./HelperMessage";
import DropArea from "./DropArea";
import FileList from "./FileList";
import Button from "../../Atoms/Button";
import Modal from "../../Atoms/Modal";
import { DataContext, LoadingContext, StatusMsgContext } from "../../../store";
import { content, END_POINTS, MAX_FILES, ROUTES } from "../../../constants";
import "bootstrap-icons/font/bootstrap-icons.css";
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
  const [files, setFiles] = useState([]);
  const [allowUpload, setAllowUpload] = useState(false);
  const { setShouldRefetch } = useContext(DataContext);
  const { handleViewStatus } = useContext(StatusMsgContext);
  const {
    isSendingPostPatchRequest: isLoading,
    handleToggleSendingPostPatchRequest: setLoading,
  } = useContext(LoadingContext);

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
          (file.type === "application/pdf" ||
            file.type === "application/msword" ||
            file.type ===
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
            file.type === "text/plain") &&
          !files.some((existingFile) => existingFile.name === file.name)
      );

      if (files.length + validFiles.length > MAX_FILES) {
        handleViewStatus(
          `Only first ${MAX_FILES} files are being uploaded. Extra files were excluded.`,
          "error",
          true
        );
        validFiles.splice(MAX_FILES - files.length); // Ensure we don't exceed the limit
      }

      setFiles((prevFiles) => [...validFiles, ...prevFiles]);
    },
    [files, handleViewStatus]
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
    : content.candidateHub.upload.button + (files.length > 1 ? "s" : "");

  /**
   * Handles file upload on button click.
   * @param {Event} event - The click event.
   */
  const handleUpload = async (event) => {
    event.preventDefault();

    if (isLoading) return;

    setLoading();

    // Prepare form data for upload
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch(END_POINTS.UPLOAD_RESUME, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        handleViewStatus(
          `${files.length} file${
            files.length > 1 ? "s" : ""
          } uploaded successfully!`,
          "success"
        );
        setFiles([]); // Clear files after successful upload
        toggleAllowUpload();
        setShouldRefetch(true);
        navigate(`/${ROUTES.HOME}`);
      } else {
        handleViewStatus(
          `Failed to upload file${files.length > 1 ? "s" : ""}.`,
          "failure",
          true
        );
        console.error("Upload failed:", response.statusText);
      }
    } catch (error) {
      handleViewStatus(
        content.candidateHub.upload.errors.formUploadRequest.network,
        "failure",
        true
      );
      console.error(
        content.candidateHub.upload.errors.formUploadRequest.network,
        error
      );
    } finally {
      setLoading();
    }
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
