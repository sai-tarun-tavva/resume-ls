import React, { useContext, useEffect, useState } from "react";
import { StatusMsgContext } from "../../../store/StatusMsgContextProvider";
import styles from "./index.module.css";

const StatusMessage = () => {
  const { message, type } = useContext(StatusMsgContext);
  const [isVisible, setIsVisible] = useState(false);

  // Use effect to hide the message after 2 seconds
  useEffect(() => {
    if (message !== "") {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        // handleViewStatus("Action Completed!", "success");
      }, 5000);
      return () => clearTimeout(timer); // Cleanup timeout
    }

    setIsVisible(false); // unmount or hide if no message
  }, [message]);

  return (
    isVisible && (
      <div
        className={`${styles["status-msg-container"]} ${
          type === "success" ? styles.success : styles.error
        }`}
      >
        <p>{message}</p>
      </div>
    )
  );
};

StatusMessage.displayName = "StatusMessage";
export default StatusMessage;
