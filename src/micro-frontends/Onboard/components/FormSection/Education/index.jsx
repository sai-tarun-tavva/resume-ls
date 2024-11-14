import { forwardRef, useImperativeHandle, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListAdd from "../ListAdd";
import InputV2 from "../../../../Atoms/components/Inputs/InputV2";
import SchoolOrUniversity from "../../FormListItems/SchoolOrUniversity";
import SingleInput from "../../FormListItems/SingleInput";
import { useSectionInputsFocus } from "../../../hooks";
import { useInput } from "../../../../Atoms/hooks";
import { defaultUniversity, inputActions } from "../../../store";
import {
  determineSectionValidity,
  extractOnlyDigits,
  focusErrorsIfAny,
  onboardingValidations,
  transformPhoneNumber,
} from "../../../../../utilities";
import { CONTENT, LOADING_ACTION_TYPES } from "../../../../../constants";
import { SECTIONS, FIELDS, SEVIS_DSO_REQUIRED_VISA } from "../../../constants";
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
        universities,
        additionalCertifications,
      },
    },
  } = useSelector((state) => state.input);
  const addressRef = useRef();
  const certificationsRef = useRef();
  const universitiesRef = useRef();
  const isSevisDSORequired = SEVIS_DSO_REQUIRED_VISA.includes(visaStatus);
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

  // Collect all errors and validate the section
  const allErrors = [sevisIDError, dsoNameError, dsoEmailError, dsoPhoneError];
  const allValues = [sevisIDValue, dsoNameValue, dsoEmailValue, dsoPhoneValue];

  const isSectionValid = determineSectionValidity(allErrors, allValues);

  /**
   * Force validations for all fields in the education section
   */
  const forceValidations = () => {
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
    // ListAdd validation
    const { isSectionValid: areCertificatesValid, listItems: certificates } =
      certificationsRef?.current?.submit?.();
    const { isSectionValid: areUniversitiesValid, listItems: universities } =
      universitiesRef?.current?.submit?.();

    if (
      (isSevisDSORequired && !isSectionValid) ||
      !areCertificatesValid ||
      !areUniversitiesValid
    ) {
      forceValidations();
      addressRef.current?.forceValidations?.(); // Force Address validation
      certificationsRef?.current?.forceValidations?.();
      universitiesRef?.current?.forceValidations?.();
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
          field: FIELDS.EDUCATION.GRADUATED_UNIVERSITY,
          value: universities.sort((a, b) => {
            // Recent university should be first item
            return (
              new Date(b.passedMonthAndYear) - new Date(a.passedMonthAndYear)
            );
          }),
        })
      );
      dispatch(
        inputActions.updateField({
          section: SECTIONS.EDUCATION,
          field: FIELDS.EDUCATION.ADDITIONAL_CERTIFICATIONS,
          value: certificates,
        })
      );
      dispatch(
        inputActions.updateField({
          section: SECTIONS.EDUCATION,
          field: FIELDS.COMMON.COMPLETED,
          value: "Done",
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
      {isSevisDSORequired && (
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
        </>
      )}
      {/* Dynamic list for universities certifications */}
      <ListAdd
        label={sections.education.universityList.heading}
        itemLabels={sections.education.universityList.itemLabels}
        element={(props) => <SchoolOrUniversity {...props} />}
        savedListItems={
          universities.length > 0 ? universities : [defaultUniversity]
        }
        validationFuncs={{
          universityName: validations.universityName,
          stream: validations.universityStream,
          passedMonthAndYear: validations.year,
        }}
        newValue={defaultUniversity}
        ref={universitiesRef}
        mandatoryItems={1}
        helperText={sections.education.universityList.helper}
      />
      {/* Dynamic list for additional certifications */}
      <ListAdd
        label={sections.education.certificationsList.heading}
        itemLabels={sections.education.certificationsList.itemLabels}
        validationFuncs={{ input: validations.certificate }}
        element={(props) => <SingleInput {...props} />}
        savedListItems={additionalCertifications}
        newValue={""}
        ref={certificationsRef}
      />
    </fieldset>
  );
});

Education.displayName = "FormEducation";
export default Education;
