import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import IconText from "../../../../Atoms/IconText";
import { highlightText } from "../../../../../utilities";
import { CONTENT } from "../../../../../constants";
import classes from "./index.module.scss";

/**
 * Location Component
 *
 * Displays the candidate's location, region,
 * and total experience. It utilizes default values for location
 * and region when the candidate's data is not provided.
 *
 * @param {Object} candidate - The candidate object containing relevant information.
 * @param {string} candidate.location - The candidate's location.
 * @param {string} candidate.region - The candidate's region.
 * @param {number} candidate.total_experience - The candidate's total experience in years.
 * @returns {JSX.Element} The rendered location and experience information of the candidate.
 */
const Location = ({ candidate }) => {
  const { searchTerm } = useSelector((state) => state.ui);
  const { location, region, experience } =
    CONTENT.candidateHub.candidate.defaultValues;

  return (
    <div className={classes.location}>
      <IconText iconName="geo-alt" maxWidth={"6.25rem"}>
        {candidate.location
          ? highlightText(candidate.location, searchTerm)
          : location}
      </IconText>
      <IconText iconName="map" maxWidth={"6.25rem"}>
        {candidate.region
          ? highlightText(candidate.region, searchTerm)
          : region}
      </IconText>
      <div className={classes.experience}>
        {highlightText(
          `${experience.replace("{{EXP}}", candidate.total_experience || "-")}${
            candidate.total_experience !== 1 ? "s" : ""
          }`,
          searchTerm
        )}
      </div>
    </div>
  );
};

Location.propTypes = {
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

Location.displayName = "Location";

export default Location;
