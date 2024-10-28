import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "../../../../Atoms/components/Inputs/Checkbox";
import Select from "../../../../Atoms/components/Inputs/Select";
import Address from "../Address";
import { useSectionInputsFocus } from "../../../hooks";
import { useInput } from "../../../../Atoms/hooks";
import { defaultAddress, inputActions } from "../../../store";
import {
  areObjectsEqual,
  determineSectionValidity,
  focusErrorsIfAny,
  onboardingValidations,
} from "../../../../../utilities";
import { SECTIONS, FIELDS, OPTIONS } from "../../../constants";
import sectionClasses from "../sections.module.scss";

const Relocation = forwardRef((_, ref) => {
  const dispatch = useDispatch();
  const {
    currentSectionIndex,
    data: {
      relocation: { interested, preference, howSoon, address },
    },
  } = useSelector((state) => state.input);
  const addressRef = useRef(); // Create a ref to call Address validation
  const sectionRef = useSectionInputsFocus(currentSectionIndex);

  const { relocation: validations } = onboardingValidations;

  const interestedAsBoolean =
    interested === FIELDS.RELOCATION.INTERESTED.OPTIONS.YES ? true : false;

  // Relocation validation and input handling
  const {
    value: interestedValue,
    handleInputChange: interestedChange,
    handleInputBlur: interestedBlur,
  } = useInput(interestedAsBoolean);

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

  const {
    value: howSoonValue,
    handleInputChange: howSoonChange,
    handleInputBlur: howSoonBlur,
    handleInputFocus: howSoonFocus,
    error: howSoonError,
    isFocused: isHowSoonFocused,
    forceValidations: forceHowSoonValidations,
  } = useInput(howSoon, validations.howSoon, undefined, true);

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
  const relocationErrors = [
    interestedValue ? preferenceError : false,
    interestedValue ? howSoonError : false,
  ];
  const relocationValues = [
    interestedValue ? preferenceValue : true,
    interestedValue ? howSoonValue : true,
  ];

  const isRelocationValid = determineSectionValidity(
    relocationErrors,
    relocationValues
  );

  // Force Relocation validations
  const forceRelocationValidations = () => {
    if (interestedValue) {
      forcePreferenceValidations();
      forceHowSoonValidations();
    }
  };

  const hasFormChanged = (relocationAddress) => {
    return (
      interestedValue !== interestedAsBoolean ||
      preferenceValue !== preference ||
      howSoonValue !== howSoon ||
      !areObjectsEqual(address, relocationAddress)
    );
  };

  const submit = () => {
    const addressSubmitResult = addressRef.current?.submit?.();
    const isAddressValid = addressSubmitResult?.isSectionValid;
    const relocationAddress = addressSubmitResult?.item;

    if (!isRelocationValid || isAddressValid === false) {
      // isAddressValid is undefined when unmounted or not rendered
      forceRelocationValidations();
      addressRef.current?.forceValidations(); // Force Address validation
      focusErrorsIfAny(sectionRef);
      return false;
    }

    if (hasFormChanged(relocationAddress)) {
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
        dispatch(
          inputActions.updateField({
            section: SECTIONS.RELOCATION,
            field: FIELDS.RELOCATION.HOW_SOON,
            value: howSoonValue,
          })
        );
      }
      if (address) {
        dispatch(
          inputActions.updateField({
            section: SECTIONS.RELOCATION,
            field: FIELDS.RELOCATION.ADDRESS,
            value: relocationAddress,
          })
        );
      }
    }
    return true;
  };

  // Expose methods to parent using ref
  useImperativeHandle(ref, () => ({
    submit,
  }));

  return (
    <div ref={sectionRef} className={sectionClasses.onboardFormSection}>
      <Checkbox
        id="relocationInterested"
        label="Interested in Relocation?"
        value={interestedValue}
        changeHandler={interestedChange}
        blurHandler={interestedBlur}
        helperText="(Considered yes by default)"
        extraClass={sectionClasses.fullInputWidth}
        isRequired
      />
      {interestedValue && (
        <>
          <Select
            id="howSoonRelocation"
            label="How soon are you willing to relocate?"
            options={OPTIONS.HOW_SOON_RELOCATION}
            value={howSoonValue}
            changeHandler={howSoonChange}
            blurHandler={howSoonBlur}
            focusHandler={howSoonFocus}
            error={howSoonError}
            isFocused={isHowSoonFocused}
            extraClass={sectionClasses.fullInputWidth}
            isRequired
          />
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
            extraClass={sectionClasses.fullInputWidth}
            isRequired
          />
        </>
      )}
      {preferenceValue === "other" && (
        <Address
          heading="What is the relocation address?"
          defaultValue={address}
          id="relocation"
          ref={addressRef}
        />
      )}
    </div>
  );
});

Relocation.displayName = "FormRelocation";
export default Relocation;
