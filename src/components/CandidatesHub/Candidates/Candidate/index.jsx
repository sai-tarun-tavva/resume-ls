import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import MainInfo from "./MainInfo";
import Location from "./Location";
import Actions from "./Actions";
import Skills from "../../../Atoms/Skills";
import { statusActions } from "../../../../store";
import {
  calculateTimeAgo,
  downloadResume,
  isCandidateNew,
  replaceRouteParam,
  resetStatusAsync,
} from "../../../../utilities";
import { ROUTES, STATUS_CODES } from "../../../../constants";
import "bootstrap-icons/font/bootstrap-icons.css";
import classes from "./index.module.scss";

/**
 * Candidate Component
 *
 * Displays individual candidate information.
 *
 * @param {Object} candidate - The candidate data to display.
 * @returns {JSX.Element} The rendered candidate component.
 */
const Candidate = ({ candidate }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dateCreated = new Date(candidate.timestamp);
  const isNew = isCandidateNew(dateCreated);
  const formattedTime = calculateTimeAgo(dateCreated);

  /**
   * Handles the edit action for the candidate.
   *
   * @param {Event} event - The event triggered by the edit action.
   */
  const handleEdit = (event) => {
    event.preventDefault();
    dispatch(statusActions.resetStatus());

    const candidateId = candidate.id;
    navigate(replaceRouteParam(ROUTES.CANDIDATE_FORM, { candidateId }));
  };

  const handleDownload = async (event) => {
    event.preventDefault();
    await dispatch(resetStatusAsync(statusActions.resetStatus));

    const { status } = await downloadResume(candidate.id);

    if (status !== STATUS_CODES.SUCCESS) {
      dispatch(
        statusActions.updateStatus({
          message: "Server error. Please try again later.",
          type: "failure",
        })
      );
    }
  };

  return (
    <article className={classes.card}>
      <div
        className={classes.cardContent}
        data-new={isNew ? "true" : "false"}
        style={{
          "--time-ago": `"${formattedTime}"`,
        }}
      >
        <MainInfo candidate={candidate} />
        <Location candidate={candidate} />
        <Skills skills={candidate.skills} />

        <div className={classes.hiddenActions}>
          <div className={classes.actions}>
            <Actions onEdit={handleEdit} onDownload={handleDownload} />
          </div>
        </div>
      </div>
    </article>
  );
};

Candidate.propTypes = {
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

Candidate.displayName = "Candidate";

export default Candidate;
