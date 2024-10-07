import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { END_POINTS } from "../../../../../constants";
import classes from "./index.module.scss";

/**
 * Button Component
 *
 * Renders a button element with an icon and title.
 *
 * @param {string} title - The title attribute for the button.
 * @param {string} name - The name of the icon to be displayed.
 * @param {Object} props - Additional props to be passed to the button.
 * @returns {JSX.Element} The rendered button with an icon.
 */
const Action = ({ title, name, ...props }) => (
  <Link title={title} className={classes.actionButton} {...props}>
    <i className={`bi bi-${name}`}></i>
  </Link>
);

/**
 * Actions Component
 *
 * Renders a set of action buttons for editing, downloading, and viewing.
 *
 * @param {number} id - Id of the candidate
 * @param {Function} onEdit - Function to be called when the edit button is clicked.
 * @returns {JSX.Element} The rendered action buttons.
 */
const Actions = ({ id, onEdit }) => {
  return (
    <>
      <Action title="Edit" name="pencil-square" onClick={onEdit} />
      <Action
        title="Download"
        name="download"
        to={`${END_POINTS.DOWNLOAD_RESUME}${id}`}
      />
      <Action title="View" name="eye" />
    </>
  );
};

Action.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

Actions.propTypes = {
  id: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
};

Action.displayName = "Action";
Actions.displayName = "Actions";

export default Actions;
