import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { statusActions } from "../../../store";
import classes from "./index.module.scss";

/**
 * StatusMessage Component
 *
 * Displays a status message.
 * The message will be shown for a limited time and then disappear.
 *
 * @returns {JSX.Element|null} The rendered StatusMessage component or null if not visible.
 */
const StatusMessage = () => {
  const dispatch = useDispatch();
  const { message, type, darkMode } = useSelector((state) => state.status);
  const [isVisible, setIsVisible] = useState(false);

  // Use effect to hide the message after 5 seconds
  useEffect(() => {
    if (message !== "") {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        dispatch(statusActions.resetStatus());
      }, 5000);
      return () => clearTimeout(timer); // Cleanup timeout
    }

    setIsVisible(false); // Unmount or hide if no message
  }, [message, dispatch]);

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
