import IconText from "../../../../Atoms/IconText";
import { capitalizeFirstLetter } from "../../../../../utilities";
import { content } from "../../../../../constants";
import classes from "./index.module.css";

const getLinkedIn = (url) => {
  return url ? (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <i className="bi bi-linkedin"></i>
    </a>
  ) : (
    <i className={`bi bi-linkedin ${classes.disabled}`}></i>
  );
};

const MainInfo = ({ candidate }) => {
  const { phoneNumber, email } = content.candidateHub.candidate.defaultValues;

  return (
    <div className={classes.mainInfo}>
      <div className={classes.name}>
        {capitalizeFirstLetter(candidate.name)}
        {getLinkedIn(candidate.linkedin)}
      </div>

      <IconText iconName="telephone">
        {candidate.phone_numbers || phoneNumber}
      </IconText>
      <IconText iconName="envelope">{candidate.email || email}</IconText>
    </div>
  );
};

MainInfo.displayName = "MainInfo";
export default MainInfo;
