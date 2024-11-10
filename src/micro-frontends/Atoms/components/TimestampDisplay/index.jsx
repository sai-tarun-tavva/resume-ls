import React from "react";
import PropTypes from "prop-types";
import classes from "./index.module.scss";

/**
 * TimestampDisplay Component
 *
 * Displays a formatted timestamp with date and time.
 *
 * @param {Object} props - The component props.
 * @param {string} props.timestamp - The ISO string representation of the timestamp to display.
 * @returns {JSX.Element} The rendered TimestampDisplay component.
 */
const TimestampDisplay = ({ timestamp }) => {
  /**
   * Formats a date string into an object containing a formatted date and time.
   *
   * @param {string} dateString - The ISO date string to format.
   * @returns {Object} An object with formattedDate and formattedTime strings.
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const timeZone = "America/New_York"; // Change this to "America/Los_Angeles" for Pacific Time

    const formattedDate = date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
      timeZone,
    });

    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    return { formattedDate, formattedTime };
  };

  const { formattedDate, formattedTime } = formatDate(timestamp);

  return (
    <div className={classes.timestampContainer}>
      <i className={`bi bi-clock ${classes.timestampIcon}`} />
      <div className={classes.timestampContent}>
        <span className={classes.timestampDate}>{formattedDate}</span>
        <span className={classes.timestampSeparator}>•</span>
        <span className={classes.timestampTime}>{formattedTime}</span>
      </div>
    </div>
  );
};

TimestampDisplay.propTypes = {
  timestamp: PropTypes.string.isRequired,
};

TimestampDisplay.displayName = "TimestampDisplay";
export default TimestampDisplay;
