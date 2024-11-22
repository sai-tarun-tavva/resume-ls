import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { formatTime } from "../../../../utilities";
import { CONTENT } from "../../../../constants";
import classes from "./index.module.scss";

/**
 * CallingDisplay Component
 *
 * Handles the display of calling information, including the calling phase and call duration.
 * Transitions from "Calling" to "On Call" after a fixed duration and tracks call time.
 *
 * @component
 * @param {string} phoneNumber - The phone number being called.
 * @returns {JSX.Element} The CallingDisplay component.
 */
const CallingDisplay = ({ phoneNumber }) => {
  const [isCalling, setIsCalling] = useState(true); // Track the calling phase
  const [callDuration, setCallDuration] = useState(0); // Track the call duration in seconds

  useEffect(() => {
    /**
     * Timer for transitioning from "Calling" to "On Call".
     */
    const callingTimer = setTimeout(() => {
      setIsCalling(false); // Transition state
    }, 45000); // Set to 45 seconds (adjustable as needed)

    // Cleanup timeout when the component unmounts
    return () => clearTimeout(callingTimer);
  }, []);

  useEffect(() => {
    let timer;

    /**
     * Start the call duration timer once the state transitions to "On Call".
     */
    if (!isCalling) {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1); // Increment call duration every second
      }, 1000);
    }

    // Cleanup the timer when the component unmounts or when "isCalling" changes
    return () => clearInterval(timer);
  }, [isCalling]);

  return (
    <div className={classes.callingDisplayContainer}>
      {/* Display user icon */}
      <i className="bi bi-person-circle" />

      {/* Display formatted phone number */}
      <p>+1 {phoneNumber}</p>

      {/* Conditional rendering for call state */}
      {isCalling ? (
        <p className={classes.calling}>{CONTENT.QUEST.input.call.calling}</p>
      ) : (
        <p>
          {CONTENT.QUEST.input.call.onCall}
          <span>{formatTime(callDuration)}</span>
        </p>
      )}
    </div>
  );
};

CallingDisplay.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
};

CallingDisplay.displayName = "CallingDisplay";
export default CallingDisplay;
