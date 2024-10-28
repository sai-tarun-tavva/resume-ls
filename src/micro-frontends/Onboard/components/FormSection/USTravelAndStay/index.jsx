import { forwardRef, useImperativeHandle, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputV2 from "../../../../Atoms/components/Inputs/InputV2";
import ListAdd from "../ListAdd";
import Address from "../Address";
import { useSectionInputsFocus, useUpdateCandidate } from "../../../hooks";
import { useInput } from "../../../../Atoms/hooks";
import { defaultAddress, inputActions } from "../../../store";
import {
  arraysEqual,
  determineSectionValidity,
  focusErrorsIfAny,
  onboardingValidations,
} from "../../../../../utilities";
import {
  SECTIONS,
  FIELDS,
  US_STAY_ADDRESSES_OPTIONAL_VISA,
  PORT_OF_ENTRY_NOT_REQUIRED_VISA,
  PORT_OF_ENTRY_OPTIONAL_VISA,
} from "../../../constants";
import sectionClasses from "../sections.module.scss";

const USTravelAndStay = forwardRef((_, ref) => {
  const dispatch = useDispatch();
  const {
    currentSectionIndex,
    data: {
      personal: { visaStatus },
      usTravelAndStay: { usEntry, stayAddresses },
    },
  } = useSelector((state) => state.input);
  const sectionRef = useSectionInputsFocus(currentSectionIndex);
  const { updateCandidate } = useUpdateCandidate();

  const { usTravelAndStay: validations } = onboardingValidations;

  const isPortOfEntryNotRequired =
    PORT_OF_ENTRY_NOT_REQUIRED_VISA.includes(visaStatus);
  const isPortOfEntryOptional =
    PORT_OF_ENTRY_OPTIONAL_VISA.includes(visaStatus);

  const isUSStayAddressesOptional =
    US_STAY_ADDRESSES_OPTIONAL_VISA.includes(visaStatus);

  // Entry Date (Month and Year only)
  const {
    value: usEntryValue,
    handleInputChange: usEntryChange,
    handleInputBlur: usEntryBlur,
    handleInputFocus: usEntryFocus,
    error: usEntryError,
    isFocused: isUsEntryFocused,
    forceValidations: forceUsEntryValidations,
  } = useInput(
    usEntry,
    (value) => validations.usEntry(value, isUSStayAddressesOptional),
    undefined,
    true
  );

  const stayAddressesRef = useRef();

  const allErrors = [usEntryError];
  const allValues = [
    !isPortOfEntryNotRequired && !isPortOfEntryOptional ? usEntryValue : true,
  ];

  const isSectionValid = determineSectionValidity(allErrors, allValues);

  const forceValidations = () => {
    forceUsEntryValidations();
  };

  const hasFormChanged = (addressesCurrent) => {
    return (
      usEntryValue !== usEntry || !arraysEqual(stayAddresses, addressesCurrent)
    );
  };

  const submit = async () => {
    let moveForward = false;
    const { isSectionValid: areAddressesValid, listItems: addresses } =
      stayAddressesRef?.current?.submit?.();

    if (!isSectionValid || !areAddressesValid) {
      if (!isPortOfEntryNotRequired) forceValidations();
      stayAddressesRef.current?.forceValidations?.();
      focusErrorsIfAny(sectionRef);
    } else if (hasFormChanged(addresses)) {
      const isAPICallSuccessful = await updateCandidate();

      if (isAPICallSuccessful) {
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
        moveForward = true;
      }
    } else {
      moveForward = true;
    }
    if (moveForward) {
      dispatch(inputActions.incrementCurrentSectionIndex());
    }
  };

  useImperativeHandle(ref, () => ({
    submit,
  }));

  return (
    <div ref={sectionRef} className={sectionClasses.onboardFormSection}>
      {!isPortOfEntryNotRequired && (
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
          extraClass={sectionClasses.fullInputWidth}
          isRequired={!isPortOfEntryOptional}
        />
      )}

      <ListAdd
        label="Stay Addresses in the US"
        helperText="(One is mandatory, can add up to 3)"
        heading="Stay Address"
        element={(props) => <Address {...props} />}
        savedListItems={
          stayAddresses.length > 0
            ? stayAddresses
            : !isUSStayAddressesOptional
            ? [defaultAddress]
            : []
        }
        newValue={defaultAddress}
        ref={stayAddressesRef}
        extraClass={sectionClasses.addressFullInputWidth}
        mandatoryItems={isUSStayAddressesOptional ? 0 : 1}
        maxItems={3}
      />
    </div>
  );
});

USTravelAndStay.displayName = "USTravelAndStay";
export default USTravelAndStay;
