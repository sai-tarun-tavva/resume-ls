import PropTypes from "prop-types";
import { useCountAnimation } from "../../hooks";
import Logo from "../../../../assets/logo.png";
import { CONTENT } from "../../../../constants";
import classes from "./index.module.scss";

/**
 * WelcomePanel Component
 *
 * Displays a welcome message along with a logo and an animated count.
 *
 * @param {number} targetCount - The target count to animate towards.
 * @returns {JSX.Element} Rendered WelcomePanel component
 */
const WelcomePanel = ({ targetCount }) => {
  const count = useCountAnimation(targetCount);
  const { heading, paragraph } = CONTENT.WELCOME.welcomePanel;

  return (
    <div className={classes.welcomePanel}>
      <img
        src={Logo}
        alt={CONTENT.WELCOME.welcomePanel.logoAlt}
        className={classes.logo}
      />
      <h1>{heading}</h1>

      {targetCount >= 0 && (
        <div className={classes.counterWrapper}>
          <span className={classes.countUp}>{count}</span>
          <p>{paragraph}</p>
        </div>
      )}
    </div>
  );
};

WelcomePanel.propTypes = {
  targetCount: PropTypes.number.isRequired,
};

WelcomePanel.displayName = "WelcomePanel";
export default WelcomePanel;
