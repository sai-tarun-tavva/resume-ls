import { forwardRef, useImperativeHandle, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Address from "../Address";
import Checkbox from "../../../../Atoms/components/Inputs/Checkbox";
import { useInput } from "../../../../Atoms/hooks";
import { defaultAddress, inputActions } from "../../../store";
import {
  FIELDS,
  INDIAN_ADDRESS_VISA_STATUSES,
  SECTIONS,
} from "../../../constants";
import classes from "./index.module.scss";

const Location = forwardRef((_, ref) => {
  const usaLocRef = useRef();
  const indiaLocRef = useRef();
  const dispatch = useDispatch();
  const {
    data: {
      personal: { usaLocation, indiaLocation, visaStatus },
    },
  } = useSelector((state) => state.input);

  const isIndianAddressRequired =
    INDIAN_ADDRESS_VISA_STATUSES.includes(visaStatus);

  const {
    value: haveIndianAddressValue,
    handleInputChange: haveIndianAddressChange,
    handleInputBlur: haveIndianAddressBlur,
  } = useInput(false);

  const submit = () => {
    const { isSectionValid: isUSAAddressValid, item: usaAddress } =
      usaLocRef.current?.submit?.(); // Check if Address is valid

    let indiaAddressSubmitResult,
      isIndiaAddressValid,
      indiaAddress = defaultAddress;

    if (isIndianAddressRequired || haveIndianAddressValue) {
      indiaAddressSubmitResult = indiaLocRef.current?.submit?.();
      isIndiaAddressValid = indiaAddressSubmitResult?.isSectionValid;
      indiaAddress = indiaAddressSubmitResult?.item;
    }

    if (!isUSAAddressValid || isIndiaAddressValid === false) {
      // checks with false to tackle undefined response from address
      return false;
    }

    dispatch(
      inputActions.updateField({
        section: SECTIONS.PERSONAL,
        field: FIELDS.PERSONAL.USA_LOCATION,
        value: usaAddress,
      })
    );
    dispatch(
      inputActions.updateField({
        section: SECTIONS.PERSONAL,
        field: FIELDS.PERSONAL.INDIA_LOCATION,
        value: indiaAddress,
      })
    );

    return true;
  };

  // Expose methods to parent using ref
  useImperativeHandle(ref, () => ({
    submit,
  }));

  return (
    <>
      <Address
        heading="Address in USA"
        defaultValue={usaLocation}
        id="current"
        ref={usaLocRef}
      />
      {!isIndianAddressRequired && (
        <Checkbox
          id="anyIndianAddress"
          label="Have any address in India?"
          value={haveIndianAddressValue}
          changeHandler={haveIndianAddressChange}
          blurHandler={haveIndianAddressBlur}
          helperText="(Considered no by default)"
          extraClass={classes.fullInputWidth}
          isRequired
        />
      )}
      {(isIndianAddressRequired || haveIndianAddressValue) && (
        <Address
          heading="Address in India"
          defaultValue={indiaLocation}
          id="current"
          ref={indiaLocRef}
          isRequired={isIndianAddressRequired}
        />
      )}
    </>
  );
});

Location.displayName = "Location";
export default Location;
