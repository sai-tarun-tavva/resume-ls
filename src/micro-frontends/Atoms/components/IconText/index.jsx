import PropTypes from "prop-types";
import classes from "./index.module.scss";

/**
 * IconText Component
 *
 * Displays an icon alongside text.
 *
 * @param {React.ReactNode} children - The content to be displayed next to the icon.
 * @param {string} iconName - The name of the icon to display (without the "bi-" prefix).
 * @returns {JSX.Element} The rendered IconText component.
 */
const IconText = ({ maxWidth, children, iconName }) => {
  return (
    <div className={classes.iconText} style={{ maxWidth }}>
      <span>
        <i className={`bi bi-${iconName}-fill`}></i>
      </span>
      {children}
    </div>
  );
};

IconText.displayName = "IconText";

IconText.propTypes = {
  children: PropTypes.node.isRequired,
  iconName: PropTypes.string.isRequired,
};

export default IconText;
