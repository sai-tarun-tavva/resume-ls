import { useContext, useEffect, useState } from "react";
import { StatusMsgContext } from "../../../store";
import classes from "./index.module.css";

/**
 * StatusMessage Component
 *
 * Displays a status message.
 * The message will be shown for a limited time and then disappear.
 *
 * @returns {JSX.Element|null} The rendered StatusMessage component or null if not visible.
 */
const StatusMessage = () => {
  const { message, type, darkMode, handleViewStatus } =
    useContext(StatusMsgContext);
  const [isVisible, setIsVisible] = useState(false);

  // Use effect to hide the message after 5 seconds
  useEffect(() => {
    if (message !== "") {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        handleViewStatus();
      }, 5000);
      return () => clearTimeout(timer); // Cleanup timeout
    }

    setIsVisible(false); // Unmount or hide if no message
  }, [message, handleViewStatus]);

  return (
    isVisible && (
      <div
        className={`${classes.statusMsgContainer} ${classes[`${type}`]} ${
          darkMode && classes.light
        }`}
      >
        <p>{message}</p>
      </div>
    )
  );
};

StatusMessage.displayName = "StatusMessage";
export default StatusMessage;
