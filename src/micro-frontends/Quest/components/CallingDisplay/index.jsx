import { useState, useEffect } from "react";
import { formatTime } from "../../../../utilities";
import classes from "./index.module.scss";

const CallingDisplay = ({ phoneNumber }) => {
  const [isCalling, setIsCalling] = useState(true); // To track the "Calling" state
  const [callDuration, setCallDuration] = useState(0); // Timer in seconds

  useEffect(() => {
    // Timer for the "Calling" phase
    const callingTimer = setTimeout(() => {
      setIsCalling(false); // Transition to "On Call"
    }, 45000); // 1 minute = 60000ms

    // Cleanup the timeout if the component unmounts before 1 min
    return () => clearTimeout(callingTimer);
  }, []);

  useEffect(() => {
    let timer;
    if (!isCalling) {
      // Start the call duration timer once the call transitions to "On Call"
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }

    // Cleanup the timer when the component unmounts or the call ends
    return () => clearInterval(timer);
  }, [isCalling]);

  return (
    <div className={classes.callingDisplayContainer}>
      <i className="bi bi-person-circle" />
      <p>+1 {phoneNumber}</p>
      {isCalling ? (
        <p className={classes.calling}>Calling</p>
      ) : (
        <p>
          On Call: <span>{formatTime(callDuration)}</span>
        </p>
      )}
    </div>
  );
};

CallingDisplay.displayName = "CallingDisplay";
export default CallingDisplay;
