import React from "react";
import IconText from "../../../../Atoms/IconText";
import styles from "./index.module.css";

const Location = ({ candidate }) => {
  return (
    <div className={styles.location}>
      <IconText iconName="geo-alt">{candidate.location || "City"}</IconText>
      <IconText iconName="map">{candidate.region || "State"}</IconText>
      <div className={styles.experience}>
        {candidate.total_experience} Years
      </div>
    </div>
  );
};

Location.displayName = "Location";
export default Location;
