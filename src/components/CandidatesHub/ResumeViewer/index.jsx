import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Loader from "../../Atoms/Loader";
import { viewResumeActions } from "../../../store/viewresume";
import { END_POINTS, LOADER_TYPES } from "../../../constants";
import classes from "./index.module.scss";

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
  const { isFetchLoading: isFetchingFile } = useSelector(
    (state) => state.loading
  );

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
      <div className={classes.header}>
        <span>{`${name} (${size})`}</span>
        <span className={classes.actions}>
          <a
            title="Download"
            href={`${END_POINTS.DOWNLOAD_RESUME}${id}`}
            download={name}
          >
            <i className={`bi bi-download`}></i>
          </a>
          <span onClick={handleHideResume}>
            <i className="bi bi-x" />
          </span>
        </span>
      </div>
      <div className={classes.iframeContainer}>
        {isFetchingFile ? (
          <Loader type={LOADER_TYPES.BAR} />
        ) : (
          <iframe src={url} title="Resume" className={classes.iframe}></iframe>
        )}
      </div>
    </div>
  );
};

ResumeViewer.propTypes = {
  details: PropTypes.shape({
    name: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

ResumeViewer.displayName = "ResumeViewer";
export default ResumeViewer;
