import { forwardRef, useImperativeHandle, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputV2 from "../../../../Atoms/components/Inputs/InputV2";
import ListAdd from "../ListAdd";
import Address from "../Address";
import { useInput } from "../../../../Atoms/hooks";
import { defaultAddress, inputActions } from "../../../store";
import {
  determineSectionValidity,
  onboardingValidations,
} from "../../../../../utilities";
import { SECTIONS, FIELDS } from "../../../constants";
import classes from "./index.module.scss";

const USTravelAndStay = forwardRef((_, ref) => {
  const dispatch = useDispatch();
  const {
    data: {
      usTravelAndStay: { usEntry, stayAddresses },
    },
  } = useSelector((state) => state.input);

  const { usTravelAndStay: validations } = onboardingValidations;

  // Entry Date (Month and Year only)
  const {
    value: usEntryValue,
    handleInputChange: usEntryChange,
    handleInputBlur: usEntryBlur,
    handleInputFocus: usEntryFocus,
    error: usEntryError,
    isFocused: isUsEntryFocused,
    forceValidations: forceUsEntryValidations,
  } = useInput(usEntry, validations.usEntry, undefined, true);

  const stayAddressesRef = useRef();

  const allErrors = [usEntryError];
  const allValues = [usEntryValue];

  const isSectionValid = determineSectionValidity(allErrors, allValues);

  const forceValidations = () => {
    forceUsEntryValidations();
  };

  const submit = () => {
    const { isSectionValid: areAddressesValid, listItems: addresses } =
      stayAddressesRef?.current?.submit?.();

    if (!isSectionValid || !areAddressesValid) {
      forceValidations();
      stayAddressesRef.current?.forceValidations?.();
      return false;
    }

    dispatch(
      inputActions.updateField({
        section: SECTIONS.US_TRAVEL_AND_STAY,
        field: FIELDS.US_TRAVEL_AND_STAY.US_ENTRY,
        value: usEntryValue,
      })
    );

    dispatch(
      inputActions.updateField({
        section: SECTIONS.US_TRAVEL_AND_STAY,
        field: FIELDS.US_TRAVEL_AND_STAY.STAY_ADDRESSES,
        value: addresses,
      })
    );

    return true;
  };

  useImperativeHandle(ref, () => ({
    submit,
  }));

  return (
    <>
      <InputV2
        id="usEntry"
        label="Month and Year of US Entry"
        type="month"
        value={usEntryValue}
        changeHandler={usEntryChange}
        blurHandler={usEntryBlur}
        focusHandler={usEntryFocus}
        error={usEntryError}
        isFocused={isUsEntryFocused}
        extraClass={classes.fullInputWidth}
        isRequired
      />

      <ListAdd
        label="Stay Addresses in the US"
        helperText="(One is mandatory, can add up to 3)"
        heading="Stay Address"
        element={(props) => <Address {...props} />}
        savedListItems={stayAddresses}
        newValue={defaultAddress}
        ref={stayAddressesRef}
        extraClass={classes.addressFullInputWidth}
        mandatoryItems={1}
        maxItems={3}
      />
    </>
  );
});

USTravelAndStay.displayName = "USTravelAndStay";
export default USTravelAndStay;