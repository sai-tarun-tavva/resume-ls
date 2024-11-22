import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputV1 from "../../../Atoms/components/Inputs/InputV1";
import Button from "../../../Atoms/components/Button";
import Loader from "../../../Atoms/components/Loader";
import { useInput } from "../../../Atoms/hooks";
import { useLoading, useStatus } from "../../../../store";
import { resultActions } from "../../store";
import {
  dispatchAsync,
  extractOnlyDigits,
  initiateCall,
  questValidations,
  transformPhoneNumber,
} from "../../../../utilities";
import {
  CONTENT,
  LOADING_ACTION_TYPES,
  STATUS_CODES,
} from "../../../../constants";
import classes from "./index.module.scss";
import CallingDisplay from "../CallingDisplay";

const { BUTTON } = LOADING_ACTION_TYPES;

const CallerInput = () => {
  const { updateStatus, resetStatus } = useStatus();
  const { isLoading, enableButtonLoading, disableButtonLoading } = useLoading();
  const dispatch = useDispatch();
  const { questions, sessionID } = useSelector((state) => state.result);
  const [phoneNumber, setPhoneNumber] = useState("");

  const {
    value: phoneNumberValue,
    handleInputChange: phoneNumberChange,
    handleInputBlur: phoneNumberBlur,
    error: phoneNumberError,
    forceValidations: forcePhoneNumberValidations,
    clearValue: clearPhoneNumber,
  } = useInput("", questValidations.phone, transformPhoneNumber, true);

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
          placeholder="Candidate Phone Number"
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
          disabled={questions.length === 0}
          className={classes.buttonExtraClass}
        >
          <i className="bi bi-telephone" />
        </Button>
      </div>

      {isLoading[BUTTON] ? (
        <Loader extraClass={classes.loaderExtraClass} />
      ) : sessionID ? (
        <CallingDisplay phoneNumber={phoneNumber} />
      ) : (
        <div className={classes.noContent}>
          <p>
            Click <strong>Call Button</strong> to initiate the call
          </p>
        </div>
      )}
    </>
  );
};

CallerInput.displayName = "CallerInput";
export default CallerInput;
