import { resultActions } from "../store";
import { getConversation, replaceRouteParam } from "../../../utilities";
import { END_POINTS, STATUS_CODES, CONTENT, QUEST } from "../../../constants";

let pollingInterval = null; // Variable to hold the interval ID for polling
let updateStatusCallback = null; // Callback function for updating status (provided dynamically)
let pollingIterations = 0; // Track the number of polling iterations

/**
 * Sets the callback function to handle status updates.
 *
 * @function setUpdateStatus
 * @param {Function} callback - A function to update the status in a global or component-specific context.
 */
const setUpdateStatus = (callback) => {
  updateStatusCallback = callback;
};

/**
 * Middleware for handling polling based on callStatus changes.
 * Starts polling when a callStatus is set as calling, and stops when the session ends or polling is explicitly stopped.
 *
 * @function polling
 * @param {Object} store - The Redux store instance.
 * @returns {Function} Middleware function for Redux.
 */
const polling = (store) => (next) => async (action) => {
  // Handles call updates
  if (
    action.type === resultActions.updateCallStatus.type &&
    action.payload === QUEST.CALL_STATUSES.CALLING
  ) {
    const sessionID = store.getState().result.sessionID; // Extract the new sessionID from the action payload

    if (pollingInterval) {
      clearInterval(pollingInterval); // Clear any existing polling interval to avoid duplicates
    }

    if (sessionID) {
      pollingIterations = 0; // Reset iterations when a new session starts

      const startPolling = (interval) => {
        pollingInterval = setInterval(async () => {
          try {
            // Call the API to fetch conversation details based on sessionID
            const { status, data, callStatus } = await getConversation(
              replaceRouteParam(END_POINTS.QUEST.GET_CONVERSATION, {
                sessionID,
              })
            );

            // If the API call is successful
            if (status === STATUS_CODES.SUCCESS) {
              if (
                Object.values(QUEST.CALL_STATUSES)
                  .filter((status) => status !== QUEST.CALL_STATUSES.CALLING)
                  .includes(callStatus)
              ) {
                // If the session has ended, update the conversation and stop polling
                store.dispatch(resultActions.updateConversation(data));
                store.dispatch(resultActions.updateCallStatus(callStatus));
                store.dispatch(resultActions.updateSessionID(""));
                clearInterval(pollingInterval); // Stop polling when session ends
              }
            } else {
              // Increment failure count if the status is not successful
              const failureCount = store.getState().result.failureCount;
              store.dispatch(
                resultActions.updateFailureCount(failureCount + 1)
              );

              // Stop polling after 5 consecutive failures
              if (failureCount >= 5) {
                clearInterval(pollingInterval);
                store.dispatch(resultActions.updateSessionID(""));
                store.dispatch(resultActions.updateCallStatus("server-error"));

                // Trigger a failure status update using the provided callback
                if (updateStatusCallback) {
                  updateStatusCallback({
                    message: CONTENT.QUEST.statusMessages.conversation,
                    type: "failure",
                  });
                }
              }
            }

            // Adjust interval dynamically based on iterations
            pollingIterations += 1;
            if (pollingIterations === 2) {
              clearInterval(pollingInterval); // Clear 45s interval after 2 iterations
              startPolling(90000); // Switch to 90s interval
            }
          } catch (error) {
            // Handle unexpected errors during polling
            clearInterval(pollingInterval); // Stop polling on error
            console.error("Polling failed:", error);
          }
        }, interval); // Use the provided interval for polling
      };

      // Start polling with the initial interval (45 seconds)
      startPolling(45000);
    }
  }

  // Explicitly handle stop polling actions
  if (
    action.type === resultActions.stopPolling.type ||
    action.type === "LOGOUT"
  ) {
    clearInterval(pollingInterval); // Stop polling when requested
    pollingInterval = null;
  }

  return next(action); // Proceed to the next middleware or reducer
};

export { polling, pollingInterval, setUpdateStatus };
