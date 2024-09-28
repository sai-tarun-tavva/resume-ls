import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./index.module.css";
import Button from "../../../Atoms/Button";

const Upload = () => {
  return (
    <Button className={styles.upload} title="Upload New Resume">
      Upload Resume <i className="bi bi-file-earmark-arrow-up"></i>
    </Button>
  );
};

Upload.displayName = "Upload";
export default Upload;
