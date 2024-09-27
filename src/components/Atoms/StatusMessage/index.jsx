import React, { useEffect, useState } from "react";
import styles from "./index.module.css";

const StatusMessage = ({
  message = "Action Completed!",
  status = "success",
}) => {
  const [isVisible, setIsVisible] = useState(true);

  // Use effect to hide the message after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);
    return () => clearTimeout(timer); // Cleanup timeout
  }, []);

  return (
    isVisible && (
      <div
        className={`${styles["status-msg-container"]} ${
          status === "success" ? styles.success : styles.error
        }`}
      >
        <p>{message}</p>
      </div>
    )
  );
};

StatusMessage.displayName = "StatusMessage";
export default StatusMessage;
