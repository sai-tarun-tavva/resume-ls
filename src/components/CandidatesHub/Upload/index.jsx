import { useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DropArea from "./DropArea";
import FileList from "./FileList";
import Button from "../../Atoms/Button";
import Modal from "../../Atoms/Modal";
import { LoadingContext, StatusMsgContext } from "../../../store";
import { content, END_POINTS, ROUTES } from "../../../constants";
import "bootstrap-icons/font/bootstrap-icons.css";
import classes from "./index.module.css";

const Upload = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [allowUpload, setAllowUpload] = useState(false);
  const { handleViewStatus } = useContext(StatusMsgContext);
  const {
    isSendingPostPatchRequest: isLoading,
    handleSendingPostPatchRequest: setLoading,
  } = useContext(LoadingContext);

  const toggleAllowUpload = () => {
    setAllowUpload((prevValue) => {
      if (!prevValue) document.body.style.overflow = "hidden";
      else document.body.style.overflow = "";
      return !prevValue;
    });
  };

  // Handle file selection through input
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    addFiles(selectedFiles);
  };

  // Add files to the list, ensuring they are valid
  const addFiles = useCallback(
    (selectedFiles) => {
      const validFiles = selectedFiles.filter(
        (file) =>
          (file.type === "application/pdf" ||
            file.type === "application/msword" ||
            file.type ===
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document") &&
          !files.some((existingFile) => existingFile.name === file.name)
      );

      setFiles((prevFiles) => [...validFiles, ...prevFiles]);
    },
    [files]
  );

  // Handle file drag and drop
  const handleDrop = useCallback(
    (event) => {
      event.preventDefault(); // Prevent default behavior (Prevent file from being opened)
      const droppedFiles = Array.from(event.dataTransfer.files);
      addFiles(droppedFiles);
    },
    [addFiles]
  );

  const handleDragOver = (event) => {
    event.preventDefault(); // Prevent default behavior to allow dropping
  };

  const removeFile = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const buttonText = isLoading
    ? `Uploading ${files.length} file${files.length > 1 ? "s" : ""}...`
    : files.length > 1
    ? "Upload Files"
    : "Upload File";

  const handleUpload = async (event) => {
    event.preventDefault();

    if (isLoading) return;

    setLoading();

    // API call logic to upload files
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
