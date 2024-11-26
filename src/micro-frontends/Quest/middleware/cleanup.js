import { callDurationInterval, pollingInterval } from ".";
import { resultActions } from "../store";

/**
 * Middleware for handling app-wide cleanup during logout or similar actions.
 *
 * @param {Object} store - The Redux store instance.
 * @returns {Function} Middleware function for Redux.
 */
const cleanUp = (store) => (next) => (action) => {
  if (action.type === "LOGOUT") {
    // Clear all intervals
    if (callDurationInterval) clearInterval(callDurationInterval);
    if (pollingInterval) clearInterval(pollingInterval);

    // Reset relevant slices of state
    store.dispatch(resultActions.resetState());
  }

  return next(action); // Pass the action to the next middleware/reducer
};

export { cleanUp };
