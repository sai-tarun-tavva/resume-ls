import { useState, useEffect, useContext } from "react";
import { LoadingContext } from "../store";

export const useTargetCount = () => {
  const [targetCount, setTargetCount] = useState(0);
  const { isFetching: isLoading, handleFetching: setLoading } =
    useContext(LoadingContext);

  useEffect(() => {
    setLoading(true);
    // Fetch the target count when the hook is used
    const fetchTargetCount = async () => {
      try {
        const response = await fetch(
          // pending change
          "https://run.mocky.io/v3/0782b71c-7a32-4e74-95cd-540fd72fde64"
        );

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
  }, [setLoading]); // Ensure this runs only once on mount

  return { targetCount, isLoading };
};
