import PropTypes from "prop-types";
import classes from "./index.module.scss";

/**
 * IconText Component
 *
 * Displays an icon alongside text with an optional maximum width.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be displayed next to the icon.
 * @param {string} props.iconName - The name of the icon to display (without the "bi-" prefix).
 * @param {string} props.maxWidth -  Maximum width for the component.
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

IconText.propTypes = {
  children: PropTypes.node.isRequired,
  iconName: PropTypes.string.isRequired,
  maxWidth: PropTypes.string,
};

IconText.displayName = "IconText";
export default IconText;
