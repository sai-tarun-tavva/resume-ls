import { content } from "../../../../constants/content";
import classes from "./index.module.css";

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
          accept=".doc,.docx,.pdf"
          onChange={handleFileChange}
          className={classes.fileInput}
        />
        <i className="bi bi-cloud-arrow-up-fill"></i>
        <h2>{content.candidateHub.upload.dragDrop.heading}</h2>
        <p>{content.candidateHub.upload.dragDrop.paragraphFile}</p>
      </div>

      <small className={classes.infoText}>
        {content.candidateHub.upload.dragDrop.info}
      </small>
    </>
  );
};

DropArea.displayName = "DropArea";
export default DropArea;
