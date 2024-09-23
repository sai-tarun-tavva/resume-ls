import React from "react";
import IconText from "../../../Atoms/IconText";
import styles from "./index.module.css";

const Location = ({ info }) => {
  return (
    <div className={styles.location}>
      <IconText iconName="geo-alt">{info.location || "Location"}</IconText>
      <IconText iconName="map">{info.region || "Region"}</IconText>
      <div className={styles.experience}>{info.total_experience} Years</div>
    </div>
  );
};

Location.displayName = "Location";
export default Location;
