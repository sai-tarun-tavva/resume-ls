import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./index.module.css";

const Upload = () => {
  return (
    <button className={styles.upload} title="Upload New Resume">
      Upload Resume <i className="bi bi-file-earmark-arrow-up"></i>
    </button>
  );
};

Upload.displayName = "Upload";
export default Upload;
