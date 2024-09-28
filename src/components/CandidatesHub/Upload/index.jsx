import React from "react";
import Button from "../../Atoms/Button";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./index.module.css";

const Upload = () => {
  return (
    <Button className={styles.upload} title="Upload New Resume">
      <i className="bi bi-upload"></i>
    </Button>
  );
};

Upload.displayName = "Upload";
export default Upload;
