import classes from "./index.module.scss";

/**
 * Logo Component
 *
 * Renders the logo with a suffix and an icon.
 * The logo and suffix are fetched from constants.
 *
 * @returns {JSX.Element} - Rendered logo component
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

Logo.displayName = "Logo";
export default Logo;
