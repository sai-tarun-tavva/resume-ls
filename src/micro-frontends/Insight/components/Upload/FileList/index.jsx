import PropTypes from "prop-types";
import { formatFileSize, getFileIcon } from "../../../../../utilities";
import classes from "./index.module.scss";

/**
 * FileList Component
 *
 * Displays a list of uploaded files with their names, sizes, and icons.
 * Provides an option to delete each file from the list.
 *
 * @param {Array} files - Array of file objects containing name and size.
 * @param {Function} handleDeleteFile - Function to handle file deletion.
 * @returns {JSX.Element} Rendered FileList component
 */
const FileList = ({ files, handleDeleteFile }) => {
  return (
    <div className={classes.fileList}>
      {files.map((file) => (
        <div key={file.name} className={classes.fileItem}>
          {getFileIcon(file.name)}
          <span className={classes.fileName}>
            {file.name} <small>({formatFileSize(file.size)})</small>
          </span>
          <button
            onClick={() => handleDeleteFile(file.name)}
            className={classes.closeButton}
            aria-label={`Delete ${file.name}`}
          >
            <i className="bi bi-x" />
          </button>
        </div>
      ))}
    </div>
  );
};

FileList.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
    })
  ).isRequired,
  handleDeleteFile: PropTypes.func.isRequired,
};

FileList.displayName = "FileList";

export default FileList;
