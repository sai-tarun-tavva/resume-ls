import PropTypes from "prop-types";
import { CONTENT } from "../../../../../constants";
import classes from "./index.module.scss";

/**
 * Upload Component
 *
 * Provides a file upload interface with drag-and-drop functionality,
 * displaying an error message if necessary and allowing file reset.
 *
 * @param {Object} props - The component props.
 * @param {string} props.id - The unique identifier for the file input.
 * @param {string} props.label - The label displayed above the upload area.
 * @param {File} props.file - The currently selected file.
 * @param {function} props.changeHandler - Function to handle file input change.
 * @param {function} props.dropHandler - Function to handle file drop event.
 * @param {function} props.dragOverHandler - Function to handle drag-over event.
 * @param {function} props.resetFile - Function to reset or clear the selected file.
 * @param {string} props.error - Error message to display when upload fails or is invalid.
 * @param {boolean} [props.isRequired=false] - Specifies if the file upload is required.
 * @returns {JSX.Element} The upload component.
 */
const Upload = ({
  id,
  label,
  file,
  changeHandler,
  dropHandler,
  dragOverHandler,
  resetFile,
  error,
  isRequired = false,
}) => {
  const { drag, browse } = CONTENT.SPARK.operations.upload;

  return (
    <div className={classes.upload}>
      <label htmlFor={id}>
        {label} {isRequired && <span className={classes.required}>*</span>}
      </label>
      <div
        className={`${classes.dropzone} ${file ? classes.active : ""} ${
          error ? classes.error : ""
        }`}
        onDrop={dropHandler}
        onDragOver={dragOverHandler}
      >
        <input
          type="file"
          id={id}
          onChange={changeHandler}
          style={{ display: "none" }}
        />
        <i className={`bi bi-cloud-upload ${classes.icon}`}></i>
        <p className={classes.text}>
          {drag}
          <label htmlFor={id} className={classes.browse}>
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
            onClick={resetFile}
          ></i>
        </div>
      )}
      <small className={classes.errorText}>{error || ""}</small>
    </div>
  );
};

Upload.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  file: PropTypes.instanceOf(File),
  changeHandler: PropTypes.func.isRequired,
  dropHandler: PropTypes.func.isRequired,
  dragOverHandler: PropTypes.func.isRequired,
  resetFile: PropTypes.func.isRequired,
  error: PropTypes.string,
  isRequired: PropTypes.bool,
};

export default Upload;
Upload.displayName = "Upload";
