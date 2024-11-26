import { useEffect } from "react";
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
  determineSectionValidity,
  dispatchAsync,
  extractOnlyDigits,
  initiateCall,
  questValidations,
  transformPhoneNumber,
} from "../../../../utilities";
import {
  CONTENT,
  LOADING_ACTION_TYPES,
  QUEST,
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
  const { questions, sessionID, callStatus } = useSelector(
    (state) => state.result
  );

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
   * Polling for conversation updates when sessionID exists, this starts polling fetches for conversation with certain interval
   */
  useEffect(() => {
    dispatch(resultActions.startPolling());
  }, [dispatch]);

  /**
   * Handles the initiation of a call.
   *
   * @param {React.FormEvent} event - The form submission event.
   */
  const callHandler = async (e) => {
    e.preventDefault();

    if (isLoading[BUTTON]) return; // Prevent duplicate actions

    await dispatchAsync(resetStatus); // Reset status before the call

    if (!determineSectionValidity([phoneNumberError], [phoneNumberValue])) {
      forcePhoneNumberValidations(); // Trigger validations if input is empty
    } else {
      enableButtonLoading(); // Enable button loading state

      try {
        const formData = new FormData();
        formData.append("target_number", extractOnlyDigits(phoneNumberValue));

        const { status, data } = await initiateCall(formData);

        if (status === STATUS_CODES.SUCCESS) {
          dispatch(resultActions.updateSessionID(data));
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
    <div className={classes.overlay}>
      <div className={classes.content}>
        {/* Conditional rendering based on state */}
        {isLoading[BUTTON] ? (
          <Loader extraClass={classes.loaderExtraClass} />
        ) : sessionID ? (
          <CallingDisplay />
        ) : Object.values(QUEST.CALL_STATUSES).includes(callStatus) ? (
          <Conversation />
        ) : (
          <>
            <h1 className={classes.title}>
              {CONTENT.QUEST.input.callerOverlay.title1}
              <span className={classes.highlight}>
                {CONTENT.QUEST.input.callerOverlay.title2}
              </span>
              {CONTENT.QUEST.input.callerOverlay.title3}
            </h1>
            <p className={classes.subTitle}>
              {CONTENT.QUEST.input.callerOverlay.subTitle}
            </p>
            <div className={classes.inputSection}>
              <InputV1
                id="phoneNumber"
                type="tel"
                placeholder={CONTENT.QUEST.input.text.placeholder}
                value={phoneNumberValue}
                onChange={(event) => {
                  phoneNumberChange(event);
                  dispatch(resultActions.updatePhoneNumber(event.target.value));
                }}
                onBlur={phoneNumberBlur}
                error={phoneNumberError}
                extraClassControl={classes.inputExtraClass}
                disabled={questions.length === 0 || sessionID !== ""}
              />
              <Button
                onClick={callHandler}
                disabled={questions.length === 0 || sessionID !== ""}
                className={classes.buttonExtraClass}
              >
                {CONTENT.QUEST.input.callerOverlay.button.default}{" "}
                <i className="bi bi-telephone-fill" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

CallerInput.displayName = "CallerInput";
export default CallerInput;
