import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useReducer,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import InputV2 from "../../../../Atoms/components/Inputs/InputV2";
import RadioGroup from "../../../../Atoms/components/Inputs/RadioGroup";
import Select from "../../../../Atoms/components/Inputs/Select";
import { useSectionInputsFocus } from "../../../../../hooks";
import { useInput } from "../../../../Atoms/hooks";
import { useLoading } from "../../../../../store";
import { defaultAddress, inputActions } from "../../../store";
import {
  determineSectionValidity,
  extractOnlyDigits,
  focusErrorsIfAny,
  onboardingValidations,
  transformPhoneNumber,
  transformSSN,
} from "../../../../../utilities";
import {
  CONTENT,
  LOADING_ACTION_TYPES,
  INSIGHT,
  INPUT_TYPES,
} from "../../../../../constants";
import {
  SECTIONS,
  FIELDS,
  OPTIONS,
  SEVIS_DSO_REQUIRED_VISA,
  EAD_NOT_REQUIRED_VISA,
  EAD_OPTIONAL_VISA,
  HOME_ADDRESS_NOT_REQUIRED_VISA,
  HOME_ADDRESS_OPTIONAL_VISA,
  PORT_OF_ENTRY_NOT_REQUIRED_VISA,
  PASSPORT_OPTIONAL_VISA,
} from "../../../constants";
import sectionClasses from "../sections.module.scss";

const { BUTTON } = LOADING_ACTION_TYPES;
const { TOGGLE_FIELD, HIDE_FIELD } = INSIGHT;
const { sections } = CONTENT.ONBOARD.candidateForm;

/**
 * Reducer function for managing the visibility of sensitive fields.
 *
 * This function toggles the visibility state of specified fields, allowing
 * sensitive data to be shown or hidden based on user actions.
 *
 * @param {Object} state - The current state of visibility for each field.
 *                          Each key represents a field, and its value is a boolean
 *                          indicating whether the field is visible (true) or hidden (false).
 * @param {Object} action - The action object containing information for the reducer.
 * @param {string} action.type - The type of action to be performed (e.g., TOGGLE_FIELD).
 * @param {string} action.field - The name of the field whose visibility is to be toggled.
 * @returns {Object} - The updated state with the specified field's visibility toggled.
 */
const visibilityReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_FIELD:
      return {
        ...state,
        [action.field]: !state[action.field],
      };
    case HIDE_FIELD:
      return {
        ...state,
        [action.field]: false,
      };
    default:
      return state;
  }
};

const Personal = forwardRef(({ isInNewRoute }, ref) => {
  const dispatch = useDispatch();
  const {
    currentSectionIndex,
    isEditMode,
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
    },
  } = useSelector((state) => state.input);

  // Initialize visibility state with reducer
  const [showFields, dispatchVisibility] = useReducer(visibilityReducer, {
    passportNumber: isInNewRoute,
    eadNumber: isInNewRoute,
    photoIDNumber: isInNewRoute,
  });

  const sectionRef = useSectionInputsFocus(currentSectionIndex);
  const { isLoading } = useLoading();
  const { personal: validations } = onboardingValidations;

  // Input handlers for personal information fields
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
    value: visaStatusValue,
    handleInputChange: visaStatusChange,
    handleInputBlur: visaStatusBlur,
    handleInputFocus: visaStatusFocus,
    error: visaStatusError,
    isFocused: isVisaStatusFocused,
    forceValidations: forceVisaStatusValidations,
  } = useInput(visaStatus, validations.visaStatus, undefined, true);

  // Check if EAD number is required based on visa status
  const isEADRequired = !(
    EAD_NOT_REQUIRED_VISA.includes(visaStatusValue) || visaStatusValue === ""
  );
  const isEADOptional = EAD_OPTIONAL_VISA.includes(visaStatusValue);

  const isPassportOptional = PASSPORT_OPTIONAL_VISA.includes(visaStatusValue);

  const {
    value: passportNumberValue,
    handleInputChange: passportNumberChange,
    handleInputBlur: passportNumberBlur,
    handleInputFocus: passportNumberFocus,
    error: passportNumberError,
    isFocused: isPassportNumberFocused,
    forceValidations: forcePassportNumberValidations,
  } = useInput(
    passportNumber,
    (value) => validations.passportNumber(value, isPassportOptional),
    undefined,
    true
  );

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
    originalValue: SSNOriginalValue,
    handleInputChange: SSNChange,
    handleInputBlur: SSNBlur,
    handleInputFocus: SSNFocus,
    error: SSNError,
    isFocused: isSSNFocused,
    forceValidations: forceSSNValidations,
  } = useInput(SSN, validations.SSN, transformSSN, true, INPUT_TYPES.SSN);

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

  const isFirstRenderForPhotoID = useRef(true);
  const isFirstRenderForEadNumber = useRef(true);

  // Effect to clear photo ID number when photo ID type changes
  useEffect(() => {
    // Skip clearing on the first render for photo ID
    if (isFirstRenderForPhotoID.current) {
      isFirstRenderForPhotoID.current = false;
      return;
    }

    clearPhotoIDNumber();
  }, [photoIDTypeValue, clearPhotoIDNumber]);

  // Effect to clear EAD number when visa status changes
  useEffect(() => {
    // Skip clearing on the first render for EAD number
    if (isFirstRenderForEadNumber.current) {
      isFirstRenderForEadNumber.current = false;
      return;
    }

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
    isPassportOptional ? true : passportNumberValue,
    visaStatusValue,
    isEADRequired ? (isEADOptional ? true : eadNumberValue) : true,
    SSNValue,
    photoIDTypeValue ? photoIDNumberValue : true,
  ];

  const isSectionValid = determineSectionValidity(allErrors, allValues);

  // Function to force validations on all inputs
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

  /**
   * Hides sensitive fields like passport number, EAD number, and photo ID number.
   * This function is typically called when navigating to the next section
   * to ensure sensitive information is not displayed unnecessarily.
   */
  const hideSensitiveFieldsOnNext = () => {
    dispatchVisibility({
      type: HIDE_FIELD,
      field: "passportNumber",
    });
    dispatchVisibility({
      type: HIDE_FIELD,
      field: "eadNumber",
    });
    dispatchVisibility({
      type: HIDE_FIELD,
      field: "photoIDNumber",
    });
  };

  /**
   * Handles form submission.
   * Validates the section and submits data to the Redux store.
   * Focuses on errors if any validation fails.
   */
  const submit = async () => {
    if (!isSectionValid) {
      focusErrorsIfAny(sectionRef);
      forceValidations();
    } else if (!isLoading[BUTTON]) {
      // Only enable resetting values for new candidates
      if (isInNewRoute) {
        // Below resetting with empty values is required if user selects a student or H1 visa and enter home address later, if user comes back to personal and updates visa not to student

        // Resetting Home address and emergency contact details if visa status is not one of Green card, U.S. Citizen, EB-1, EB-2, EB-3, Others
        if (
          HOME_ADDRESS_NOT_REQUIRED_VISA.includes(visaStatusValue) ||
          HOME_ADDRESS_OPTIONAL_VISA.includes(visaStatusValue)
        ) {
          dispatch(
            inputActions.updateField({
              section: SECTIONS.LOCATION,
              field: FIELDS.LOCATION.INDIA_LOCATION,
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
        if (!SEVIS_DSO_REQUIRED_VISA.includes(visaStatusValue)) {
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
      }

      // Dispatching all personal details to the store
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
          value: extractOnlyDigits(SSNOriginalValue),
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
      dispatch(
        inputActions.updateField({
          section: SECTIONS.PERSONAL,
          field: FIELDS.COMMON.COMPLETED,
          value: "Done",
        })
      );
      dispatch(inputActions.enableFormSectionSubmission());

      hideSensitiveFieldsOnNext();
    }
  };

  // Expose methods to parent using ref
  useImperativeHandle(ref, () => ({
    submit,
    hideSensitiveFieldsOnNext,
  }));

  return (
    <fieldset
      ref={sectionRef}
      disabled={!isEditMode}
      className={sectionClasses.onboardFormSection}
    >
      <div className={sectionClasses.formRow}>
        <InputV2
          id="firstName"
          type="text"
          label={sections.personal.firstName}
          value={firstNameValue}
          changeHandler={firstNameChange}
          blurHandler={firstNameBlur}
          focusHandler={firstNameFocus}
          error={firstNameError}
          isFocused={isFirstNameFocused}
          extraClass={sectionClasses.halfInputWidth}
          isRequired
        />

        <InputV2
          id="lastName"
          type="text"
          label={sections.personal.lastName}
          value={lastNameValue}
          changeHandler={lastNameChange}
          blurHandler={lastNameBlur}
          focusHandler={lastNameFocus}
          error={lastNameError}
          isFocused={isLastNameFocused}
          extraClass={sectionClasses.halfInputWidth}
          isRequired
        />
      </div>

      <InputV2
        id="emailId"
        type="email"
        label={sections.personal.emailId}
        value={emailIdValue}
        changeHandler={emailIdChange}
        blurHandler={emailIdBlur}
        focusHandler={emailIdFocus}
        error={emailIdError}
        isFocused={isEmailIdFocused}
        extraClass={sectionClasses.fullInputWidth}
        isRequired
      />

      <div className={sectionClasses.formRow}>
        <InputV2
          id="phoneNumber"
          type="tel"
          label={sections.personal.phone}
          value={phoneNumberValue}
          changeHandler={phoneNumberChange}
          blurHandler={phoneNumberBlur}
          focusHandler={phoneNumberFocus}
          error={phoneNumberError}
          isFocused={isPhoneNumberFocused}
          extraClass={sectionClasses.halfInputWidth}
          isRequired
        />

        <InputV2
          id="secondaryPhoneNumber"
          type="tel"
          label={sections.personal.secondaryPhone}
          value={secondaryPhoneNumberValue}
          changeHandler={secondaryPhoneNumberChange}
          blurHandler={secondaryPhoneNumberBlur}
          focusHandler={secondaryPhoneNumberFocus}
          error={secondaryPhoneNumberError}
          isFocused={isSecondaryPhoneNumberFocused}
          extraClass={sectionClasses.halfInputWidth}
        />
      </div>

      <RadioGroup
        id="gender"
        label={sections.personal.gender}
        value={genderValue}
        options={OPTIONS.GENDER}
        changeHandler={genderChange}
        blurHandler={genderBlur}
        error={genderError}
        extraClass={sectionClasses.fullInputWidth}
        isRequired
      />

      <div className={sectionClasses.formRow}>
        <InputV2
          id="dob"
          type="text"
          label={sections.personal.dob}
          value={dobValue}
          placeholder="mm/dd/yyyy"
          changeHandler={dobChange}
          blurHandler={dobBlur}
          focusHandler={dobFocus}
          error={dobError}
          isFocused={isDobFocused}
          extraClass={sectionClasses.halfInputWidth}
          isRequired
        />

        <Select
          id="maritalStatus"
          type="text"
          label={sections.personal.maritalStatus}
          options={OPTIONS.MARITAL_STATUS}
          value={maritalStatusValue}
          changeHandler={maritalStatusChange}
          blurHandler={maritalStatusBlur}
          focusHandler={maritalStatusFocus}
          error={maritalStatusError}
          isFocused={isMaritalStatusFocused}
          extraClass={sectionClasses.halfInputWidth}
        />
      </div>

      <div className={sectionClasses.formRow}>
        <InputV2
          id="passportNumber"
          autoComplete="off"
          type={showFields.passportNumber ? "text" : "password"}
          label={sections.personal.passportNumber}
          value={passportNumberValue}
          changeHandler={passportNumberChange}
          blurHandler={passportNumberBlur}
          focusHandler={passportNumberFocus}
          error={passportNumberError}
          isFocused={isPassportNumberFocused}
          extraClass={sectionClasses.halfInputWidth}
          rightIcon={
            showFields.passportNumber ? (
              <i className="bi bi-eye-slash"></i>
            ) : (
              <i className="bi bi-eye"></i>
            )
          }
          rightIconOnClick={() =>
            dispatchVisibility({
              type: TOGGLE_FIELD,
              field: "passportNumber",
            })
          }
          isRequired={!isPassportOptional}
        />

        <InputV2
          id="SSN"
          type="text"
          label={sections.personal.ssn}
          value={SSNValue}
          autoComplete="off"
          changeHandler={SSNChange}
          blurHandler={SSNBlur}
          focusHandler={SSNFocus}
          error={SSNError}
          isFocused={isSSNFocused}
          extraClass={sectionClasses.halfInputWidth}
          isRequired
        />
      </div>
      <Select
        id="visaStatus"
        type="text"
        label={sections.personal.visaStatus}
        options={OPTIONS.VISA_STATUS}
        value={visaStatusValue}
        changeHandler={visaStatusChange}
        blurHandler={visaStatusBlur}
        focusHandler={visaStatusFocus}
        error={visaStatusError}
        isFocused={isVisaStatusFocused}
        extraClass={sectionClasses.fullInputWidth}
        isRequired
      />
      {isEADRequired && (
        <InputV2
          id="eadNumber"
          autoComplete="off"
          type={showFields.eadNumber ? "text" : "password"}
          label={sections.personal.eadNumber}
          value={eadNumberValue}
          changeHandler={eadNumberChange}
          blurHandler={eadNumberBlur}
          focusHandler={eadNumberFocus}
          error={eadNumberError}
          isFocused={isEadNumberFocused}
          extraClass={sectionClasses.fullInputWidth}
          rightIcon={
            showFields.eadNumber ? (
              <i className="bi bi-eye-slash"></i>
            ) : (
              <i className="bi bi-eye"></i>
            )
          }
          rightIconOnClick={() =>
            dispatchVisibility({
              type: TOGGLE_FIELD,
              field: "eadNumber",
            })
          }
          isRequired={!isEADOptional}
        />
      )}

      <Select
        id="photoIDType"
        type="text"
        label={sections.personal.photoIDType}
        options={OPTIONS.PHOTO_ID_TYPE}
        value={photoIDTypeValue}
        changeHandler={photoIDTypeChange}
        blurHandler={photoIDTypeBlur}
        focusHandler={photoIDTypeFocus}
        error={photoIDTypeError}
        isFocused={isPhotoIDTypeFocused}
        extraClass={sectionClasses.fullInputWidth}
      />

      {photoIDTypeValue && (
        <InputV2
          id="photoIDNumber"
          autoComplete="off"
          type={showFields.photoIDNumber ? "text" : "password"}
          label={
            photoIDTypeValue === "DL"
              ? sections.personal.licenseNumber
              : sections.personal.stateIDNumber
          }
          value={photoIDNumberValue}
          changeHandler={photoIDNumberChange}
          blurHandler={photoIDNumberBlur}
          focusHandler={photoIDNumberFocus}
          error={photoIDNumberError}
          isFocused={isPhotoIDNumberFocused}
          extraClass={sectionClasses.fullInputWidth}
          rightIcon={
            showFields.photoIDNumber ? (
              <i className="bi bi-eye-slash"></i>
            ) : (
              <i className="bi bi-eye"></i>
            )
          }
          rightIconOnClick={() =>
            dispatchVisibility({
              type: TOGGLE_FIELD,
              field: "photoIDNumber",
            })
          }
          isRequired
        />
      )}

      <div className={sectionClasses.formRow}>
        <InputV2
          id="skypeId"
          type="text"
          label={sections.personal.skypeID}
          value={skypeIdValue}
          changeHandler={skypeIdChange}
          blurHandler={skypeIdBlur}
          focusHandler={skypeIdFocus}
          error={skypeIdError}
          isFocused={isSkypeIdFocused}
          extraClass={sectionClasses.halfInputWidth}
        />

        <InputV2
          id="referenceName"
          type="text"
          label={sections.personal.referenceName}
          value={referenceNameValue}
          changeHandler={referenceNameChange}
          blurHandler={referenceNameBlur}
          focusHandler={referenceNameFocus}
          error={referenceNameError}
          isFocused={isReferenceNameFocused}
          extraClass={sectionClasses.halfInputWidth}
        />
      </div>
    </fieldset>
  );
});

Personal.propTypes = {
  isInNewRoute: PropTypes.bool.isRequired,
};

Personal.displayName = "FormPersonal";
export default Personal;
