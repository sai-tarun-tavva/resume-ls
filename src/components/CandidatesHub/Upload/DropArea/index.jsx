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
        <p>Drag and drop or click here</p>
        <small>to choose your files</small>
      </div>

      <small className={classes.infoText}>
        Only DOC, DOCX, and PDF files are accepted. All DOC and DOCX files will
        be automatically converted to PDF before uploading.
      </small>
    </>
  );
};

DropArea.displayName = "DropArea";
export default DropArea;
