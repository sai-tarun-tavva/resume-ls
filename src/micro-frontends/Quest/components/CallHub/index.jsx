import CallerInput from "../CallerInput";
import classes from "./index.module.scss";

/**
 * CallHub Component
 *
 * Serves as a container for the caller input field and other related components for managing call functionality.
 * Currently renders the `CallerInput` component but is designed for scalability to include additional features.
 *
 * @component
 * @returns {JSX.Element} The CallHub component.
 */
const CallHub = () => {
  return (
    <div className={classes.callHubContainer}>
      {/* Render the CallerInput component */}
      <CallerInput />
    </div>
  );
};

CallHub.displayName = "CallHub";
export default CallHub;
