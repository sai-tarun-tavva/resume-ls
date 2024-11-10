import { useEffect, useState } from "react";
import { useLoading } from "../../../store";
import { LOADING_ACTION_TYPES } from "../../../constants";

const { APP } = LOADING_ACTION_TYPES;

/**
 * useTargetCount - Custom hook to fetch and manage target count data
 *
 * This custom hook fetches a numeric target count from a specified API endpoint
 * and provides a loading state during the fetch process.
 *
 * The hook leverages a centralized loading state from the `useLoading` store
 * and manages its enable/disable behavior for the `APP` loading action.
 *
 * @param {string} url - The API endpoint to fetch the target count data.
 * @returns {object} - An object with:
 *  - {number} targetCount - The fetched target count value (default is 0).
 *  - {boolean} isLoading - Indicates if the loading state is active for the `APP`.
 *
 * @example
 * const { targetCount, isLoading } = useTargetCount("/api/target-count");
 */
export const useTargetCount = (url) => {
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

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setTargetCount(data);
      } catch (error) {
        console.error("Error fetching target count:", error);
      } finally {
        disableAppLoading();
      }
    };

    fetchTargetCount();
  }, [enableAppLoading, disableAppLoading, url]);

  return { targetCount, isLoading: isLoading[APP] };
};
