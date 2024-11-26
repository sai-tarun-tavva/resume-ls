import { useSelector } from "react-redux";
import { formatTime, transformPhoneNumber } from "../../../../utilities";
import { CONTENT } from "../../../../constants";
import classes from "./index.module.scss";

/**
 * CallingDisplay Component
 *
 * Handles the display of calling information, including the calling phase and call duration.
 *
 * @component
 * @returns {JSX.Element} The CallingDisplay component.
 */
const CallingDisplay = () => {
  const { isCalling, callDuration, phoneNumber } = useSelector(
    (state) => state.result
  );

  return (
    <div className={classes.callingDisplay}>
      {/* User Icon */}
      <div
        className={`${classes.userIconContainer} ${
          !isCalling ? classes.onCall : ""
        }`}
      >
        <i className="bi bi-person-circle" />
      </div>

      {/* Phone Number */}
      <p className={classes.phoneNumber}>
        +1 {transformPhoneNumber(phoneNumber)}
      </p>

      {/* Call Status */}
      {isCalling ? (
        <p className={classes.calling}>{CONTENT.QUEST.input.call.calling}</p>
      ) : (
        <p className={classes.onCall}>
          {CONTENT.QUEST.input.call.onCall}{" "}
          <span>{formatTime(callDuration)}</span>
        </p>
      )}
    </div>
  );
};

CallingDisplay.displayName = "CallingDisplay";
export default CallingDisplay;
