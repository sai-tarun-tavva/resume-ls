import PropTypes from "prop-types";
import IconText from "../../../../Atoms/IconText";
import { capitalizeFirstLetter } from "../../../../../utilities";
import { content } from "../../../../../constants";
import classes from "./index.module.css";

/**
 * Renders a LinkedIn icon based on the provided URL.
 * If the URL is not available, a disabled icon is shown.
 *
 * @param {string} url - The LinkedIn profile URL of the candidate.
 * @returns {JSX.Element} The rendered LinkedIn icon or a disabled icon.
 */
const getLinkedIn = (url) => {
  return url ? (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <i className="bi bi-linkedin"></i>
    </a>
  ) : (
    <i className={`bi bi-linkedin ${classes.disabled}`}></i>
  );
};

/**
 * MainInfo Component
 *
 * Displays the primary information for a candidate, including their
 * name, phone number, email, and LinkedIn profile. It formats the candidate's name
 * and provides default values for phone and email when necessary.
 *
 * @param {Object} candidate - The candidate object containing relevant information.
 * @param {string} candidate.name - The name of the candidate.
 * @param {string} candidate.phone_numbers - The candidate's phone number.
 * @param {string} candidate.email - The candidate's email address.
 * @param {string} candidate.linkedin - The candidate's LinkedIn profile URL.
 * @returns {JSX.Element} The rendered main information of the candidate.
 */
const MainInfo = ({ candidate }) => {
  const { name, phone_numbers, email, linkedin } = candidate;
  const { phoneNumber, email: defaultEmail } =
    content.candidateHub.candidate.defaultValues;

  return (
    <div className={classes.mainInfo}>
      <div className={classes.name}>
        {capitalizeFirstLetter(name)}
        {getLinkedIn(linkedin)}
      </div>

      <IconText iconName="telephone">{phone_numbers || phoneNumber}</IconText>
      <IconText iconName="envelope">{email || defaultEmail}</IconText>
    </div>
  );
};

// PropTypes for MainInfo component
MainInfo.propTypes = {
  candidate: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    phone_numbers: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
    linkedin: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    total_experience: PropTypes.number.isRequired,
    file_path: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
  }).isRequired,
};

MainInfo.displayName = "MainInfo";
export default MainInfo;
