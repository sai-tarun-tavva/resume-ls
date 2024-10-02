import PropTypes from "prop-types";
import { content } from "../../../../constants/content";
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
        <h2>{content.candidateHub.upload.dragDrop.heading}</h2>
        <p>{content.candidateHub.upload.dragDrop.paragraphFile}</p>
      </div>

      <small className={classes.infoText}>
        {content.candidateHub.upload.dragDrop.info}
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
