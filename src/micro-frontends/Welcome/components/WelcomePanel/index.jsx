import PropTypes from "prop-types";
import { useCountAnimation } from "../../hooks";
import Logo from "../../../../assets/logo.png";
import { CONTENT, LOGISOFT_URL, SPARK } from "../../../../constants";
import classes from "./index.module.scss";

/**
 * WelcomePanel Component
 *
 * Displays a welcome message along with a logo and animated counts for insights and onboard users.
 *
 * @param {number} insightCount - The target count to animate towards for parsed resumes.
 * @param {number} onboardCount - The target count to animate towards for onboarded candidates.
 * @param {number} questCount - The target count to animate towards for interviewed quest candidates.
 * @param {number} salesCount - The target count to animate towards for profile submissions to client.
 * @param {number} recruitCount - The target count to animate towards for recruited candidates.
 * @returns {JSX.Element} Rendered WelcomePanel component
 */
const WelcomePanel = ({
  insightCount = 0,
  onboardCount = 0,
  questCount = 0,
  salesCount = 0,
  recruitCount = 0,
}) => {
  const sparkCount = SPARK.SUGGESTED_CHANGES;

  const iCount = useCountAnimation(insightCount);
  const oCount = useCountAnimation(onboardCount);
  const sCount = useCountAnimation(sparkCount);
  const qCount = useCountAnimation(questCount);
  const saCount = useCountAnimation(salesCount);
  const rCount = useCountAnimation(recruitCount);

  const {
    heading1,
    heading2,
    subHeading,
    footerParagraph1,
    footerParagraph2,
    insightParagraph,
    onboardParagraph,
    sparkParagraph,
    questParagraph,
    salesParagraph,
    recruitParagraph,
  } = CONTENT.WELCOME.welcomePanel;

  const metrics = [
    { label: questParagraph, count: qCount },
    { label: onboardParagraph, count: oCount },
    { label: insightParagraph, count: iCount },
    { label: sparkParagraph, count: sCount },
    { label: salesParagraph, count: saCount },
    { label: recruitParagraph, count: rCount },
  ];

  return (
    <div className={classes.welcomePanel}>
      <div className={classes.header}>
        <div className={classes.logo}>
          {heading1} <span>{heading2}</span>
        </div>
        <h5>{subHeading}</h5>
      </div>

      <div className={classes.metrics}>
        {metrics.map(({ label, count }, index) => (
          <div key={index} className={classes.metric}>
            <span className={classes.count}>{count}</span>
            <p>{label}</p>
          </div>
        ))}
      </div>

      <div className={classes.footer}>
        <h6>
          {footerParagraph1}
          <span
            onClick={() => {
              window.open(LOGISOFT_URL, "_blank");
            }}
          >
            {footerParagraph2}
          </span>
        </h6>
        <div className={classes.footerLogo}>
          <img
            src={Logo}
            alt={CONTENT.WELCOME.welcomePanel.logoAlt}
            className={classes.logisoftImage}
          />
        </div>
      </div>
    </div>
  );
};

WelcomePanel.propTypes = {
  insightCount: PropTypes.number,
  onboardCount: PropTypes.number,
  questCount: PropTypes.number,
  salesCount: PropTypes.number,
  recruitCount: PropTypes.number,
};

WelcomePanel.displayName = "WelcomePanel";
export default WelcomePanel;
