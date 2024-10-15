import { CONTENT } from "../../../../constants";
import classes from "./index.module.scss";

/**
 * Logo Component
 *
 * Renders the logo with a suffix and an icon.
 * The logo and suffix are fetched from constants.
 *
 * @returns {JSX.Element} - Rendered logo component
 */
const Logo = () => {
  const { logoSuffix, logo } = CONTENT.candidateHub.operations;

  return (
    <div className={classes.logo}>
      <i className={`bi bi-zoom-in ${classes.icon}`}></i>
      <span className={classes.text}>
        {logoSuffix}
        <span>{logo}</span>
      </span>
    </div>
  );
};

Logo.displayName = "Logo";
export default Logo;
