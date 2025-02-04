import { forwardRef, useImperativeHandle } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InputV2 from "../../../../Atoms/components/Inputs/InputV2";
import Select from "../../../../Atoms/components/Inputs/Select";
import { useSectionInputsFocus } from "../../../../../hooks";
import { useInput } from "../../../../Atoms/hooks";
import { inputActions } from "../../../store";
import {
  determineSectionValidity,
  focusErrorsIfAny,
  forgeValidations,
} from "../../../../../utilities";
import { SECTIONS, FIELDS, OPTIONS } from "../../../constants";
import { CONTENT, ROUTES } from "../../../../../constants";
import states from "../../../../../constants/countries.json";
import sectionClasses from "../sections.module.scss";

const { sections } = CONTENT.FORGE.candidateForm;

/**
 * Candidate Component
 *
 * Handles the personal information section of the form.
 *
 * @param {Object} props - Component properties.
 * @param {React.Ref} ref - Reference to access methods from parent.
 * @returns {JSX.Element} The rendered Candidate component.
 */
const Candidate = forwardRef((_, ref) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const formType = location.pathname.split("/")[3];

  const isRecruit = formType === ROUTES.FORGE.RECRUIT.VIEW;

  const {
    currentSectionIndex,
    isEditMode,
    data: {
      [formType]: {
        candidate: {
          firstName,
          lastName,
          emailId,
          phoneNumber,
          visaStatus,
          city,
          state,
          experience,
        },
      },
    },
  } = useSelector((state) => state.input);

  const sectionRef = useSectionInputsFocus(currentSectionIndex);
  const { candidate: validations } = forgeValidations;

  // Input handlers
  const {
    value: firstNameValue,
    handleInputChange: firstNameChange,
    handleInputBlur: firstNameBlur,
    handleInputFocus: firstNameFocus,
    error: firstNameError,
    forceValidations: forceFirstNameValidations,
  } = useInput(firstName, validations.firstName, undefined, true);

  const {
    value: lastNameValue,
    handleInputChange: lastNameChange,
    handleInputBlur: lastNameBlur,
    handleInputFocus: lastNameFocus,
    error: lastNameError,
    forceValidations: forceLastNameValidations,
  } = useInput(lastName, validations.lastName, undefined, true);

  const {
    value: emailIdValue,
    handleInputChange: emailIdChange,
    handleInputBlur: emailIdBlur,
    handleInputFocus: emailIdFocus,
    error: emailIdError,
    forceValidations: forceEmaiIdValidations,
  } = useInput(emailId, validations.email, undefined, true);

  const {
    value: phoneNumberValue,
    handleInputChange: phoneNumberChange,
    handleInputBlur: phoneNumberBlur,
    handleInputFocus: phoneNumberFocus,
    error: phoneNumberError,
    forceValidations: forcePhoneNumberValidations,
  } = useInput(phoneNumber, validations.phone, undefined, true);

  const {
    value: visaStatusValue,
    handleInputChange: visaStatusChange,
    handleInputBlur: visaStatusBlur,
    handleInputFocus: visaStatusFocus,
    error: visaStatusError,
    forceValidations: forceVisaStatusValidations,
  } = useInput(visaStatus, validations.visaStatus, undefined, true);

  const {
    value: cityValue,
    handleInputChange: cityChange,
    handleInputBlur: cityBlur,
    handleInputFocus: cityFocus,
    error: cityError,
    forceValidations: forceCityValidations,
  } = useInput(city, validations.city, undefined, true);

  const {
    value: stateValue,
    handleInputChange: stateChange,
    handleInputBlur: stateBlur,
    handleInputFocus: stateFocus,
    error: stateError,
    forceValidations: forceStateValidations,
  } = useInput(state, validations.state, undefined, true);

  const {
    value: expYearsValue,
    handleInputChange: expYearsChange,
    handleInputBlur: expYearsBlur,
    handleInputFocus: expYearsFocus,
    error: expYearsError,
    forceValidations: forceExpYearsValidations,
  } = useInput(
    experience?.years,
    validations.experienceInYears,
    undefined,
    true
  );

  const {
    value: expMonthsValue,
    handleInputChange: expMonthsChange,
    handleInputBlur: expMonthsBlur,
    handleInputFocus: expMonthsFocus,
    error: expMonthsError,
    forceValidations: forceExpMonthsValidations,
  } = useInput(
    experience?.months,
    validations.experienceInMonths,
    undefined,
    true
  );

  let allErrors = [firstNameError, lastNameError];
  let allValues = [firstNameValue, lastNameValue];

  if (isRecruit) {
    allErrors = [
      ...allErrors,
      emailIdError,
      phoneNumberError,
      visaStatusError,
      cityError,
      stateError,
      expYearsError,
      expMonthsError,
    ];
    allValues = [
      ...allValues,
      emailIdValue,
      phoneNumberValue,
      visaStatusValue,
      cityValue,
      stateValue,
      expYearsValue,
      expMonthsValue,
    ];
  }

  const isSectionValid = determineSectionValidity(allErrors, allValues);

  // Function to force validations on all inputs
  const forceValidations = () => {
    forceFirstNameValidations();
    forceLastNameValidations();
    forcePhoneNumberValidations();
    forceEmaiIdValidations();
    forceCityValidations();
    forceStateValidations();
    forceVisaStatusValidations();
    forceExpYearsValidations();
    forceExpMonthsValidations();
  };

  const submit = () => {
    if (!isSectionValid) {
      focusErrorsIfAny(sectionRef);
      forceValidations();
    } else {
      dispatch(
        inputActions.updateField({
          formType,
          section: SECTIONS[formType.toUpperCase()].CANDIDATE,
          field: FIELDS[formType.toUpperCase()].CANDIDATE.FIRST_NAME,
          value: firstNameValue,
        })
      );
      dispatch(
        inputActions.updateField({
          formType,
          section: SECTIONS[formType.toUpperCase()].CANDIDATE,
          field: FIELDS[formType.toUpperCase()].CANDIDATE.LAST_NAME,
          value: lastNameValue,
        })
      );
      if (isRecruit) {
        dispatch(
          inputActions.updateField({
            formType,
            section: SECTIONS[formType.toUpperCase()].CANDIDATE,
            field: FIELDS[formType.toUpperCase()].CANDIDATE.EMAIL_ID,
            value: emailIdValue,
          })
        );
        dispatch(
          inputActions.updateField({
            formType,
            section: SECTIONS[formType.toUpperCase()].CANDIDATE,
            field: FIELDS[formType.toUpperCase()].CANDIDATE.PHONE_NUMBER,
            value: phoneNumberValue,
          })
        );
        dispatch(
          inputActions.updateField({
            formType,
            section: SECTIONS[formType.toUpperCase()].CANDIDATE,
            field: FIELDS[formType.toUpperCase()].CANDIDATE.VISA_STATUS,
            value: visaStatusValue,
          })
        );
        dispatch(
          inputActions.updateField({
            formType,
            section: SECTIONS[formType.toUpperCase()].CANDIDATE,
            field: FIELDS[formType.toUpperCase()].CANDIDATE.CITY,
            value: cityValue,
          })
        );
        dispatch(
          inputActions.updateField({
            formType,
            section: SECTIONS[formType.toUpperCase()].CANDIDATE,
            field: FIELDS[formType.toUpperCase()].CANDIDATE.STATE,
            value: stateValue,
          })
        );
        dispatch(
          inputActions.updateField({
            formType,
            section: SECTIONS[formType.toUpperCase()].CANDIDATE,
            field: FIELDS[formType.toUpperCase()].CANDIDATE.EXPERIENCE.VALUE,
            value: {
              [FIELDS[formType.toUpperCase()].CANDIDATE.EXPERIENCE.YEARS]:
                expYearsValue,
              [FIELDS[formType.toUpperCase()].CANDIDATE.EXPERIENCE.MONTHS]:
                expMonthsValue,
            },
          })
        );
      }
      dispatch(
        inputActions.updateField({
          formType,
          section: SECTIONS[formType.toUpperCase()].CANDIDATE,
          field: FIELDS[formType.toUpperCase()].COMMON.COMPLETED,
          value: "Done",
        })
      );
      dispatch(inputActions.enableFormSectionSubmission());
    }
  };

  useImperativeHandle(ref, () => ({
    submit,
  }));

  return (
    <fieldset
      ref={sectionRef}
      disabled={!isEditMode}
      className={sectionClasses.forgeFormSection}
    >
      <div className={sectionClasses.formRow}>
        <InputV2
          id="firstName"
          type="text"
          label={sections.candidate.firstName}
          value={firstNameValue}
          changeHandler={firstNameChange}
          blurHandler={firstNameBlur}
          focusHandler={firstNameFocus}
          error={firstNameError}
          extraClass={sectionClasses.halfInputWidth}
          isRequired
        />
        <InputV2
          id="lastName"
          type="text"
          label={sections.candidate.lastName}
          value={lastNameValue}
          changeHandler={lastNameChange}
          blurHandler={lastNameBlur}
          focusHandler={lastNameFocus}
          error={lastNameError}
          extraClass={sectionClasses.halfInputWidth}
          isRequired
        />
      </div>

      {isRecruit && (
        <>
          <div className={sectionClasses.formRow}>
            <InputV2
              id="emailId"
              type="email"
              label={sections.candidate.emailId}
              value={emailIdValue}
              changeHandler={emailIdChange}
              blurHandler={emailIdBlur}
              focusHandler={emailIdFocus}
              error={emailIdError}
              extraClass={sectionClasses.halfInputWidth}
              isRequired
            />
            <InputV2
              id="phoneNumber"
              type="tel"
              label={sections.candidate.phone}
              value={phoneNumberValue}
              changeHandler={phoneNumberChange}
              blurHandler={phoneNumberBlur}
              focusHandler={phoneNumberFocus}
              error={phoneNumberError}
              extraClass={sectionClasses.halfInputWidth}
              isRequired
            />
          </div>
          <Select
            id="visaStatus"
            label={sections.candidate.visa}
            options={OPTIONS.VISA_STATUS}
            value={visaStatusValue}
            changeHandler={visaStatusChange}
            blurHandler={visaStatusBlur}
            focusHandler={visaStatusFocus}
            error={visaStatusError}
            extraClass={sectionClasses.fullInputWidth}
            isRequired
          />
          <div className={sectionClasses.formRow}>
            <InputV2
              id="city"
              type="text"
              label={sections.candidate.city}
              value={cityValue}
              changeHandler={cityChange}
              blurHandler={cityBlur}
              focusHandler={cityFocus}
              error={cityError}
              extraClass={sectionClasses.halfInputWidth}
              isRequired
            />
            <Select
              id="state"
              label={sections.candidate.state}
              value={stateValue}
              options={[
                { value: "", label: "" },
                { value: "Remote", label: "REMOTE" },
                ...states["USA"],
              ]}
              changeHandler={stateChange}
              blurHandler={stateBlur}
              focusHandler={stateFocus}
              error={stateError}
              extraClass={sectionClasses.halfInputWidth}
              isRequired
            />
          </div>
          <div className={sectionClasses.formRow}>
            <InputV2
              id="expYears"
              type="number"
              label={sections.candidate.expYears}
              value={expYearsValue}
              changeHandler={expYearsChange}
              blurHandler={expYearsBlur}
              focusHandler={expYearsFocus}
              error={expYearsError}
              extraClass={sectionClasses.halfInputWidth}
              isRequired
            />

            <Select
              id="expMonths"
              label={sections.candidate.expMonths}
              value={expMonthsValue}
              options={OPTIONS.EXPERIENCE_MONTHS}
              changeHandler={expMonthsChange}
              blurHandler={expMonthsBlur}
              focusHandler={expMonthsFocus}
              error={expMonthsError}
              extraClass={sectionClasses.halfInputWidth}
              isRequired
            />
          </div>
        </>
      )}
    </fieldset>
  );
});

Candidate.displayName = "FormCandidate";
export default Candidate;
