import { useEffect, useState } from "react";

/**
 * Custom hook to animate a count from 0 to a specified target count.
 *
 * @param {number} targetCount - The target number to count up to.
 * @returns {number} The current animated count.
 */
export const useCountAnimation = (targetCount) => {
  const [count, setCount] = useState(0);

  // Function to determine the duration of the animation based on the target count
  const determineDuration = (target) => {
    if (target < 100) return 1; // 1 second for counts less than 100
    if (target < 1000) return 3; // 3 seconds for counts less than 1000
    return 5; // 5 seconds for counts 1000 and above
  };

  useEffect(() => {
    if (targetCount > 0) {
      const duration = determineDuration(targetCount); // Set duration based on target count
      const incrementStep = Math.ceil(targetCount / (duration * 100)); // Calculate increment step
      const totalIncrements = Math.ceil(targetCount / incrementStep); // Total increments needed
      const intervalTime = (duration * 1000) / totalIncrements; // Convert duration to milliseconds

      const interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount < targetCount) {
            return Math.min(prevCount + incrementStep, targetCount); // Prevent overshooting
          } else {
            clearInterval(interval); // Clear interval when target is reached
            return prevCount; // Return the final count
          }
        });
      }, intervalTime); // Use calculated interval time

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [targetCount]); // Restart animation when targetCount changes

  return count;
};
