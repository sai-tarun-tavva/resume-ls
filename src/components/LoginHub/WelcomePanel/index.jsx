import { useCountAnimation } from "../../../hooks";
import Logo from "../../../assets/logo.png";
import classes from "./index.module.css";

const WelcomePanel = ({ targetCount }) => {
  const count = useCountAnimation(targetCount);

  return (
    <div className={classes["welcome-panel"]}>
      <img src={Logo} alt={"Logisoft logo"} className={classes["logo"]} />
      <h1>Parse your resume</h1>

      {targetCount > 0 && (
        <div className={classes["counter-wrapper"]}>
          <span className={classes["count-up"]}>{count}</span>
          <p>resumes parsed</p>
        </div>
      )}
    </div>
  );
};

WelcomePanel.displayName = "WelcomePanel";
export default WelcomePanel;
