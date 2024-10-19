import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormActions from "../../FormActions";
import InputV2 from "../../../../Atoms/components/Inputs/InputV2";
import RadioGroup from "../../../../Atoms/components/Inputs/RadioGroup";
import Select from "../../../../Atoms/components/Inputs/Select";
import { useInput } from "../../../../Atoms/hooks";
import { inputActions } from "../../../store";
import {
  getEighteenYearsAgoDate,
  onboardingValidations,
  transformPhoneNumber,
  transformSSN,
} from "../../../../../utilities";
import { SECTIONS, FIELDS } from "../../../constants";
import classes from "./index.module.scss";

const Personal = () => {
  const dispatch = useDispatch();
  const {
    data: {
      personal: {
        firstName,
        lastName,
        emailId,
        phoneNumber,
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
  } = useInput(phoneNumber, validations.phone, transformPhoneNumber, true);

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

  const {
    value: eadNumberValue,
    handleInputChange: eadNumberChange,
    handleInputBlur: eadNumberBlur,
    handleInputFocus: eadNumberFocus,
    error: eadNumberError,
    isFocused: isEadNumberFocused,
    forceValidations: forceEadNumberValidations,
  } = useInput(eadNumber, validations.eadNumber, undefined, true);

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
    resetValue: resetPhotoIDNumber,
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
    resetPhotoIDNumber();
  }, [photoIDTypeValue, resetPhotoIDNumber, dispatch]);

  // Check for validation errors
  const isSectionValid =
    !firstNameError &&
    !lastNameError &&
    !emailIdError &&
    !phoneNumberError &&
    !genderError &&
    !dobError &&
    !passportNumberError &&
    !visaStatusError &&
    !eadNumberError &&
    !SSNError &&
    (photoIDTypeValue ? !photoIDNumberError : true) &&
    !skypeIdError;

  // Check if values are empty to force validation
  const isValuesEmpty =
    !firstNameValue ||
    !lastNameValue ||
    !emailIdValue ||
    !phoneNumberValue ||
    !genderValue ||
    !dobValue ||
    !passportNumberValue ||
    !visaStatusValue ||
    !eadNumberValue ||
    !SSNValue ||
    (photoIDTypeValue ? !photoIDNumberValue : false);

  // Force all validations
  const forceValidations = () => {
    forceFirstNameValidations();
    forceLastNameValidations();
    forceEmailValidations();
    forcePhoneNumberValidations();
    forceGenderValidations();
    forceDobValidations();
    forcePassportNumberValidations();
    forceVisaStatusValidations();
    forceEadNumberValidations();
    forceSSNValidations();
    if (photoIDTypeValue) {
      forcePhotoIDNumberValidations();
    }
  };

  const previousClickHandler = (event) => {
    event.preventDefault();

    dispatch(inputActions.decrementCurrentSectionIndex());
  };

  const nextClickHandler = (event) => {
    event.preventDefault();

    if (isValuesEmpty) {
      forceValidations();
      return;
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
        value: phoneNumberValue,
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
    dispatch(inputActions.incrementCurrentSectionIndex());
  };

  return (
    <>
      <div className={classes.personalContainer}>
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
        <div className={classes.personalRow}>
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
            extraClass={classes.halfInputWidth}
            isRequired
          />

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
        </div>

        <RadioGroup
          id="gender"
          label="Gender"
          value={genderValue}
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" },
          ]}
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
            options={[
              { value: "", label: "Select marital status" },
              { value: "single", label: "Single" },
              { value: "married", label: "Married" },
              { value: "divorced", label: "Divorced" },
              { value: "widowed", label: "Widowed" },
            ]}
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

          <Select
            id="visaStatus"
            type="text"
            label="Visa Status"
            options={[
              { value: "", label: "Select Visa Status" },
              { value: "F1", label: "F1" },
              { value: "F1-OPT", label: "F1-OPT" },
              { value: "F1-CPT", label: "F1-CPT" },
              { value: "STEM-OPT", label: "STEM-OPT" },
              { value: "H1B", label: "H1B" },
              { value: "J1", label: "J1" },
              {
                value: "GreenCardPending",
                label: "Green Card Application Pending",
              },
            ]}
            value={visaStatusValue}
            changeHandler={visaStatusChange}
            blurHandler={visaStatusBlur}
            focusHandler={visaStatusFocus}
            error={visaStatusError}
            isFocused={isVisaStatusFocused}
            extraClass={classes.halfInputWidth}
            isRequired
          />
        </div>
        <div className={classes.personalRow}>
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
          id="photoIDType"
          type="text"
          label="Photo ID Type"
          options={[
            { value: "", label: "Select Photo ID Type" },
            { value: "DL", label: "Driver's License" },
            { value: "StateID", label: "State ID" },
          ]}
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
      </div>

      <FormActions
        isNextDisabled={!isSectionValid}
        previousHandler={previousClickHandler}
        nextHandler={nextClickHandler}
      />
    </>
  );
};

Personal.displayName = "FormPersonal";
export default Personal;
