import PropTypes from "prop-types";
import { useCountAnimation } from "../../hooks";
import Logo from "../../../../assets/logo.png";
import { CONTENT } from "../../../../constants";
import classes from "./index.module.scss";

/**
 * WelcomePanel Component
 *
 * Displays a welcome message along with a logo and animated counts for insights and onboard users.
 *
 * @param {number} insightCount - The target count to animate towards for parsed resumes.
 * @param {number} onboardCount - The target count to animate towards for onboarded candidates.
 * @returns {JSX.Element} Rendered WelcomePanel component
 */
const WelcomePanel = ({ insightCount = 0, onboardCount = 0 }) => {
  const iCount = useCountAnimation(insightCount);
  const oCount = useCountAnimation(onboardCount);

  const { heading, insightParagraph, onboardParagraph } =
    CONTENT.WELCOME.welcomePanel;

  return (
    <div className={classes.welcomePanel}>
      <img
        src={Logo}
        alt={CONTENT.WELCOME.welcomePanel.logoAlt}
        className={classes.logo}
      />
      <h1>{heading}</h1>

      <div>
        {onboardCount >= 0 && (
          <div className={classes.counterWrapper}>
            <span className={classes.countUp}>{oCount}</span>
            <p>{onboardParagraph}</p>
          </div>
        )}
        {insightCount >= 0 && (
          <div className={classes.counterWrapper}>
            <span className={classes.countUp}>{iCount}</span>
            <p>{insightParagraph}</p>
          </div>
        )}
      </div>
    </div>
  );
};

WelcomePanel.propTypes = {
  insightCount: PropTypes.number,
  onboardCount: PropTypes.number,
};

WelcomePanel.displayName = "WelcomePanel";
export default WelcomePanel;
