import { forwardRef, useImperativeHandle } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputV2 from "../../../../Atoms/components/Inputs/InputV2";
import { useSectionInputsFocus } from "../../../hooks";
import { useInput } from "../../../../Atoms/hooks";
import { inputActions } from "../../../store";
import {
  determineSectionValidity,
  extractOnlyDigits,
  focusErrorsIfAny,
  onboardingValidations,
  transformPhoneNumber,
} from "../../../../../utilities";
import {
  SECTIONS,
  FIELDS,
  HOME_ADDRESS_CONTACT_NOT_REQUIRED_VISA,
  HOME_ADDRESS_CONTACT_OPTIONAL_VISA,
} from "../../../constants";
import sectionClasses from "../sections.module.scss";

const EmergencyContacts = forwardRef((_, ref) => {
  const dispatch = useDispatch();
  const {
    currentSectionIndex,
    data: {
      personal: { visaStatus },
      emergencyContacts: {
        usa: { name: usaName, phone: usaPhone },
        homeCountry: { name: homeCountryName, phone: homeCountryPhone },
      },
    },
  } = useSelector((state) => state.input);
  const sectionRef = useSectionInputsFocus(currentSectionIndex);

  const {
    emergencyContacts: { name: nameValidationFunc, phone: phoneValidationFunc },
  } = onboardingValidations;

  const isHomeCountryContactRequired = !(
    HOME_ADDRESS_CONTACT_NOT_REQUIRED_VISA.includes(visaStatus) ||
    HOME_ADDRESS_CONTACT_OPTIONAL_VISA.includes(visaStatus)
  );

  const isHomeCountryContactOptional =
    HOME_ADDRESS_CONTACT_OPTIONAL_VISA.includes(visaStatus);

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

  const isSectionValid = determineSectionValidity(allErrors, allValues);

  const forceValidations = () => {
    forceUsaNameValidations();
    forceUsaPhoneValidations();

    if (isHomeCountryContactRequired) {
      forceHomeCountryNameValidations();
      forceHomeCountryPhoneValidations();
    }
  };

  const submit = () => {
    if (!isSectionValid) {
      forceValidations();
      focusErrorsIfAny(sectionRef);
      return false;
    }

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

    return true;
  };

  useImperativeHandle(ref, () => ({
    submit,
  }));

  return (
    <div ref={sectionRef} className={sectionClasses.onboardFormSection}>
      <div className={sectionClasses.heading}>
        <h3>USA</h3>
      </div>
      <div className={sectionClasses.formRow}>
        <InputV2
          id="usaName"
          label="Full Name"
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
          label="Phone"
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

      {(isHomeCountryContactRequired || isHomeCountryContactOptional) && (
        <>
          <div className={sectionClasses.heading}>
            <h3>Home Country (India, if applicable, or Other Countries)</h3>
          </div>
          <div className={sectionClasses.formRow}>
            <InputV2
              id="homeCountryName"
              label="Full Name"
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
              label="Phone"
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
    </div>
  );
});

EmergencyContacts.displayName = "EmergencyContacts";
export default EmergencyContacts;
