import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Header from "./Header";
import Loader from "../../../Atoms/components/Loader";
import { useLoading } from "../../../../store";
import { viewResumeActions } from "../../store";
import { LOADER_TYPES, LOADING_ACTION_TYPES } from "../../../../constants";
import classes from "./index.module.scss";

const { FETCH } = LOADING_ACTION_TYPES;

/**
 * ResumeViewer Component
 *
 * Displays the resume of an individual candidate.
 *
 * @param {Object} details - The resume details to display.
 * @param {string} details.name - The name of the candidate.
 * @param {string} details.size - The size of the resume file.
 * @param {string} details.url - The URL to the resume file.
 * @returns {JSX.Element} The rendered resume viewer component.
 */
const ResumeViewer = ({ details: { name, size, url } }) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.viewResume);
  const { isLoading } = useLoading();

  /**
   * Handles the action to hide the resume viewer.
   *
   * @returns {void}
   */
  const handleHideResume = () => {
    dispatch(viewResumeActions.hideResume());
    dispatch(viewResumeActions.updateId(null));
  };

  return (
    <div className={classes.resumeViewer}>
      <Header id={id} name={name} size={size} onClose={handleHideResume} />

      <div className={classes.iframeContainer}>
        {isLoading[FETCH] ? (
          <Loader type={LOADER_TYPES.BAR} />
        ) : (
          <iframe src={url} title="Resume" className={classes.iframe}></iframe>
        )}
      </div>
    </div>
  );
};

ResumeViewer.displayName = "ResumeViewer";

ResumeViewer.propTypes = {
  details: PropTypes.shape({
    name: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default ResumeViewer;
