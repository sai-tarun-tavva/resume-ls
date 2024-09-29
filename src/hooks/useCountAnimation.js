import { useEffect, useState } from "react";

export const useCountAnimation = (targetCount) => {
  const [count, setCount] = useState(0);

  // Function to determine duration based on target count
  const determineDuration = (target) => {
    if (target < 100) return 1; // 1 second for small counts
    if (target < 1000) return 3; // 3 seconds for medium counts
    return 5; // 5 seconds for large counts
  };

  useEffect(() => {
    if (targetCount > 0) {
      // Ensure targetCount is set before starting the animation
      const duration = determineDuration(targetCount); // Set duration based on target count
      const incrementStep = Math.ceil(targetCount / (duration * 100)); // Adjust increment step
      const totalIncrements = Math.ceil(targetCount / incrementStep); // Total increments needed
      const intervalTime = (duration * 1000) / totalIncrements; // Convert duration to ms

      const interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount < targetCount) {
            return Math.min(prevCount + incrementStep, targetCount); // Prevent overshooting
          } else {
            clearInterval(interval);
            return prevCount; // Stop at the target count
          }
        });
      }, intervalTime); // Use calculated interval time

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [targetCount]); // Depend on targetCount to restart animation when it changes

  return count;
};
