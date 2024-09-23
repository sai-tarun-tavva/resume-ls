import React from "react";
import IconText from "../../../Atoms/IconText";
import { capitalizeFirstLetter } from "../../../../utilities";
import styles from "./index.module.css";

const getLinkedIn = (url) => {
  return url ? (
    <a href={`https://${url}`} target="_blank" rel="noopener noreferrer">
      <i className="bi bi-linkedin"></i>
    </a>
  ) : (
    <i className={`bi bi-linkedin ${styles.disabled}`}></i>
  );
};

const MainInfo = ({ info }) => {
  return (
    <div className={styles["main-info"]}>
      <div className={styles.name}>
        {capitalizeFirstLetter(info.name)}
        {getLinkedIn(info.linkedin)}
      </div>

      <IconText iconName="telephone">
        {info.phone_numbers || "Mobile Number"}
      </IconText>
      <IconText iconName="envelope">{info.email || "Email"}</IconText>
    </div>
  );
};

MainInfo.displayName = "MainInfo";
export default MainInfo;
