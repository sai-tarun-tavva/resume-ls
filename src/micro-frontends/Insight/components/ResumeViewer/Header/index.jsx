import PropTypes from "prop-types";
import { END_POINTS } from "../../../../../constants";
import classes from "./index.module.scss";

/**
 * Header Component
 *
 * Displays the header of resume viewer.
 *
 * @param {Number} id - The id of the candidate.
 * @param {string} name - The name of the candidate.
 * @param {string} size - The size of the resume file.
 * @param {Function} onClose - Function to be executed on click of close button.
 * @returns {JSX.Element} The rendered resume viewer's header component.
 */
const Header = ({ id, name, size, onClose }) => {
  return (
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
        <span onClick={onClose}>
          <i className="bi bi-x" />
        </span>
      </span>
    </div>
  );
};

Header.displayName = "ViewerHeader";

Header.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Header;
