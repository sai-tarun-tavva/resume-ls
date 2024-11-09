import { forwardRef, useImperativeHandle, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListAdd from "../ListAdd";
import InputV2 from "../../../../Atoms/components/Inputs/InputV2";
import Address from "../Address";
import SingleInput from "../../FormListItems/SingleInput";
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
import { CONTENT, LOADING_ACTION_TYPES } from "../../../../../constants";
import { SECTIONS, FIELDS, EDUCATION_REQUIRED_VISA } from "../../../constants";
import sectionClasses from "../sections.module.scss";
import { useLoading } from "../../../../../store";

const { BUTTON } = LOADING_ACTION_TYPES;
const { sections } = CONTENT.ONBOARD.candidateForm;

/**
 * Education Form Component
 * Handles the education section including SEVIS ID, DSO details, university details, and certifications.
 *
 * @param {Object} ref - The ref used to expose methods to the parent component.
 */
const Education = forwardRef((_, ref) => {
  const dispatch = useDispatch();
  const {
    currentSectionIndex,
    isEditMode,
    data: {
      personal: { visaStatus },
      education: {
        sevisID,
        dso: { name: dsoName, email: dsoEmail, phone: dsoPhone },
        graduatedUniversity: {
          name: universityName,
          address: universityAddress,
          passedMonthAndYear,
          stream,
          additionalCertifications,
        },
      },
    },
  } = useSelector((state) => state.input);
  const addressRef = useRef();
  const listRef = useRef();
  const isEducationRequired = EDUCATION_REQUIRED_VISA.includes(visaStatus);
  const sectionRef = useSectionInputsFocus(currentSectionIndex);
  const { isLoading } = useLoading();
  const { education: validations } = onboardingValidations;

  /**
   * Input hooks for each form field with validation functions.
   * These hooks manage the state and validation of each input field.
   */
  const {
    value: sevisIDValue,
    handleInputChange: sevisIDChange,
    handleInputBlur: sevisIDBlur,
    handleInputFocus: sevisIDFocus,
    error: sevisIDError,
    isFocused: isSevisIDFocused,
    forceValidations: forceSevisIDValidations,
  } = useInput(sevisID, validations.sevisID, undefined, true);

  const {
    value: dsoNameValue,
    handleInputChange: dsoNameChange,
    handleInputBlur: dsoNameBlur,
    handleInputFocus: dsoNameFocus,
    error: dsoNameError,
    isFocused: isDSONameFocused,
    forceValidations: forceDSONameValidations,
  } = useInput(dsoName, validations.dsoName, undefined, true);

  const {
    value: dsoEmailValue,
    handleInputChange: dsoEmailChange,
    handleInputBlur: dsoEmailBlur,
    handleInputFocus: dsoEmailFocus,
    error: dsoEmailError,
    isFocused: isDSOEmailFocused,
    forceValidations: forceDSOEmailValidations,
  } = useInput(dsoEmail, validations.dsoEmail, undefined, true);

  const {
    value: dsoPhoneValue,
    handleInputChange: dsoPhoneChange,
    handleInputBlur: dsoPhoneBlur,
    handleInputFocus: dsoPhoneFocus,
    error: dsoPhoneError,
    isFocused: isDSOPhoneFocused,
    forceValidations: forceDSOPhoneValidations,
  } = useInput(
    transformPhoneNumber(dsoPhone),
    validations.dsoPhone,
    transformPhoneNumber,
    true
  );

  const {
    value: universityNameValue,
    handleInputChange: universityNameChange,
    handleInputBlur: universityNameBlur,
    handleInputFocus: universityNameFocus,
    error: universityNameError,
    isFocused: isUniversityNameFocused,
    forceValidations: forceUniversityNameValidations,
  } = useInput(universityName, validations.universityName, undefined, true);

  const {
    value: passedMonthAndYearValue,
    handleInputChange: passedMonthAndYearChange,
    handleInputBlur: passedMonthAndYearBlur,
    handleInputFocus: passedMonthAndYearFocus,
    error: passedMonthAndYearError,
    isFocused: isPassedMonthAndYearFocused,
    forceValidations: forcePassedMonthAndYearValidations,
  } = useInput(passedMonthAndYear, validations.year, undefined, true);

  const {
    value: streamValue,
    handleInputChange: streamChange,
    handleInputBlur: streamBlur,
    handleInputFocus: streamFocus,
    error: streamError,
    isFocused: isStreamFocused,
    forceValidations: forceStreamValidations,
  } = useInput(stream, validations.universityStream, undefined, true);

  // Collect all errors and validate the section
  const allErrors = [
    sevisIDError,
    dsoNameError,
    dsoEmailError,
    dsoPhoneError,
    universityNameError,
    passedMonthAndYearError,
    streamError,
  ];
  const allValues = [
    sevisIDValue,
    dsoNameValue,
    dsoEmailValue,
    dsoPhoneValue,
    universityNameValue,
    passedMonthAndYearValue,
    streamValue,
  ];

  const isSectionValid = determineSectionValidity(allErrors, allValues);

  /**
   * Force validations for all fields in the education section
   */
  const forceValidations = () => {
    forceUniversityNameValidations();
    forcePassedMonthAndYearValidations();
    forceStreamValidations();
    forceSevisIDValidations();
    forceDSONameValidations();
    forceDSOEmailValidations();
    forceDSOPhoneValidations();
  };

  /**
   * Handles form submission and updates the Redux store with validated data.
   * It validates the USA and home country address fields as well as certificates.
   */
  const submit = async () => {
    const addressSubmitResult = addressRef.current?.submit?.();
    const isAddressValid = addressSubmitResult?.isSectionValid;
    const address = addressSubmitResult?.item;

    const { isSectionValid: areCertificatesValid, listItems: certificates } =
      listRef?.current?.submit?.(); // ListAdd validation

    if (
      (isEducationRequired && (!isSectionValid || isAddressValid === false)) ||
      !areCertificatesValid
    ) {
      forceValidations();
      addressRef.current?.forceValidations?.(); // Force Address validation
      listRef?.current?.forceValidations?.();
      focusErrorsIfAny(sectionRef);
    } else if (!isLoading[BUTTON]) {
      // Dispatch updates for SEVIS ID, DSO, and university details
      dispatch(
        inputActions.updateField({
          section: SECTIONS.EDUCATION,
          field: FIELDS.EDUCATION.SEVIS_ID,
          value: sevisIDValue,
        })
      );
      dispatch(
        inputActions.updateField({
          section: SECTIONS.EDUCATION,
          field: FIELDS.EDUCATION.DSO.VALUE,
          value: {
            [FIELDS.EDUCATION.DSO.NAME]: dsoNameValue,
            [FIELDS.EDUCATION.DSO.EMAIL]: dsoEmailValue,
            [FIELDS.EDUCATION.DSO.PHONE]: extractOnlyDigits(dsoPhoneValue),
          },
        })
      );
      dispatch(
        inputActions.updateField({
          section: SECTIONS.EDUCATION,
          field: FIELDS.EDUCATION.GRADUATED_UNIVERSITY.VALUE,
          value: {
            [FIELDS.EDUCATION.GRADUATED_UNIVERSITY.NAME]: universityNameValue,
            [FIELDS.EDUCATION.GRADUATED_UNIVERSITY.PASSED_MONTH_YEAR]:
              passedMonthAndYearValue,
            [FIELDS.EDUCATION.GRADUATED_UNIVERSITY.STREAM]: streamValue,
            [FIELDS.EDUCATION.GRADUATED_UNIVERSITY.ADDRESS]: address,
            [FIELDS.EDUCATION.GRADUATED_UNIVERSITY.ADDITIONAL_CERTIFICATIONS]:
              certificates,
          },
        })
      );
      dispatch(inputActions.enableFormSectionSubmission());
    }
  };

  // Expose submit method to parent via ref
  useImperativeHandle(ref, () => ({
    submit,
  }));

  return (
    <fieldset
      ref={sectionRef}
      disabled={!isEditMode}
      className={sectionClasses.onboardFormSection}
    >
      {/* Only show these fields if education details are required */}
      {isEducationRequired && (
        <>
          <div className={sectionClasses.formRow}>
            <InputV2
              id="sevisID"
              label={sections.education.sevisID}
              value={sevisIDValue}
              changeHandler={sevisIDChange}
              blurHandler={sevisIDBlur}
              focusHandler={sevisIDFocus}
              error={sevisIDError}
              isFocused={isSevisIDFocused}
              extraClass={sectionClasses.halfInputWidth}
              isRequired
            />

            <InputV2
              id="dsoName"
              label={sections.education.dsoName}
              value={dsoNameValue}
              changeHandler={dsoNameChange}
              blurHandler={dsoNameBlur}
              focusHandler={dsoNameFocus}
              error={dsoNameError}
              isFocused={isDSONameFocused}
              extraClass={sectionClasses.halfInputWidth}
              isRequired
            />
          </div>
          <div className={sectionClasses.formRow}>
            <InputV2
              id="dsoEmail"
              label={sections.education.dsoEmail}
              type="email"
              value={dsoEmailValue}
              changeHandler={dsoEmailChange}
              blurHandler={dsoEmailBlur}
              focusHandler={dsoEmailFocus}
              error={dsoEmailError}
              isFocused={isDSOEmailFocused}
              extraClass={sectionClasses.halfInputWidth}
              isRequired
            />

            <InputV2
              id="dsoPhone"
              label={sections.education.dsoPhone}
              type="tel"
              value={dsoPhoneValue}
              changeHandler={dsoPhoneChange}
              blurHandler={dsoPhoneBlur}
              focusHandler={dsoPhoneFocus}
              error={dsoPhoneError}
              isFocused={isDSOPhoneFocused}
              extraClass={sectionClasses.halfInputWidth}
              isRequired
            />
          </div>

          <div className={sectionClasses.formRow}>
            <InputV2
              id="graduatedUniversityName"
              label={sections.education.university.name}
              value={universityNameValue}
              changeHandler={universityNameChange}
              blurHandler={universityNameBlur}
              focusHandler={universityNameFocus}
              error={universityNameError}
              isFocused={isUniversityNameFocused}
              extraClass={sectionClasses.halfInputWidth}
              isRequired
            />

            <InputV2
              id="graduatedUniversityPassedMonthAndYear"
              label={sections.education.university.passDate}
              type="month"
              value={passedMonthAndYearValue}
              changeHandler={passedMonthAndYearChange}
              blurHandler={passedMonthAndYearBlur}
              focusHandler={passedMonthAndYearFocus}
              error={passedMonthAndYearError}
              isFocused={isPassedMonthAndYearFocused}
              extraClass={sectionClasses.halfInputWidth}
              isRequired
            />
          </div>

          <InputV2
            id="graduatedUniversityStream"
            label={sections.education.university.stream}
            value={streamValue}
            changeHandler={streamChange}
            blurHandler={streamBlur}
            focusHandler={streamFocus}
            error={streamError}
            isFocused={isStreamFocused}
            extraClass={sectionClasses.fullInputWidth}
            isRequired
          />
          <Address
            heading={sections.education.university.address}
            defaultValue={universityAddress}
            id="university"
            ref={addressRef}
          />
        </>
      )}
      {/* Dynamic list for additional certifications */}
      <ListAdd
        label={sections.education.certificationsList.heading}
        itemLabels={sections.education.certificationsList.itemLabels}
        validationFuncs={{ input: validations.certificate }}
        element={(props) => <SingleInput {...props} />}
        savedListItems={additionalCertifications}
        newValue={""}
        ref={listRef}
      />
    </fieldset>
  );
});

Education.displayName = "FormEducation";
export default Education;
