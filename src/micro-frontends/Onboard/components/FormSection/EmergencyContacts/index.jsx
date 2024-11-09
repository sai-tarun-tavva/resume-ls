import { forwardRef, useImperativeHandle } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputV2 from "../../../../Atoms/components/Inputs/InputV2";
import { useSectionInputsFocus } from "../../../hooks";
import { useInput } from "../../../../Atoms/hooks";
import { useLoading } from "../../../../../store";
import { inputActions } from "../../../store";
import {
  determineSectionValidity,
  extractOnlyDigits,
  focusErrorsIfAny,
  onboardingValidations,
  transformPhoneNumber,
} from "../../../../../utilities";
import { CONTENT, LOADING_ACTION_TYPES } from "../../../../../constants";
import {
  SECTIONS,
  FIELDS,
  HOME_ADDRESS_CONTACT_NOT_REQUIRED_VISA,
  HOME_ADDRESS_CONTACT_OPTIONAL_VISA,
} from "../../../constants";
import sectionClasses from "../sections.module.scss";

const { BUTTON } = LOADING_ACTION_TYPES;
const { sections } = CONTENT.ONBOARD.candidateForm;

/**
 * EmergencyContacts Component
 *
 * Handles the collection of emergency contact details for both the USA and Home Country (e.g., India or Other Countries).
 * Depending on the visa status, the form may show or hide the Home Country contact details.
 * This component performs validation for both the USA and Home Country contact information.
 *
 * @param {Object} _ - The component props (forwarded ref).
 * @param {React.Ref} ref - The reference passed from the parent component.
 * @returns {JSX.Element} The rendered EmergencyContacts component.
 */
const EmergencyContacts = forwardRef((_, ref) => {
  const dispatch = useDispatch();
  const {
    currentSectionIndex,
    isEditMode,
    data: {
      personal: { visaStatus },
      emergencyContacts: {
        usa: { name: usaName, phone: usaPhone },
        homeCountry: { name: homeCountryName, phone: homeCountryPhone },
      },
    },
  } = useSelector((state) => state.input);
  const sectionRef = useSectionInputsFocus(currentSectionIndex);
  const { isLoading } = useLoading();

  /**
   * Validation functions for emergency contact fields
   */
  const {
    emergencyContacts: { name: nameValidationFunc, phone: phoneValidationFunc },
  } = onboardingValidations;

  // Determine if the home country contact details are required based on the visa status
  const isHomeCountryContactRequired = !(
    HOME_ADDRESS_CONTACT_NOT_REQUIRED_VISA.includes(visaStatus) ||
    HOME_ADDRESS_CONTACT_OPTIONAL_VISA.includes(visaStatus)
  );

  // Determine if home country contact details are optional
  const isHomeCountryContactOptional =
    HOME_ADDRESS_CONTACT_OPTIONAL_VISA.includes(visaStatus);

  /**
   * USA emergency contact name and phone handlers with validation
   */
  const {
    value: usaNameValue,
    handleInputChange: usaNameChange,
    handleInputBlur: usaNameBlur,
    handleInputFocus: usaNameFocus,
    error: usaNameError,
    isFocused: isUsaNameFocused,
    forceValidations: forceUsaNameValidations,
  } = useInput(usaName, nameValidationFunc, undefined, true);

  const {
    value: usaPhoneValue,
    handleInputChange: usaPhoneChange,
    handleInputBlur: usaPhoneBlur,
    handleInputFocus: usaPhoneFocus,
    error: usaPhoneError,
    isFocused: isUsaPhoneFocused,
    forceValidations: forceUsaPhoneValidations,
  } = useInput(
    transformPhoneNumber(usaPhone),
    phoneValidationFunc,
    transformPhoneNumber,
    true
  );

  /**
   * Home country emergency contact name and phone handlers with validation
   */
  const {
    value: homeCountryNameValue,
    handleInputChange: homeCountryNameChange,
    handleInputBlur: homeCountryNameBlur,
    handleInputFocus: homeCountryNameFocus,
    error: homeCountryNameError,
    isFocused: isHomeCountryNameFocused,
    forceValidations: forceHomeCountryNameValidations,
  } = useInput(
    homeCountryName,
    (value) => nameValidationFunc(value, isHomeCountryContactOptional),
    undefined,
    true
  );

  const {
    value: homeCountryPhoneValue,
    handleInputChange: homeCountryPhoneChange,
    handleInputBlur: homeCountryPhoneBlur,
    handleInputFocus: homeCountryPhoneFocus,
    error: homeCountryPhoneError,
    isFocused: isHomeCountryPhoneFocused,
    forceValidations: forceHomeCountryPhoneValidations,
  } = useInput(
    transformPhoneNumber(homeCountryPhone),
    (value) => phoneValidationFunc(value, isHomeCountryContactOptional),
    transformPhoneNumber,
    true
  );

  // Aggregate errors and values for validation
  const allErrors = [
    usaNameError,
    usaPhoneError,
    homeCountryNameError,
    homeCountryPhoneError,
  ];
  const allValues = [
    usaNameValue,
    usaPhoneValue,
    isHomeCountryContactRequired ? homeCountryNameValue : true,
    isHomeCountryContactRequired ? homeCountryPhoneValue : true,
  ];

  // Check if the section is valid
  const isSectionValid = determineSectionValidity(allErrors, allValues);

  /**
   * Force validations on all fields in the section
   */
  const forceValidations = () => {
    forceUsaNameValidations();
    forceUsaPhoneValidations();

    if (isHomeCountryContactRequired) {
      forceHomeCountryNameValidations();
      forceHomeCountryPhoneValidations();
    }
  };

  /**
   * Handles form submission, updates the store with the validated data
   */
  const submit = async () => {
    if (!isSectionValid) {
      forceValidations();
      focusErrorsIfAny(sectionRef);
    } else if (!isLoading[BUTTON]) {
      // Dispatch updates for USA emergency contact
      dispatch(
        inputActions.updateField({
          section: SECTIONS.EMERGENCY_CONTACTS,
          field: FIELDS.EMERGENCY_CONTACTS.USA.VALUE,
          value: {
            [FIELDS.EMERGENCY_CONTACTS.USA.NAME]: usaNameValue,
            [FIELDS.EMERGENCY_CONTACTS.USA.PHONE]:
              extractOnlyDigits(usaPhoneValue),
          },
        })
      );

      // Dispatch updates for Home Country emergency contact
      dispatch(
        inputActions.updateField({
          section: SECTIONS.EMERGENCY_CONTACTS,
          field: FIELDS.EMERGENCY_CONTACTS.HOME_COUNTRY.VALUE,
          value: {
            [FIELDS.EMERGENCY_CONTACTS.HOME_COUNTRY.NAME]: homeCountryNameValue,
            [FIELDS.EMERGENCY_CONTACTS.HOME_COUNTRY.PHONE]: extractOnlyDigits(
              homeCountryPhoneValue
            ),
          },
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
      <div className={sectionClasses.heading}>
        <h3>{sections.emergencyContacts.usaHeading}</h3>
      </div>
      <div className={sectionClasses.formRow}>
        {/* USA Emergency Contact */}
        <InputV2
          id="usaName"
          label={sections.emergencyContacts.fullName}
          value={usaNameValue}
          changeHandler={usaNameChange}
          blurHandler={usaNameBlur}
          focusHandler={usaNameFocus}
          error={usaNameError}
          isFocused={isUsaNameFocused}
          extraClass={sectionClasses.halfInputWidth}
          isRequired
        />

        <InputV2
          id="usaPhone"
          label={sections.emergencyContacts.phone}
          value={usaPhoneValue}
          changeHandler={usaPhoneChange}
          blurHandler={usaPhoneBlur}
          focusHandler={usaPhoneFocus}
          error={usaPhoneError}
          isFocused={isUsaPhoneFocused}
          extraClass={sectionClasses.halfInputWidth}
          isRequired
        />
      </div>

      {/* Conditional rendering for Home Country contact based on visa status */}
      {(isHomeCountryContactRequired || isHomeCountryContactOptional) && (
        <>
          <div className={sectionClasses.heading}>
            <h3>{sections.emergencyContacts.homeHeading}</h3>
          </div>
          <div className={sectionClasses.formRow}>
            <InputV2
              id="homeCountryName"
              label={sections.emergencyContacts.fullName}
              value={homeCountryNameValue}
              changeHandler={homeCountryNameChange}
              blurHandler={homeCountryNameBlur}
              focusHandler={homeCountryNameFocus}
              error={homeCountryNameError}
              isFocused={isHomeCountryNameFocused}
              extraClass={sectionClasses.halfInputWidth}
              isRequired={isHomeCountryContactRequired}
            />

            <InputV2
              id="homeCountryPhone"
              label={sections.emergencyContacts.phone}
              value={homeCountryPhoneValue}
              changeHandler={homeCountryPhoneChange}
              blurHandler={homeCountryPhoneBlur}
              focusHandler={homeCountryPhoneFocus}
              error={homeCountryPhoneError}
              isFocused={isHomeCountryPhoneFocused}
              extraClass={sectionClasses.halfInputWidth}
              isRequired={isHomeCountryContactRequired}
            />
          </div>
        </>
      )}
    </fieldset>
  );
});

EmergencyContacts.displayName = "EmergencyContacts";
export default EmergencyContacts;
