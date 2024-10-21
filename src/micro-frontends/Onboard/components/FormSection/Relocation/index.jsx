import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "../../../../Atoms/components/Inputs/Checkbox";
import Select from "../../../../Atoms/components/Inputs/Select";
import Address from "../Address";
import { useInput } from "../../../../Atoms/hooks";
import { defaultAddress, inputActions } from "../../../store";
import {
  determineSectionValidity,
  onboardingValidations,
} from "../../../../../utilities";
import { SECTIONS, FIELDS, OPTIONS } from "../../../constants";
import classes from "./index.module.scss";

const Relocation = forwardRef((_, ref) => {
  const dispatch = useDispatch();
  const {
    data: {
      relocation: { interested, preference, address },
    },
  } = useSelector((state) => state.input);
  const addressRef = useRef(); // Create a ref to call Address validation

  const { relocation: validations } = onboardingValidations;

  // Relocation validation and input handling
  const {
    value: interestedValue,
    handleInputChange: interestedChange,
    handleInputBlur: interestedBlur,
  } = useInput(
    interested === FIELDS.RELOCATION.INTERESTED.OPTIONS.YES ? true : false
  );

  const {
    value: preferenceValue,
    handleInputChange: preferenceChange,
    handleInputBlur: preferenceBlur,
    handleInputFocus: preferenceFocus,
    error: preferenceError,
    isFocused: isPreferenceFocused,
    forceValidations: forcePreferenceValidations,
    resetValue: resetPreference,
  } = useInput(preference, validations.stayPreference, undefined, true);

  useEffect(() => {
    resetPreference();
  }, [interestedValue, resetPreference]);

  useEffect(() => {
    addressRef.current?.resetValues?.();
    if (preferenceValue !== "other")
      dispatch(
        inputActions.updateField({
          section: SECTIONS.RELOCATION,
          field: FIELDS.RELOCATION.ADDRESS,
          value: defaultAddress,
        })
      );
  }, [preferenceValue, dispatch]);

  // Group all errors and values for relocation
  const relocationErrors = [interestedValue ? preferenceError : false];
  const relocationValues = [interestedValue ? preferenceValue : true];

  const isRelocationValid = determineSectionValidity(
    relocationErrors,
    relocationValues
  );

  // Force Relocation validations
  const forceRelocationValidations = () => {
    if (interestedValue) forcePreferenceValidations();
  };

  const submit = () => {
    const addressSubmitResult = addressRef.current?.submit?.();
    const isAddressValid = addressSubmitResult?.isSectionValid;
    const address = addressSubmitResult?.item;

    if (!isRelocationValid || isAddressValid === false) {
      // isAddressValid is undefined when unmounted or not rendered
      forceRelocationValidations();
      addressRef.current?.forceValidations(); // Force Address validation
      return false;
    }

    // Dispatch actions for Relocation data
    dispatch(
      inputActions.updateField({
        section: SECTIONS.RELOCATION,
        field: FIELDS.RELOCATION.INTERESTED.VALUE,
        value: interestedValue
          ? FIELDS.RELOCATION.INTERESTED.OPTIONS.YES
          : FIELDS.RELOCATION.INTERESTED.OPTIONS.NO,
      })
    );
    if (interestedValue) {
      dispatch(
        inputActions.updateField({
          section: SECTIONS.RELOCATION,
          field: FIELDS.RELOCATION.PREFERENCE,
          value: preferenceValue,
        })
      );
    }
    if (address) {
      dispatch(
        inputActions.updateField({
          section: SECTIONS.RELOCATION,
          field: FIELDS.RELOCATION.ADDRESS,
          value: address,
        })
      );
    }
    return true;
  };

  // Expose methods to parent using ref
  useImperativeHandle(ref, () => ({
    submit,
  }));

  return (
    <>
      <Checkbox
        id="relocationInterested"
        label="Interested in Relocation?"
        value={interestedValue}
        changeHandler={interestedChange}
        blurHandler={interestedBlur}
        helperText="(Considered yes by default)"
        extraClass={classes.fullInputWidth}
        isRequired
      />
      {interestedValue && (
        <Select
          id="relocationPreference"
          label="Preference of stay"
          options={OPTIONS.STAY_PREFERENCE}
          value={preferenceValue}
          changeHandler={preferenceChange}
          blurHandler={preferenceBlur}
          focusHandler={preferenceFocus}
          error={preferenceError}
          isFocused={isPreferenceFocused}
          extraClass={classes.fullInputWidth}
          isRequired
        />
      )}
      {preferenceValue === "other" && (
        <Address
          heading="What is the relocation address?"
          defaultValue={address}
          id="relocation"
          ref={addressRef}
        />
      )}
    </>
  );
});

Relocation.displayName = "FormRelocation";
export default Relocation;
