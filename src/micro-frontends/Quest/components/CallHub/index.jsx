import CallerInput from "../CallerInput";
import classes from "./index.module.scss";

const CallHub = () => {
  return (
    <div className={classes.callHubContainer}>
      <CallerInput />
    </div>
  );
};

CallHub.displayName = "CallHub";
export default CallHub;
