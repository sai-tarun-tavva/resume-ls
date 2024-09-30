import IconText from "../../../../Atoms/IconText";
import { content } from "../../../../../constants";
import classes from "./index.module.css";

const Location = ({ candidate }) => {
  const { location, region, experience } =
    content.candidateHub.candidate.defaultValues;

  return (
    <div className={classes.location}>
      <IconText iconName="geo-alt">{candidate.location || location}</IconText>
      <IconText iconName="map">{candidate.region || region}</IconText>
      <div className={classes.experience}>
        {experience.replace("{{exp}}", candidate.total_experience)}
      </div>
    </div>
  );
};

Location.displayName = "Location";
export default Location;
