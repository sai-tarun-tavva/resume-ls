import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputV2 from "../../../../Atoms/components/Inputs/InputV2";
import { useInput } from "../../../../Atoms/hooks";
import { inputActions } from "../../../store";
import {
  determineSectionValidity,
  extractOnlyDigits,
  onboardingValidations,
  transformPhoneNumber,
} from "../../../../../utilities";
import {
  SECTIONS,
  FIELDS,
  HOME_ADDRESS_CONTACT_NOT_REQUIRED_VISA,
  HOME_ADDRESS_CONTACT_OPTIONAL_VISA,
} from "../../../constants";
import classes from "./index.module.scss";

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
  const firstInputRef = useRef();

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

  useEffect(() => {
    if (currentSectionIndex === 8) {
      const timer = setTimeout(() => firstInputRef.current.focus(), 500);

      return () => clearTimeout(timer);
    }
  }, [currentSectionIndex]);

  return (
    <>
      <div className={classes.heading}>
        <h3>USA</h3>
      </div>
      <div className={classes.emergencyContactRow}>
        <InputV2
          ref={firstInputRef}
          id="usaName"
          label="Full Name"
          value={usaNameValue}
          changeHandler={usaNameChange}
          blurHandler={usaNameBlur}
          focusHandler={usaNameFocus}
          error={usaNameError}
          isFocused={isUsaNameFocused}
          extraClass={classes.halfInputWidth}
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
          extraClass={classes.halfInputWidth}
          isRequired
        />
      </div>

      {(isHomeCountryContactRequired || isHomeCountryContactOptional) && (
        <>
          <div className={classes.heading}>
            <h3>Home Country (India, if applicable, or Other Countries)</h3>
          </div>
          <div className={classes.emergencyContactRow}>
            <InputV2
              id="homeCountryName"
              label="Full Name"
              value={homeCountryNameValue}
              changeHandler={homeCountryNameChange}
              blurHandler={homeCountryNameBlur}
              focusHandler={homeCountryNameFocus}
              error={homeCountryNameError}
              isFocused={isHomeCountryNameFocused}
              extraClass={classes.halfInputWidth}
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
              extraClass={classes.halfInputWidth}
              isRequired={isHomeCountryContactRequired}
            />
          </div>
        </>
      )}
    </>
  );
});

EmergencyContacts.displayName = "EmergencyContacts";
export default EmergencyContacts;
