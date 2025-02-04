import { forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Checkbox from "../../../../Atoms/components/Inputs/Checkbox";
import Select from "../../../../Atoms/components/Inputs/Select";
import Address from "../Address";
import { useSectionInputsFocus } from "../../../../../hooks";
import { useInput } from "../../../../Atoms/hooks";
import { useLoading } from "../../../../../store";
import { defaultAddress, inputActions } from "../../../store";
import {
  determineSectionValidity,
  focusErrorsIfAny,
  onboardingValidations,
} from "../../../../../utilities";
import {
  LOADING_ACTION_TYPES,
  INPUT_TYPES,
  CONTENT,
} from "../../../../../constants";
import { SECTIONS, FIELDS, OPTIONS } from "../../../constants";
import sectionClasses from "../sections.module.scss";

const { BUTTON } = LOADING_ACTION_TYPES;
const { sections } = CONTENT.ONBOARD.candidateForm;

/**
 * Relocation Component
 *
 * Handles the relocation section of the onboarding process.
 * It validates, submits, and manages the user input for relocation preferences.
 *
 * @param {Object} _ - The component props (forwarded ref).
 * @param {boolean} props.isInNewRoute - Indicates if the component is in a new route.
 * @param {React.Ref} ref - The reference passed from the parent component.
 * @returns {JSX.Element} The rendered Relocation component.
 */
const Relocation = forwardRef(({ isInNewRoute }, ref) => {
  const dispatch = useDispatch();
  const {
    currentSectionIndex,
    isEditMode,
    data: {
      relocation: { interested, preference, howSoon, address },
    },
  } = useSelector((state) => state.input);

  const addressRef = useRef(); // Create a ref to call Address validation
  const sectionRef = useSectionInputsFocus(currentSectionIndex);
  const { isLoading } = useLoading();

  const { relocation: validations } = onboardingValidations;

  const interestedAsBoolean =
    interested === FIELDS.RELOCATION.INTERESTED.OPTIONS.YES ? true : false;

  // Relocation validation and input handling
  const {
    value: interestedValue,
    handleInputChange: interestedChange,
    handleInputBlur: interestedBlur,
  } = useInput(
    interestedAsBoolean,
    undefined,
    undefined,
    undefined,
    INPUT_TYPES.CHECKBOX
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

  const {
    value: howSoonValue,
    handleInputChange: howSoonChange,
    handleInputBlur: howSoonBlur,
    handleInputFocus: howSoonFocus,
    error: howSoonError,
    isFocused: isHowSoonFocused,
    forceValidations: forceHowSoonValidations,
  } = useInput(howSoon, validations.howSoon, undefined, true);

  /**
   * Effect to reset the preference field when the 'interested' value changes.
   * Ensures that if 'interested' changes, the preference is reset as well.
   */
  useEffect(() => {
    resetPreference();
  }, [interestedValue, resetPreference]);

  /**
   * Effect to reset the address when preference changes to 'other'.
   * Dispatches the default address when this happens.
   */
  useEffect(() => {
    addressRef.current?.resetValues?.();
    if (preferenceValue !== "other" && preference === "other")
      dispatch(
        inputActions.updateField({
          section: SECTIONS.RELOCATION,
          field: FIELDS.RELOCATION.ADDRESS,
          value: defaultAddress,
        })
      );
  }, [preferenceValue, preference, dispatch]);

  // Group all errors and values for relocation
  const relocationErrors = [
    interestedValue ? preferenceError : false,
    interestedValue ? howSoonError : false,
  ];
  const relocationValues = [
    interestedValue ? preferenceValue : true,
    interestedValue ? howSoonValue : true,
  ];

  /**
   * Validates if the relocation section is valid.
   * Checks errors and corresponding values to determine if the section is complete.
   */
  const isRelocationValid = determineSectionValidity(
    relocationErrors,
    relocationValues
  );

  /**
   * Forces validations for relocation inputs (preference, howSoon).
   * This is triggered when the user interacts with relocation-related fields.
   */
  const forceRelocationValidations = () => {
    if (interestedValue) {
      forcePreferenceValidations();
      forceHowSoonValidations();
    }
  };

  /**
   * Handles the form submission for the relocation section.
   * Validates the section, and submits the data to Redux store if valid.
   * Triggers focus on any errors if validation fails.
   */
  const submit = async () => {
    const addressSubmitResult = addressRef.current?.submit?.();
    const isAddressValid = addressSubmitResult?.isSectionValid;
    const relocationAddress = addressSubmitResult?.item;

    if (!isRelocationValid || isAddressValid === false) {
      // isAddressValid is undefined when unmounted or not rendered
      forceRelocationValidations();
      addressRef.current?.forceValidations(); // Force Address validation
      focusErrorsIfAny(sectionRef);
    } else if (!isLoading[BUTTON]) {
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
      dispatch(
        inputActions.updateField({
          section: SECTIONS.RELOCATION,
          field: FIELDS.RELOCATION.ADDRESS,
          value: relocationAddress || defaultAddress,
        })
      );
      dispatch(
        inputActions.updateField({
          section: SECTIONS.RELOCATION,
          field: FIELDS.COMMON.COMPLETED,
          value: "Done",
        })
      );
      dispatch(inputActions.enableFormSectionSubmission());
    }
  };

  // Expose methods to parent using ref
  useImperativeHandle(ref, () => ({
    submit,
  }));

  return (
    <fieldset
      ref={sectionRef}
      disabled={!isEditMode}
      className={sectionClasses.onboardFormSection}
    >
      <Checkbox
        id="relocationInterested"
        label={sections.relocation.interested.label}
        value={interestedValue}
        changeHandler={interestedChange}
        blurHandler={interestedBlur}
        helperText={isInNewRoute ? sections.relocation.interested.helper : ""}
        extraClass={sectionClasses.fullInputWidth}
        isRequired
      />
      {interestedValue && (
        <>
          <Select
            id="howSoonRelocation"
            label={sections.relocation.howSoon}
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
            label={sections.relocation.stayPreference}
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
          heading={sections.relocation.address}
          defaultValue={address}
          id="relocation"
          ref={addressRef}
        />
      )}
    </fieldset>
  );
});

Relocation.propTypes = {
  isInNewRoute: PropTypes.bool.isRequired,
};

Relocation.displayName = "FormRelocation";
export default Relocation;
