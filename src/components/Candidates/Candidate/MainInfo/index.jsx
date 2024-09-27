import React from "react";
import IconText from "../../../Atoms/IconText";
import { capitalizeFirstLetter } from "../../../../utilities";
import styles from "./index.module.css";

const getLinkedIn = (url) => {
  return url ? (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <i className="bi bi-linkedin"></i>
    </a>
  ) : (
    <i className={`bi bi-linkedin ${styles.disabled}`}></i>
  );
};

const MainInfo = ({ candidate }) => {
  return (
    <div className={styles["main-info"]}>
      <div className={styles.name}>
        {capitalizeFirstLetter(candidate.name)}
        {getLinkedIn(candidate.linkedin)}
      </div>

      <IconText iconName="telephone">
        {candidate.phone_numbers || "Mobile Number"}
      </IconText>
      <IconText iconName="envelope">{candidate.email || "Email"}</IconText>
    </div>
  );
};

MainInfo.displayName = "MainInfo";
export default MainInfo;
