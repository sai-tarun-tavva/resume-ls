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

const CallerInput = () => {
  const { updateStatus, resetStatus } = useStatus();
  const { isLoading, enableButtonLoading, disableButtonLoading } = useLoading();
  const dispatch = useDispatch();
  const { questions, sessionID, conversation } = useSelector(
    (state) => state.result
  );
  const [phoneNumber, setPhoneNumber] = useState("");

  const {
    value: phoneNumberValue,
    handleInputChange: phoneNumberChange,
    handleInputBlur: phoneNumberBlur,
    error: phoneNumberError,
    forceValidations: forcePhoneNumberValidations,
    clearValue: clearPhoneNumber,
  } = useInput("", questValidations.phone, transformPhoneNumber, true);

  useEffect(() => {
    if (!sessionID) return;

    let failureCount = 0;
    const interval = setInterval(async () => {
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

        // Stop polling after 5 failures and update status
        if (failureCount >= 5) {
          clearInterval(interval);
          dispatch(resultActions.updateSessionID(""));
          updateStatus({
            message:
              "We are unable to determine the call status. Please check manually.",
            type: "failure",
          });
        }
      }
    }, 1.5 * 60 * 1000); // 2 minutes interval

    return () => {
      clearInterval(interval); // Cleanup on unmount or when sessionID changes
    };
  }, [sessionID, dispatch, updateStatus]);

  const callHandler = async (event) => {
    event.preventDefault();
    if (isLoading[BUTTON]) return;

    await dispatchAsync(resetStatus);

    if (!phoneNumberValue) forcePhoneNumberValidations();
    else {
      enableButtonLoading();

      const formData = new FormData();
      formData.append("target_number", extractOnlyDigits(phoneNumberValue));

      const { status, data } = await initiateCall(formData);

      if (status === STATUS_CODES.SUCCESS) {
        dispatch(resultActions.updateSessionID(data));
        setPhoneNumber(phoneNumberValue);
        clearPhoneNumber();
      } else {
        updateStatus({
          message: CONTENT.COMMON.serverError,
          type: "failure",
        });
      }

      disableButtonLoading();
    }
  };

  return (
    <>
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
