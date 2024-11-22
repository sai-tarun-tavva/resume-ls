import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CallingDisplay from "../CallingDisplay";
import Conversation from "../Conversation";
import InputV1 from "../../../Atoms/components/Inputs/InputV1";
import Button from "../../../Atoms/components/Button";
import Loader from "../../../Atoms/components/Loader";
import { useInput } from "../../../Atoms/hooks";
import { useLoading, useStatus } from "../../../../store";
import { resultActions } from "../../store";
import {
  dispatchAsync,
  extractOnlyDigits,
  getConversation,
  initiateCall,
  questValidations,
  replaceRouteParam,
  transformPhoneNumber,
} from "../../../../utilities";
import {
  CONTENT,
  END_POINTS,
  LOADING_ACTION_TYPES,
  STATUS_CODES,
} from "../../../../constants";
import classes from "./index.module.scss";

const { BUTTON } = LOADING_ACTION_TYPES;

/**
 * CallerInput Component
 *
 * Manages user input for initiating calls, validates phone numbers, handles API communication,
 * and displays calling information or conversations based on the current state.
 *
 * @component
 * @returns {JSX.Element} The CallerInput component.
 */
const CallerInput = () => {
  // Hooks for managing state and dispatch
  const { updateStatus, resetStatus } = useStatus();
  const { isLoading, enableButtonLoading, disableButtonLoading } = useLoading();
  const dispatch = useDispatch();

  // Redux state selectors
  const { questions, sessionID, conversation } = useSelector(
    (state) => state.result
  );

  // Local state for managing phone number display
  const [phoneNumber, setPhoneNumber] = useState("");

  // Custom hook for input management and validation
  const {
    value: phoneNumberValue,
    handleInputChange: phoneNumberChange,
    handleInputBlur: phoneNumberBlur,
    error: phoneNumberError,
    forceValidations: forcePhoneNumberValidations,
    clearValue: clearPhoneNumber,
  } = useInput("", questValidations.phone, transformPhoneNumber, true);

  /*
   * Polling for conversation updates when sessionID exists
   */
  useEffect(() => {
    if (!sessionID) return;

    let failureCount = 0;

    const interval = setInterval(async () => {
      try {
        const { status, data, isEnded } = await getConversation(
          replaceRouteParam(END_POINTS.QUEST.GET_CONVERSATION, { sessionID })
        );

        if (status === STATUS_CODES.SUCCESS) {
          if (isEnded) {
            dispatch(resultActions.updateConversation(data));
            dispatch(resultActions.updateSessionID(""));
            clearInterval(interval); // Stop polling if the call is ended
          }
        } else {
          failureCount += 1;
          if (failureCount >= 5) {
            clearInterval(interval); // Stop polling after 5 failures
            dispatch(resultActions.updateSessionID(""));
            updateStatus({
              message: CONTENT.QUEST.statusMessages.conversation,
              type: "failure",
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch conversation:", error);
        updateStatus({
          message: CONTENT.QUEST.statusMessages.conversation,
          type: "failure",
        });
      }
    }, 120000); // 2 minutes interval

    // Cleanup the interval on unmount or sessionID change
    return () => clearInterval(interval);
  }, [sessionID, dispatch, updateStatus]);

  /**
   * Handles the initiation of a call.
   *
   * @param {React.FormEvent} event - The form submission event.
   */
  const callHandler = async (event) => {
    event.preventDefault();

    if (isLoading[BUTTON]) return; // Prevent duplicate actions

    await dispatchAsync(resetStatus); // Reset status before the call

    if (!phoneNumberValue) {
      forcePhoneNumberValidations(); // Trigger validations if input is empty
    } else {
      enableButtonLoading(); // Enable button loading state

      try {
        const formData = new FormData();
        formData.append("target_number", extractOnlyDigits(phoneNumberValue));

        const { status, data } = await initiateCall(formData);

        if (status === STATUS_CODES.SUCCESS) {
          dispatch(resultActions.updateSessionID(data));
          setPhoneNumber(phoneNumberValue);
          clearPhoneNumber(); // Clear input after successful submission
        } else {
          updateStatus({
            message: CONTENT.COMMON.serverError,
            type: "failure",
          });
        }
      } catch (error) {
        updateStatus({
          message: CONTENT.COMMON.serverError,
          type: "failure",
        });
        console.error("Call initiation failed:", error);
      } finally {
        disableButtonLoading(); // Disable button loading state
      }
    }
  };

  return (
    <>
      {/* Phone number input and call button */}
      <div className={classes.callerInputContainer}>
        <InputV1
          id="phoneNumber"
          type="tel"
          placeholder={CONTENT.QUEST.input.text.placeholder}
          value={phoneNumberValue}
          onChange={phoneNumberChange}
          onBlur={phoneNumberBlur}
          error={phoneNumberError}
          leftIcon={<i className="bi bi-telephone-fill" />}
          extraClassControl={classes.inputExtraClass}
          disabled={questions.length === 0}
        />

        <Button
          onClick={callHandler}
          disabled={questions.length === 0 || sessionID !== ""}
          className={classes.buttonExtraClass}
        >
          <i className="bi bi-telephone" />
        </Button>
      </div>

      {/* Conditional rendering based on state */}
      {isLoading[BUTTON] ? (
        <Loader extraClass={classes.loaderExtraClass} />
      ) : sessionID ? (
        <CallingDisplay phoneNumber={phoneNumber} />
      ) : Object.keys(conversation).length > 0 ? (
        <Conversation />
      ) : (
        <div className={classes.noContent}>
          {CONTENT.QUEST.input.text.default.split("{{buttonName}}")[0]}
          <i className="bi bi-telephone-fill" />
          {CONTENT.QUEST.input.text.default.split("{{buttonName}}")[1]}
        </div>
      )}
    </>
  );
};

CallerInput.displayName = "CallerInput";
export default CallerInput;
