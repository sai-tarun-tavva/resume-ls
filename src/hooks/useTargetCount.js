import { useContext, useEffect, useState } from "react";
import { END_POINTS } from "../constants";
import { LoadingContext } from "../store";

/**
 * Custom hook to fetch and manage the target count.
 * It handles loading states and errors during the fetch operation.
 *
 * @returns {object} An object containing the target count and the loading state.
 */
export const useTargetCount = () => {
  const [targetCount, setTargetCount] = useState(0);
  const { isFetching: isLoading, handleFetching: setLoading } =
    useContext(LoadingContext);

  useEffect(() => {
    setLoading(true);

    // Fetch the target count asynchronously
    const fetchTargetCount = async () => {
      try {
        const response = await fetch(END_POINTS.FETCH_RESUME_COUNT);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setTargetCount(+data.count); // Set the fetched target count
      } catch (error) {
        console.error("Error fetching target count:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTargetCount();
  }, [setLoading]);

  return { targetCount, isLoading };
};
