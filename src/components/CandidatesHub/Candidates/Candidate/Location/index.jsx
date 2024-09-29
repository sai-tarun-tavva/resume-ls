import IconText from "../../../../Atoms/IconText";
import classes from "./index.module.css";

const Location = ({ candidate }) => {
  return (
    <div className={classes.location}>
      <IconText iconName="geo-alt">{candidate.location || "City"}</IconText>
      <IconText iconName="map">{candidate.region || "State"}</IconText>
      <div className={classes.experience}>
        {candidate.total_experience} Years
      </div>
    </div>
  );
};

Location.displayName = "Location";
export default Location;
