import PropTypes from "prop-types";
import { CONTENT, INSIGHT } from "../../../../../constants";
import classes from "./index.module.scss";

/**
 * DropArea Component
 *
 * A designated area for users to drag and drop files or select files through an input.
 *
 * @param {Function} handleDrop - Function to handle file drop event.
 * @param {Function} handleDragOver - Function to handle drag over event.
 * @param {Function} handleFileChange - Function to handle file input change event.
 * @returns {JSX.Element} Rendered DropArea component
 */
const DropArea = ({ handleDrop, handleDragOver, handleFileChange }) => {
  const { MAX_FILES, MAX_FILE_SIZE } = INSIGHT;
  const { heading, paragraphFile, info } = CONTENT.INSIGHT.upload.dragDrop;

  return (
    <>
      <div
        className={classes.dropArea}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          id="fileInput"
          multiple
          accept=".doc,.docx,.pdf,.txt"
          onChange={handleFileChange}
          className={classes.fileInput}
        />
        <i className={`bi bi-cloud-arrow-up-fill ${classes.icon}`}></i>
        <h2>{heading}</h2>
        <p>{paragraphFile}</p>
      </div>

      <small className={classes.infoText}>
        {info
          .replace("{{MAX_FILES}}", MAX_FILES)
          .replace("{{MAX_FILE_SIZE}}", MAX_FILE_SIZE)}
      </small>
    </>
  );
};

DropArea.propTypes = {
  handleDrop: PropTypes.func.isRequired,
  handleDragOver: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired,
};

DropArea.displayName = "DropArea";

export default DropArea;
