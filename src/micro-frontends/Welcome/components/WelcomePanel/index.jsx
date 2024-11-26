import PropTypes from "prop-types";
import { useCountAnimation } from "../../hooks";
import Logo from "../../../../assets/logo.png";
import { CONTENT, SPARK } from "../../../../constants";
import classes from "./index.module.scss";

/**
 * WelcomePanel Component
 *
 * Displays a welcome message along with a logo and animated counts for insights and onboard users.
 *
 * @param {number} insightCount - The target count to animate towards for parsed resumes.
 * @param {number} onboardCount - The target count to animate towards for onboarded candidates.
 * @param {number} questCount - The target count to animate towards for interviewed quest candidates.
 * @returns {JSX.Element} Rendered WelcomePanel component
 */
const WelcomePanel = ({
  insightCount = 0,
  onboardCount = 0,
  questCount = 0,
}) => {
  const sparkCount = SPARK.SUGGESTED_CHANGES;

  const iCount = useCountAnimation(insightCount);
  const oCount = useCountAnimation(onboardCount);
  const sCount = useCountAnimation(sparkCount);
  const qCount = useCountAnimation(questCount);

  const {
    heading,
    insightParagraph,
    onboardParagraph,
    sparkParagraph,
    questParagraph,
  } = CONTENT.WELCOME.welcomePanel;

  return (
    <div className={classes.welcomePanel}>
      <img
        src={Logo}
        alt={CONTENT.WELCOME.welcomePanel.logoAlt}
        className={classes.logo}
      />
      <h1>{heading}</h1>

      <div>
        {questCount >= 0 && (
          <div className={classes.counterWrapper}>
            <span className={classes.countUp}>{qCount}</span>
            <p>{questParagraph}</p>
          </div>
        )}
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
        {sparkCount >= 0 && (
          <div className={classes.counterWrapper}>
            <span className={classes.countUp}>{sCount}</span>
            <p>{sparkParagraph}</p>
          </div>
        )}
      </div>
    </div>
  );
};

WelcomePanel.propTypes = {
  insightCount: PropTypes.number,
  onboardCount: PropTypes.number,
  questCount: PropTypes.number,
};

WelcomePanel.displayName = "WelcomePanel";
export default WelcomePanel;
