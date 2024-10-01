import { formatFileSize, getFileIcon } from "../../../../utilities";
import classes from "./index.module.css";

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

FileList.displayName = "FileList";
export default FileList;
