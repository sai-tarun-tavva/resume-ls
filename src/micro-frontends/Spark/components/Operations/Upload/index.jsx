import PropTypes from "prop-types";
import { CONTENT } from "../../../../../constants";
import classes from "./index.module.scss";

/**
 * Upload Component
 *
 * Handles file uploads with drag-and-drop functionality.
 *
 * @param {Object} props - The component props.
 * @param {File} props.file - The selected file.
 * @param {function} props.setFile - Function to set the file.
 * @param {string} props.error - Error message related to file upload.
 * @param {function} props.setError - Function to set the error message.
 * @returns {JSX.Element} The upload component.
 */
const Upload = ({ file, setFile, error, setError }) => {
  const { drag, browse, error: errorMessage } = CONTENT.SPARK.operations.upload;

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError("");
    } else {
      setError(errorMessage);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setError("");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes.upload}>
      <div
        className={`${classes.dropzone} ${file ? classes.active : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          id="file-upload"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <i className={`bi bi-cloud-upload ${classes.icon}`}></i>
        <p className={classes.text}>
          {drag}
          <label htmlFor="file-upload" className={classes.browse}>
            {browse}
          </label>
        </p>
      </div>
      {file && (
        <div className={classes.file}>
          <i className={`bi bi-file-earmark-text ${classes.fileIcon}`}></i>
          <span className={classes.fileName}>{file.name}</span>
          <i
            className={`bi bi-x ${classes.removeIcon}`}
            onClick={() => setFile(null)}
          ></i>
        </div>
      )}
      <small className={classes.errorText}>{error || ""}</small>
    </div>
  );
};

Upload.propTypes = {
  file: PropTypes.instanceOf(File),
  setFile: PropTypes.func.isRequired,
  error: PropTypes.string,
  setError: PropTypes.func.isRequired,
};

export default Upload;
