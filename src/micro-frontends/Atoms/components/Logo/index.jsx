import PropTypes from "prop-types";
import classes from "./index.module.scss";

/**
 * Logo Component
 *
 * Renders the logo with an icon, a suffix, and text.
 *
 * @param {Object} props - The component props.
 * @param {string} props.logoIcon - The icon class for the logo.
 * @param {string} props.logoSuffix - The suffix text for the logo.
 * @param {string} props.logoText - The main text for the logo.
 * @returns {JSX.Element} The rendered logo component.
 */
const Logo = ({ logoIcon, logoSuffix, logoText }) => {
  return (
    <div className={classes.logo}>
      <i className={`${logoIcon} ${classes.icon}`}></i>
      <span className={classes.text}>
        {logoSuffix}
        <span>{logoText}</span>
      </span>
    </div>
  );
};

Logo.propTypes = {
  logoIcon: PropTypes.string.isRequired,
  logoSuffix: PropTypes.string.isRequired,
  logoText: PropTypes.string.isRequired,
};

Logo.displayName = "Logo";
export default Logo;
