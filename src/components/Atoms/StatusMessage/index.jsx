import { useContext, useEffect, useState } from "react";
import { StatusMsgContext } from "../../../store";
import classes from "./index.module.css";

const StatusMessage = () => {
  const { message, type, darkMode, handleViewStatus } =
    useContext(StatusMsgContext);
  const [isVisible, setIsVisible] = useState(false);

  // Use effect to hide the message after 2 seconds
  useEffect(() => {
    if (message !== "") {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        handleViewStatus();
      }, 5000);
      return () => clearTimeout(timer); // Cleanup timeout
    }

    setIsVisible(false); // unmount or hide if no message
  }, [message, handleViewStatus]);

  return (
    isVisible && (
      <div
        className={`${classes.statusMsgContainer} ${
          type === "success" ? classes.success : classes.error
        } ${darkMode && classes.light}`}
      >
        <p>{message}</p>
      </div>
    )
  );
};

StatusMessage.displayName = "StatusMessage";
export default StatusMessage;
