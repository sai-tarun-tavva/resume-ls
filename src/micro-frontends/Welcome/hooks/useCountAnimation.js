import { useEffect, useState } from "react";

/**
 * Custom hook to animate a count from 0 to a specified target count with formatting.
 * Displays the count in K, M, and B suffixes for thousands, millions, and billions.
 *
 * @param {number} targetCount - The target number to count up to.
 * @returns {string} The current animated count as a formatted string.
 */
export const useCountAnimation = (targetCount) => {
  const [count, setCount] = useState(0);

  /**
   * Formats the count with appropriate suffixes (K, M, B) based on value.
   *
   * @param {number} value - The current count value.
   * @returns {string} Formatted string with suffixes for large numbers.
   */
  const formatCount = (value) => {
    if (value >= 1_000_000_000) {
      return (value / 1_000_000_000).toFixed(1) + "B"; // Billions
    } else if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(1) + "M"; // Millions
    } else if (value >= 1_000) {
      return (value / 1_000).toFixed(1) + "K"; // Thousands
    }
    return value.toString(); // Less than 1000
  };

  useEffect(() => {
    if (targetCount > 0) {
      const duration = 2; // Set duration in seconds
      const maxSteps = duration * 30; // Limit to ~30 updates per second
      const incrementStep = Math.max(1, Math.floor(targetCount / maxSteps)); // Adjust step size dynamically
      const intervalTime = (duration * 1000) / (targetCount / incrementStep); // Interval based on step size

      /**
       * Interval callback function that increments the count until it reaches the target count.
       * Ensures the count does not exceed the target count and clears the interval once completed.
       */
      const interval = setInterval(() => {
        setCount((prevCount) => {
          const nextCount = Math.min(prevCount + incrementStep, targetCount);
          if (nextCount === targetCount) {
            clearInterval(interval); // Clear interval when target is reached
          }
          return nextCount;
        });
      }, intervalTime); // Use calculated interval time

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [targetCount]); // Restart animation when targetCount changes

  return formatCount(count);
};
