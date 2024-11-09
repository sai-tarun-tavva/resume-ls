import { useEffect, useState } from "react";
import { useLoading } from "../../../store";
import { END_POINTS, LOADING_ACTION_TYPES } from "../../../constants";

const { APP } = LOADING_ACTION_TYPES;

/**
 * Custom hook to fetch and manage the target count.
 * Handles loading states and errors during the asynchronous fetch operation.
 *
 * @returns {object} An object containing the target count and the loading state.
 */
export const useTargetCount = () => {
  const { isLoading, enableAppLoading, disableAppLoading } = useLoading();
  const [targetCount, setTargetCount] = useState(0);

  useEffect(() => {
    /**
     * Asynchronously fetches the target count from the API.
     * If the fetch is successful, updates the target count in state.
     * In case of a network or response error, logs the error.
     * Finally, disables the loading state.
     *
     * @async
     * @function fetchTargetCount
     * @throws Will log an error message if the network response is not ok.
     */
    const fetchTargetCount = async () => {
      try {
        enableAppLoading();

        const response = await fetch(END_POINTS.WELCOME.FETCH_RESUME_COUNT);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setTargetCount(+data.resume_count);
      } catch (error) {
        console.error("Error fetching target count:", error);
      } finally {
        disableAppLoading();
      }
    };

    fetchTargetCount();
  }, [enableAppLoading, disableAppLoading]);

  return { targetCount, isLoading: isLoading[APP] };
};
