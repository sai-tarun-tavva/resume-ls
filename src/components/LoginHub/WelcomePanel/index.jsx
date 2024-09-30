import { useCountAnimation } from "../../../hooks";
import Logo from "../../../assets/logo.png";
import { content } from "../../../constants";
import classes from "./index.module.css";

const WelcomePanel = ({ targetCount }) => {
  const count = useCountAnimation(targetCount);
  const { heading, paragraph } = content.authPage.welcomePanel;

  return (
    <div className={classes.welcomePanel}>
      <img src={Logo} alt={content.logoAlt} className={classes.logo} />
      <h1>{heading}</h1>

      {targetCount > 0 && (
        <div className={classes.counterWrapper}>
          <span className={classes.countUp}>{count}</span>
          <p>{paragraph}</p>
        </div>
      )}
    </div>
  );
};

WelcomePanel.displayName = "WelcomePanel";
export default WelcomePanel;
