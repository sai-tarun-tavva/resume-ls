import { useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Atoms/Button";
import Modal from "../../Atoms/Modal";
import { LoadingContext, StatusMsgContext } from "../../../store";
import { formatFileSize, getFileIcon } from "../../../utilities";
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
      const response = await fetch(
        "https://something.free.beeceptor.com/home/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        handleViewStatus(
          `${files.length} file${
            files.length > 1 ? "s" : ""
          } uploaded successfully!`,
          "success",
          true
        );
        setFiles([]); // Clear files after successful upload
        toggleAllowUpload();
        navigate("/candidates");
      } else {
        handleViewStatus(
          `Failed to upload file${files.length > 1 ? "s" : ""}.`,
          "failure",
          true
        );
        console.error("Upload failed:", response.statusText);
      }
    } catch (error) {
      handleViewStatus("An error occurred during the upload.", "failure", true);
      console.error("Error during upload:", error);
    } finally {
      setLoading();
    }
  };

  return (
    <>
      {allowUpload ? (
        <Modal handleClose={toggleAllowUpload}>
          {/* Drag and Drop Area */}
          <form className={classes["upload-form-container"]}>
            <div
              className={classes.dropArea}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <input
                type="file"
                id="fileInput"
                multiple
                accept=".doc,.docx,.pdf"
                onChange={handleFileChange}
                className={classes.fileInput}
              />
              <i className="bi bi-cloud-arrow-up-fill"></i>
              <p>Drag and drop or click here</p>
              <small>to choose your files</small>
            </div>

            <small className={classes.infoText}>
              Only DOC, DOCX, and PDF files are accepted. All DOC and DOCX files
              will be automatically converted to PDF before uploading.
            </small>

            <div className={classes.fileList}>
              {files.map((file) => (
                <div key={file.name} className={classes.fileItem}>
                  {getFileIcon(file.name)}
                  <span>
                    {file.name}{" "}
                    <small className={classes.fileSize}>
                      ({formatFileSize(file.size)})
                    </small>
                  </span>
                  <button
                    onClick={() => removeFile(file.name)}
                    className={classes.closeButton}
                  >
                    <i className="bi bi-x" />
                  </button>
                </div>
              ))}
            </div>

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
