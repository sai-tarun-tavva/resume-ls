import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import MainInfo from "./MainInfo";
import Location from "./Location";
import Actions from "./Actions";
import Skills from "../../../../Atoms/components/Skills";
import { viewResumeActions } from "../../../store";
import { useStatus } from "../../../../../store";
import {
  calculateTimeAgo,
  isCandidateNew,
  replaceRouteParam,
} from "../../../../../utilities";
import { END_POINTS, ROUTES } from "../../../../../constants";
import classes from "./index.module.scss";

/**
 * Candidate Component
 *
 * Displays individual candidate information.
 *
 * @param {Object} candidate - The candidate data to display.
 * @param {Boolean} openResumeInNewTab - Flag to indicate if view opens resume in new tab.
 * @returns {JSX.Element} The rendered candidate component.
 */
const Candidate = ({ candidate, openResumeInNewTab }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { resetStatus } = useStatus();
  const { show: makeSmaller, id: focusedId } = useSelector(
    (state) => state.viewResume
  );

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
    resetStatus();
    dispatch(viewResumeActions.hideResume());
    dispatch(viewResumeActions.updateId(null));

    const candidateId = candidate.id;
    navigate(replaceRouteParam(ROUTES.INSIGHT.CANDIDATE_FORM, { candidateId }));
  };

  /**
   * Handles the view action for the candidate.
   *
   * @param {Event} event - The event triggered by the edit action.
   */
  const handleView = (event) => {
    if (openResumeInNewTab) {
      window.open(
        `${END_POINTS.INSIGHT.VIEW_RESUME}${candidate.id}/`,
        "_blank"
      );
    } else {
      event.preventDefault();
      dispatch(viewResumeActions.showResume());
      dispatch(viewResumeActions.updateId(candidate.id));
    }
  };

  return (
    <article
      className={`${classes.card} ${
        makeSmaller && !openResumeInNewTab && classes.smaller
      } ${focusedId === candidate.id && classes.focus}`}
    >
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
            <Actions
              id={candidate.id}
              onEdit={handleEdit}
              onView={handleView}
            />
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
  openResumeInNewTab: PropTypes.bool.isRequired,
};

Candidate.displayName = "Candidate";
export default Candidate;
