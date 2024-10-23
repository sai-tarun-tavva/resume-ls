import { forwardRef, useEffect, useImperativeHandle } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputV2 from "../../../../Atoms/components/Inputs/InputV2";
import RadioGroup from "../../../../Atoms/components/Inputs/RadioGroup";
import Select from "../../../../Atoms/components/Inputs/Select";
import { useInput } from "../../../../Atoms/hooks";
import { defaultAddress, inputActions } from "../../../store";
import {
  determineSectionValidity,
  extractOnlyDigits,
  getEighteenYearsAgoDate,
  onboardingValidations,
  transformPhoneNumber,
  transformSSN,
} from "../../../../../utilities";
import {
  SECTIONS,
  FIELDS,
  OPTIONS,
  EDUCATION_REQUIRED_VISA,
  EAD_NOT_REQUIRED_VISA,
  EAD_OPTIONAL_VISA,
  HOME_ADDRESS_CONTACT_NOT_REQUIRED_VISA,
  HOME_ADDRESS_CONTACT_OPTIONAL_VISA,
  PORT_OF_ENTRY_NOT_REQUIRED_VISA,
} from "../../../constants";
import classes from "./index.module.scss";

const Personal = forwardRef((_, ref) => {
  const dispatch = useDispatch();
  const {
    data: {
      personal: {
        firstName,
        lastName,
        emailId,
        phoneNumber,
        secondaryPhoneNumber,
        gender,
        dob,
        maritalStatus,
        passportNumber,
        visaStatus,
        eadNumber,
        SSN,
        photoID: { type: photoIDType, number: photoIDNumber },
        skypeId,
        referenceName,
      },
      education: {
        graduatedUniversity: { additionalCertifications },
      },
    },
  } = useSelector((state) => state.input);
  const { personal: validations } = onboardingValidations;

  const {
    value: firstNameValue,
    handleInputChange: firstNameChange,
    handleInputBlur: firstNameBlur,
    handleInputFocus: firstNameFocus,
    error: firstNameError,
    isFocused: isFirstNameFocused,
    forceValidations: forceFirstNameValidations,
  } = useInput(firstName, validations.firstName, undefined, true);

  const {
    value: lastNameValue,
    handleInputChange: lastNameChange,
    handleInputBlur: lastNameBlur,
    handleInputFocus: lastNameFocus,
    error: lastNameError,
    isFocused: isLastNameFocused,
    forceValidations: forceLastNameValidations,
  } = useInput(lastName, validations.lastName, undefined, true);

  const {
    value: emailIdValue,
    handleInputChange: emailIdChange,
    handleInputBlur: emailIdBlur,
    handleInputFocus: emailIdFocus,
    error: emailIdError,
    isFocused: isEmailIdFocused,
    forceValidations: forceEmailValidations,
  } = useInput(emailId, validations.email, undefined, true);

  const {
    value: phoneNumberValue,
    handleInputChange: phoneNumberChange,
    handleInputBlur: phoneNumberBlur,
    handleInputFocus: phoneNumberFocus,
    error: phoneNumberError,
    isFocused: isPhoneNumberFocused,
    forceValidations: forcePhoneNumberValidations,
  } = useInput(
    transformPhoneNumber(phoneNumber),
    validations.phone,
    transformPhoneNumber,
    true
  );

  const {
    value: secondaryPhoneNumberValue,
    handleInputChange: secondaryPhoneNumberChange,
    handleInputBlur: secondaryPhoneNumberBlur,
    handleInputFocus: secondaryPhoneNumberFocus,
    error: secondaryPhoneNumberError,
    isFocused: isSecondaryPhoneNumberFocused,
    forceValidations: forceSecondaryPhoneNumberValidations,
  } = useInput(
    transformPhoneNumber(secondaryPhoneNumber),
    validations.secondaryPhone,
    transformPhoneNumber,
    true
  );

  const {
    value: genderValue,
    handleInputChange: genderChange,
    handleInputBlur: genderBlur,
    error: genderError,
    forceValidations: forceGenderValidations,
  } = useInput(gender, validations.gender, undefined, true);

  const {
    value: dobValue,
    handleInputChange: dobChange,
    handleInputBlur: dobBlur,
    handleInputFocus: dobFocus,
    error: dobError,
    isFocused: isDobFocused,
    forceValidations: forceDobValidations,
  } = useInput(dob, validations.dob, undefined, true);

  const {
    value: maritalStatusValue,
    handleInputChange: maritalStatusChange,
    handleInputBlur: maritalStatusBlur,
    handleInputFocus: maritalStatusFocus,
    error: maritalStatusError,
    isFocused: isMaritalStatusFocused,
  } = useInput(maritalStatus);

  const {
    value: passportNumberValue,
    handleInputChange: passportNumberChange,
    handleInputBlur: passportNumberBlur,
    handleInputFocus: passportNumberFocus,
    error: passportNumberError,
    isFocused: isPassportNumberFocused,
    forceValidations: forcePassportNumberValidations,
  } = useInput(passportNumber, validations.passportNumber, undefined, true);

  const {
    value: visaStatusValue,
    handleInputChange: visaStatusChange,
    handleInputBlur: visaStatusBlur,
    handleInputFocus: visaStatusFocus,
    error: visaStatusError,
    isFocused: isVisaStatusFocused,
    forceValidations: forceVisaStatusValidations,
  } = useInput(visaStatus, validations.visaStatus, undefined, true);

  const isEADRequired = !(
    EAD_NOT_REQUIRED_VISA.includes(visaStatusValue) || visaStatusValue === ""
  );
  const isEADOptional = EAD_OPTIONAL_VISA.includes(visaStatusValue);

  const {
    value: eadNumberValue,
    handleInputChange: eadNumberChange,
    handleInputBlur: eadNumberBlur,
    handleInputFocus: eadNumberFocus,
    error: eadNumberError,
    isFocused: isEadNumberFocused,
    forceValidations: forceEadNumberValidations,
    clearValue: clearEadNumber,
  } = useInput(
    eadNumber,
    (value) => validations.eadNumber(value, isEADOptional),
    undefined,
    true
  );

  const {
    value: SSNValue,
    handleInputChange: SSNChange,
    handleInputBlur: SSNBlur,
    handleInputFocus: SSNFocus,
    error: SSNError,
    isFocused: isSSNFocused,
    forceValidations: forceSSNValidations,
  } = useInput(SSN, validations.SSN, transformSSN, true);

  const {
    value: photoIDTypeValue,
    handleInputChange: photoIDTypeChange,
    handleInputBlur: photoIDTypeBlur,
    handleInputFocus: photoIDTypeFocus,
    error: photoIDTypeError,
    isFocused: isPhotoIDTypeFocused,
  } = useInput(photoIDType);

  const {
    value: photoIDNumberValue,
    handleInputChange: photoIDNumberChange,
    handleInputBlur: photoIDNumberBlur,
    handleInputFocus: photoIDNumberFocus,
    error: photoIDNumberError,
    isFocused: isPhotoIDNumberFocused,
    clearValue: clearPhotoIDNumber,
    forceValidations: forcePhotoIDNumberValidations,
  } = useInput(
    photoIDNumber,
    photoIDTypeValue === "DL"
      ? validations.licenseNumber
      : validations.stateIDNumber,
    undefined,
    true
  );

  const {
    value: skypeIdValue,
    handleInputChange: skypeIdChange,
    handleInputBlur: skypeIdBlur,
    handleInputFocus: skypeIdFocus,
    error: skypeIdError,
    isFocused: isSkypeIdFocused,
  } = useInput(skypeId, validations.skypeId);

  const {
    value: referenceNameValue,
    handleInputChange: referenceNameChange,
    handleInputBlur: referenceNameBlur,
    handleInputFocus: referenceNameFocus,
    error: referenceNameError,
    isFocused: isReferenceNameFocused,
  } = useInput(referenceName);

  useEffect(() => {
    clearPhotoIDNumber();
  }, [photoIDTypeValue, clearPhotoIDNumber]);

  useEffect(() => {
    clearEadNumber();
  }, [visaStatusValue, clearEadNumber]);

  const allErrors = [
    firstNameError,
    lastNameError,
    emailIdError,
    phoneNumberError,
    secondaryPhoneNumberError,
    genderError,
    dobError,
    passportNumberError,
    visaStatusError,
    isEADRequired ? eadNumberError : false,
    SSNError,
    photoIDTypeValue ? photoIDNumberError : false,
    skypeIdError,
  ];

  const allValues = [
    firstNameValue,
    lastNameValue,
    emailIdValue,
    phoneNumberValue,
    genderValue,
    dobValue,
    passportNumberValue,
    visaStatusValue,
    isEADRequired ? (isEADOptional ? true : eadNumberValue) : true,
    SSNValue,
    photoIDTypeValue ? photoIDNumberValue : true,
  ];

  const isSectionValid = determineSectionValidity(allErrors, allValues);

  const forceValidations = () => {
    forceFirstNameValidations();
    forceLastNameValidations();
    forceEmailValidations();
    forcePhoneNumberValidations();
    forceSecondaryPhoneNumberValidations();
    forceGenderValidations();
    forceDobValidations();
    forcePassportNumberValidations();
    forceVisaStatusValidations();
    if (isEADRequired) {
      forceEadNumberValidations();
    }
    forceSSNValidations();
    if (photoIDTypeValue) {
      forcePhotoIDNumberValidations();
    }
  };

  const submit = () => {
    if (!isSectionValid) {
      forceValidations();
      return false;
    }

    // Below resetting with empty values is required if user selects a student or H1 visa and enter home address later, if user comes back to personal and updates visa not to student

    // Resetting Home address and emergency contact details if visa status is not one of Green card, U.S. Citizen, EB-1, EB-2, EB-3, Others
    if (
      HOME_ADDRESS_CONTACT_NOT_REQUIRED_VISA.includes(visaStatusValue) ||
      HOME_ADDRESS_CONTACT_OPTIONAL_VISA.includes(visaStatusValue)
    ) {
      dispatch(
        inputActions.updateField({
          section: SECTIONS.PERSONAL,
          field: FIELDS.PERSONAL.INDIA_LOCATION,
          value: defaultAddress,
        })
      );
      dispatch(
        inputActions.updateField({
          section: SECTIONS.EMERGENCY_CONTACTS,
          field: FIELDS.EMERGENCY_CONTACTS.HOME_COUNTRY.VALUE,
          value: {
            [FIELDS.EMERGENCY_CONTACTS.HOME_COUNTRY.NAME]: "",
            [FIELDS.EMERGENCY_CONTACTS.HOME_COUNTRY.PHONE]: "",
          },
        })
      );
    }

    // Resetting SevisID, DSO and university details if visa status is not one of F1-OPT, F1-CPT
    if (!EDUCATION_REQUIRED_VISA.includes(visaStatusValue)) {
      dispatch(
        inputActions.updateField({
          section: SECTIONS.EDUCATION,
          field: FIELDS.EDUCATION.SEVIS_ID,
          value: "",
        })
      );
      dispatch(
        inputActions.updateField({
          section: SECTIONS.EDUCATION,
          field: FIELDS.EDUCATION.DSO.VALUE,
          value: {
            [FIELDS.EDUCATION.DSO.NAME]: "",
            [FIELDS.EDUCATION.DSO.EMAIL]: "",
            [FIELDS.EDUCATION.DSO.PHONE]: "",
          },
        })
      );
      dispatch(
        inputActions.updateField({
          section: SECTIONS.EDUCATION,
          field: FIELDS.EDUCATION.GRADUATED_UNIVERSITY.VALUE,
          value: {
            [FIELDS.EDUCATION.GRADUATED_UNIVERSITY.NAME]: "",
            [FIELDS.EDUCATION.GRADUATED_UNIVERSITY.PASSED_MONTH_YEAR]: "",
            [FIELDS.EDUCATION.GRADUATED_UNIVERSITY.STREAM]: "",
            [FIELDS.EDUCATION.GRADUATED_UNIVERSITY.ADDRESS]: defaultAddress,
            [FIELDS.EDUCATION.GRADUATED_UNIVERSITY.ADDITIONAL_CERTIFICATIONS]:
              additionalCertifications,
          },
        })
      );
    }

    // Resetting Port of entry if visa status is U.S. Citizen
    if (PORT_OF_ENTRY_NOT_REQUIRED_VISA.includes(visaStatus)) {
      dispatch(
        inputActions.updateField({
          section: SECTIONS.US_TRAVEL_AND_STAY,
          field: FIELDS.US_TRAVEL_AND_STAY.US_ENTRY,
          value: "",
        })
      );
    }

    dispatch(
      inputActions.updateField({
        section: SECTIONS.PERSONAL,
        field: FIELDS.PERSONAL.FIRST_NAME,
        value: firstNameValue,
      })
    );
    dispatch(
      inputActions.updateField({
        section: SECTIONS.PERSONAL,
        field: FIELDS.PERSONAL.LAST_NAME,
        value: lastNameValue,
      })
    );
    dispatch(
      inputActions.updateField({
        section: SECTIONS.PERSONAL,
        field: FIELDS.PERSONAL.EMAIL_ID,
        value: emailIdValue,
      })
    );
    dispatch(
      inputActions.updateField({
        section: SECTIONS.PERSONAL,
        field: FIELDS.PERSONAL.PHONE_NUMBER,
        value: extractOnlyDigits(phoneNumberValue),
      })
    );
    dispatch(
      inputActions.updateField({
        section: SECTIONS.PERSONAL,
        field: FIELDS.PERSONAL.SECONDARY_PHONE_NUMBER,
        value: extractOnlyDigits(secondaryPhoneNumberValue),
      })
    );
    dispatch(
      inputActions.updateField({
        section: SECTIONS.PERSONAL,
        field: FIELDS.PERSONAL.GENDER,
        value: genderValue,
      })
    );
    dispatch(
      inputActions.updateField({
        section: SECTIONS.PERSONAL,
        field: FIELDS.PERSONAL.DOB,
        value: dobValue,
      })
    );
    dispatch(
      inputActions.updateField({
        section: SECTIONS.PERSONAL,
        field: FIELDS.PERSONAL.MARITAL_STATUS,
        value: maritalStatusValue,
      })
    );
    dispatch(
      inputActions.updateField({
        section: SECTIONS.PERSONAL,
        field: FIELDS.PERSONAL.PASSPORT_NUMBER,
        value: passportNumberValue,
      })
    );
    dispatch(
      inputActions.updateField({
        section: SECTIONS.PERSONAL,
        field: FIELDS.PERSONAL.VISA_STATUS,
        value: visaStatusValue,
      })
    );
    dispatch(
      inputActions.updateField({
        section: SECTIONS.PERSONAL,
        field: FIELDS.PERSONAL.EAD_NUMBER,
        value: eadNumberValue,
      })
    );
    dispatch(
      inputActions.updateField({
        section: SECTIONS.PERSONAL,
        field: FIELDS.PERSONAL.SSN,
        value: SSNValue,
      })
    );
    dispatch(
      inputActions.updateField({
        section: SECTIONS.PERSONAL,
        field: FIELDS.PERSONAL.PHOTO_ID.VALUE,
        value: {
          [FIELDS.PERSONAL.PHOTO_ID.TYPE]: photoIDTypeValue,
          [FIELDS.PERSONAL.PHOTO_ID.NUMBER]: photoIDNumberValue,
        },
      })
    );
    dispatch(
      inputActions.updateField({
        section: SECTIONS.PERSONAL,
        field: FIELDS.PERSONAL.SKYPE_ID,
        value: skypeIdValue,
      })
    );
    dispatch(
      inputActions.updateField({
        section: SECTIONS.PERSONAL,
        field: FIELDS.PERSONAL.REFERENCE_NAME,
        value: referenceNameValue,
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
      <div className={classes.personalRow}>
        <InputV2
          id="firstName"
          type="text"
          label="First Name"
          value={firstNameValue}
          changeHandler={firstNameChange}
          blurHandler={firstNameBlur}
          focusHandler={firstNameFocus}
          error={firstNameError}
          isFocused={isFirstNameFocused}
          extraClass={classes.halfInputWidth}
          isRequired
        />

        <InputV2
          id="lastName"
          type="text"
          label="Last Name"
          value={lastNameValue}
          changeHandler={lastNameChange}
          blurHandler={lastNameBlur}
          focusHandler={lastNameFocus}
          error={lastNameError}
          isFocused={isLastNameFocused}
          extraClass={classes.halfInputWidth}
          isRequired
        />
      </div>

      <InputV2
        id="emailId"
        type="email"
        label="Email ID"
        value={emailIdValue}
        changeHandler={emailIdChange}
        blurHandler={emailIdBlur}
        focusHandler={emailIdFocus}
        error={emailIdError}
        isFocused={isEmailIdFocused}
        extraClass={classes.fullInputWidth}
        isRequired
      />

      <div className={classes.personalRow}>
        <InputV2
          id="phoneNumber"
          type="tel"
          label="Phone Number"
          value={phoneNumberValue}
          changeHandler={phoneNumberChange}
          blurHandler={phoneNumberBlur}
          focusHandler={phoneNumberFocus}
          error={phoneNumberError}
          isFocused={isPhoneNumberFocused}
          extraClass={classes.halfInputWidth}
          isRequired
        />

        <InputV2
          id="secondaryPhoneNumber"
          type="tel"
          label="Secondary or WhatsApp Number"
          value={secondaryPhoneNumberValue}
          changeHandler={secondaryPhoneNumberChange}
          blurHandler={secondaryPhoneNumberBlur}
          focusHandler={secondaryPhoneNumberFocus}
          error={secondaryPhoneNumberError}
          isFocused={isSecondaryPhoneNumberFocused}
          extraClass={classes.halfInputWidth}
        />
      </div>

      <RadioGroup
        id="gender"
        label="Gender"
        value={genderValue}
        options={OPTIONS.GENDER}
        changeHandler={genderChange}
        blurHandler={genderBlur}
        error={genderError}
        extraClass={classes.fullInputWidth}
        isRequired
      />

      <div className={classes.personalRow}>
        <InputV2
          id="dob"
          type="date"
          label="Date of Birth"
          value={dobValue}
          changeHandler={dobChange}
          blurHandler={dobBlur}
          focusHandler={dobFocus}
          error={dobError}
          isFocused={isDobFocused}
          extraClass={classes.halfInputWidth}
          max={getEighteenYearsAgoDate()}
          isRequired
        />

        <Select
          id="maritalStatus"
          type="text"
          label="Marital Status"
          options={OPTIONS.MARITAL_STATUS}
          value={maritalStatusValue}
          changeHandler={maritalStatusChange}
          blurHandler={maritalStatusBlur}
          focusHandler={maritalStatusFocus}
          error={maritalStatusError}
          isFocused={isMaritalStatusFocused}
          extraClass={classes.halfInputWidth}
        />
      </div>
      <div className={classes.personalRow}>
        <InputV2
          id="passportNumber"
          type="text"
          label="Passport Number"
          value={passportNumberValue}
          changeHandler={passportNumberChange}
          blurHandler={passportNumberBlur}
          focusHandler={passportNumberFocus}
          error={passportNumberError}
          isFocused={isPassportNumberFocused}
          extraClass={classes.halfInputWidth}
          isRequired
        />

        <InputV2
          id="SSN"
          type="text"
          label="SSN"
          value={SSNValue}
          changeHandler={SSNChange}
          blurHandler={SSNBlur}
          focusHandler={SSNFocus}
          error={SSNError}
          isFocused={isSSNFocused}
          extraClass={classes.halfInputWidth}
          isRequired
        />
      </div>
      <Select
        id="visaStatus"
        type="text"
        label="Visa Status"
        options={OPTIONS.VISA_STATUS}
        value={visaStatusValue}
        changeHandler={visaStatusChange}
        blurHandler={visaStatusBlur}
        focusHandler={visaStatusFocus}
        error={visaStatusError}
        isFocused={isVisaStatusFocused}
        extraClass={classes.fullInputWidth}
        isRequired
      />
      {isEADRequired && (
        <InputV2
          id="eadNumber"
          type="text"
          label="EAD Number"
          value={eadNumberValue}
          changeHandler={eadNumberChange}
          blurHandler={eadNumberBlur}
          focusHandler={eadNumberFocus}
          error={eadNumberError}
          isFocused={isEadNumberFocused}
          extraClass={classes.fullInputWidth}
          isRequired={!isEADOptional}
        />
      )}

      <Select
        id="photoIDType"
        type="text"
        label="Photo ID Type"
        options={OPTIONS.PHOTO_ID_TYPE}
        value={photoIDTypeValue}
        changeHandler={photoIDTypeChange}
        blurHandler={photoIDTypeBlur}
        focusHandler={photoIDTypeFocus}
        error={photoIDTypeError}
        isFocused={isPhotoIDTypeFocused}
        extraClass={classes.fullInputWidth}
      />

      {photoIDTypeValue && (
        <InputV2
          id="photoIDNumber"
          type="text"
          label={
            photoIDTypeValue === "DL" ? "License number" : "State ID number"
          }
          value={photoIDNumberValue}
          changeHandler={photoIDNumberChange}
          blurHandler={photoIDNumberBlur}
          focusHandler={photoIDNumberFocus}
          error={photoIDNumberError}
          isFocused={isPhotoIDNumberFocused}
          extraClass={classes.fullInputWidth}
          isRequired
        />
      )}

      <div className={classes.personalRow}>
        <InputV2
          id="skypeId"
          type="text"
          label="Skype ID"
          value={skypeIdValue}
          changeHandler={skypeIdChange}
          blurHandler={skypeIdBlur}
          focusHandler={skypeIdFocus}
          error={skypeIdError}
          isFocused={isSkypeIdFocused}
          extraClass={classes.halfInputWidth}
        />

        <InputV2
          id="referenceName"
          type="text"
          label="Reference Name"
          value={referenceNameValue}
          changeHandler={referenceNameChange}
          blurHandler={referenceNameBlur}
          focusHandler={referenceNameFocus}
          error={referenceNameError}
          isFocused={isReferenceNameFocused}
          extraClass={classes.halfInputWidth}
        />
      </div>
    </>
  );
});

Personal.displayName = "FormPersonal";
export default Personal;
