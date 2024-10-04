import PropTypes from "prop-types";
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
const Button = ({ title, name, ...props }) => (
  <button className={classes.actionButton} title={title} {...props}>
    <i className={`bi bi-${name}`}></i>
  </button>
);

/**
 * Actions Component
 *
 * Renders a set of action buttons for editing, downloading, and viewing.
 *
 * @param {Function} onEdit - Function to be called when the edit button is clicked.
 * @param {Function} onDownLoad - Function to be called when the download button is clicked.
 * @returns {JSX.Element} The rendered action buttons.
 */
const Actions = ({ onEdit, onDownload }) => {
  return (
    <>
      <Button title="Edit" name="pencil-square" onClick={onEdit} />
      <Button title="Download" name="download" onClick={onDownload} />
      <Button title="View" name="eye" />
    </>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

Actions.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
};

Button.displayName = "Button";
Actions.displayName = "Actions";

export default Actions;
