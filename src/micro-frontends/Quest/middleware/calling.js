import { resultActions } from "../store";
import callingSound from "../../../assets/calling.mp3";
import onCallAliceSound from "../../../assets/alice-voice.mp3";
import onCallBackgroundSound from "../../../assets/alice-background.mp3";
import notificationSound from "../../../assets/convo_notification.wav";
import { QUEST } from "../../../constants";

let callDurationInterval = null;
let callingTimeoutId = null;
let callingAudio = null;
let onCallAliceAudio = null;
let onCallBackgroundAudio = null;
let notificationAudio = null;

/**
 * Utility function to clear and stop the calling audio.
 * Ensures the `callingAudio` instance is properly stopped and memory is released.
 */
const clearCallingAudio = () => {
  if (callingAudio) {
    callingAudio.pause();
    callingAudio = null;
  }
};

/**
 * Utility function to clear "on call" audio.
 * Stops both Alice's voice and background music, ensuring clean audio transitions.
 */
const clearOnCallAudio = () => {
  if (onCallAliceAudio || onCallBackgroundAudio) {
    if (onCallAliceAudio) {
      onCallAliceAudio.pause();
      onCallAliceAudio = null;
    }
    if (onCallBackgroundAudio) {
      onCallBackgroundAudio.pause();
      onCallBackgroundAudio = null;
    }
  }
};

/**
 * Utility function to clear notification audio.
 * Ensures any previously playing notification sound is stopped.
 */
const clearNotificationAudio = () => {
  if (notificationAudio) {
    notificationAudio.pause();
    notificationAudio = null;
  }
};

/**
 * Middleware for managing call status and duration logic.
 *
 * Handles:
 * - Playing audio during the "calling" phase.
 * - Transitioning to "on call" state after a 1-minute timeout.
 * - Playing appropriate sounds during call states like logout or session end.
 *
 * @function calling
 * @param {Object} store - The Redux store instance.
 * @returns {Function} Middleware function for Redux.
 */
const calling = (store) => (next) => (action) => {
  /**
   * Handles session initiation when callStatus is updated with "calling".
   * Plays the calling sound and transitions to "on call" state after 1 minute.
   */
  if (
    action.type === resultActions.updateCallStatus.type &&
    action.payload === QUEST.CALL_STATUSES.CALLING
  ) {
    // Clear any existing resources (timeouts, intervals, audio)
    if (callingTimeoutId) {
      clearTimeout(callingTimeoutId);
    }
    if (callDurationInterval) {
      clearInterval(callDurationInterval);
    }
    clearCallingAudio();
    clearOnCallAudio();
    clearNotificationAudio();

    // Reset call duration to 0 and set the calling state to true
    store.dispatch(resultActions.updateCallDuration(0));
    store.dispatch(resultActions.updateIsCalling(true));

    // Create and play the calling sound (loop enabled)
    callingAudio = new Audio(callingSound);
    callingAudio.loop = true;
    callingAudio.play().catch((error) => {
      console.warn("Calling audio playback failed:", error);
    });

    // Set a 1-minute timeout to transition to "on call" state
    callingTimeoutId = setTimeout(() => {
      clearCallingAudio();
      clearNotificationAudio();

      // Start the on-call sounds (Alice's voice and background music)
      onCallAliceAudio = new Audio(onCallAliceSound);
      onCallBackgroundAudio = new Audio(onCallBackgroundSound);

      // Configure volumes and loop for the background music
      onCallAliceAudio.volume = 0.8;
      onCallBackgroundAudio.volume = 0.5;
      onCallBackgroundAudio.loop = true;

      // Play the audio files
      onCallAliceAudio.play().catch((error) => {
        console.warn("On-call Alice audio playback failed:", error);
      });
      onCallBackgroundAudio.play().catch((error) => {
        console.warn("On-call background audio playback failed:", error);
      });

      // Update the Redux state to indicate transition to "on call"
      store.dispatch(resultActions.updateIsCalling(false));

      // Start the call duration timer (increments every second)
      callDurationInterval = setInterval(() => {
        const currentDuration = store.getState().result.callDuration;
        store.dispatch(resultActions.updateCallDuration(currentDuration + 1));
      }, 1000);
    }, 60000); // Timeout set to 60 seconds (1 minute)
  }

  /**
   * Handles cleanup when the callStatus is not "calling" or user logs out.
   * Stops all audio, clears timers, and resets state.
   */
  if (
    (action.type === resultActions.updateCallStatus.type &&
      Object.values(QUEST.CALL_STATUSES)
        .filter((status) => status !== QUEST.CALL_STATUSES.CALLING)
        .includes(action.payload)) ||
    action.type === "LOGOUT"
  ) {
    // Clear all audio instances
    clearCallingAudio();
    clearOnCallAudio();
    clearNotificationAudio();

    // If the session ends, play a notification sound with a delay of 1s
    if (
      action.type === resultActions.updateCallStatus.type &&
      Object.values(QUEST.CALL_STATUSES)
        .filter((status) => status !== QUEST.CALL_STATUSES.CALLING)
        .includes(action.payload)
    ) {
      setTimeout(() => {
        notificationAudio = new Audio(notificationSound);
        notificationAudio.play().catch((error) => {
          console.warn("Notification audio playback failed:", error);
        });
      }, 1000);
    }

    // Clear timeouts and intervals
    if (callingTimeoutId) {
      clearTimeout(callingTimeoutId);
      callingTimeoutId = null;
    }
    if (callDurationInterval) {
      clearInterval(callDurationInterval);
      callDurationInterval = null;
    }

    // Reset Redux state for calling and call duration
    store.dispatch(resultActions.updateIsCalling(true));
    store.dispatch(resultActions.updateCallDuration(0));
  }

  // Proceed to the next middleware or reducer
  return next(action);
};

export { calling, callDurationInterval };
