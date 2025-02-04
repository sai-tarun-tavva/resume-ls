import { forwardRef, useImperativeHandle, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import InputV2 from "../../../../Atoms/components/Inputs/InputV2";
import Select from "../../../../Atoms/components/Inputs/Select";
import Checkbox from "../../../../Atoms/components/Inputs/Checkbox";
import ListAdd from "../ListAdd";
import SingleInput from "../../FormListItems/SingleInput";
import PreviousExperience from "../../FormListItems/PreviousExperience";
import Reference from "../../FormListItems/Reference";
import { useSectionInputsFocus } from "../../../../../hooks";
import { useInput } from "../../../../Atoms/hooks";
import { useLoading } from "../../../../../store";
import { defaultPrevExp, defaultReference, inputActions } from "../../../store";
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
import {
  SECTIONS,
  FIELDS,
  OPTIONS,
  COMPANY_DETAILS_REQUIRED_VISA,
} from "../../../constants";
import sectionClasses from "../sections.module.scss";
import classes from "./index.module.scss";

const { BUTTON } = LOADING_ACTION_TYPES;
const { sections } = CONTENT.ONBOARD.candidateForm;

/**
 * Profession Component
 *
 * Handles the profession-related section of the onboarding process.
 * It validates, submits, and manages user input related to professional details
 * like training attended, experience, previous jobs, and references.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isInNewRoute - Indicates if the component is in a new route.
 * @param {React.Ref} ref - The reference passed from the parent component.
 * @returns {JSX.Element} The rendered Profession component.
 */
const Profession = forwardRef(({ isInNewRoute }, ref) => {
  const dispatch = useDispatch();
  const {
    currentSectionIndex,
    isEditMode,
    data: {
      personal: { visaStatus },
      profession: {
        trainingAttended,
        experience: { years, months },
        previousExperience,
        technologiesKnown,
        references,
        linkedInIdentifier,
      },
    },
  } = useSelector((state) => state.input);

  const sectionRef = useSectionInputsFocus(currentSectionIndex);
  const { isLoading } = useLoading();
  const isCompanyDetailsRequired =
    COMPANY_DETAILS_REQUIRED_VISA.includes(visaStatus);

  const { profession: validations } = onboardingValidations;

  // Handling 'Training Attended' checkbox state
  const trainingAttendedAsBoolean =
    trainingAttended === FIELDS.RELOCATION.INTERESTED.OPTIONS.YES
      ? true
      : false;

  const {
    value: trainingAttendedValue,
    handleInputChange: trainingAttendedChange,
    handleInputBlur: trainingAttendedBlur,
  } = useInput(
    trainingAttendedAsBoolean,
    undefined,
    undefined,
    undefined,
    INPUT_TYPES.CHECKBOX
  );

  // Handling experience fields
  const {
    value: experienceYearsValue,
    handleInputChange: experienceYearsChange,
    handleInputBlur: experienceYearsBlur,
    handleInputFocus: experienceYearsFocus,
    error: experienceYearsError,
    isFocused: isExperienceYearsFocused,
    forceValidations: forceExperienceYearsValidations,
  } = useInput(years, validations.experienceInYears, undefined, true);

  const {
    value: experienceMonthsValue,
    handleInputChange: experienceMonthsChange,
    handleInputBlur: experienceMonthsBlur,
    handleInputFocus: experienceMonthsFocus,
    error: experienceMonthsError,
    isFocused: isExperienceMonthsFocused,
    forceValidations: forceExperienceMonthsValidations,
  } = useInput(months, validations.experienceInMonths, undefined, true);

  const {
    value: linkedInIdentifierValue,
    handleInputChange: linkedInIdentifierChange,
    handleInputBlur: linkedInIdentifierBlur,
    handleInputFocus: linkedInIdentifierFocus,
    error: linkedInIdentifierError,
    isFocused: isLinkedInIdentifierFocused,
  } = useInput(
    linkedInIdentifier,
    (value) => validations.linkedInIdentifier(value, true),
    undefined,
    true
  );

  // Refs for lists (previous experience, technologies, references)
  const technologiesRef = useRef();
  const prevExpRef = useRef();
  const referencesRef = useRef();

  // Collect all errors and values for the profession section
  const allErrors = [
    experienceYearsError,
    experienceMonthsError,
    linkedInIdentifierError,
  ];
  const allValues = [
    experienceYearsValue.toString(),
    experienceMonthsValue.toString(),
  ];

  // Check if the section is valid based on errors and values
  const isSectionValid = determineSectionValidity(allErrors, allValues);

  // Function to trigger validation for all fields
  const forceValidations = () => {
    forceExperienceYearsValidations();
    forceExperienceMonthsValidations();
  };

  /**
   * Handles form submission.
   * Validates the section and submits data to the Redux store.
   * Focuses on errors if any validation fails.
   */
  const submit = async () => {
    const prevExpResult = prevExpRef?.current?.submit?.();
    const arePrevExperiencesValid = prevExpResult?.isSectionValid;
    const prevExperiences = prevExpResult?.listItems;

    const { isSectionValid: areTechnologiesValid, listItems: technologies } =
      technologiesRef?.current?.submit?.();

    const referenceSubmitResult = referencesRef.current?.submit?.();
    const areReferencesValid = referenceSubmitResult?.isSectionValid;
    const referencesList = referenceSubmitResult?.listItems;

    // Check if the section is valid and all sub-sections (lists) are valid
    if (
      !isSectionValid ||
      arePrevExperiencesValid === false ||
      !areTechnologiesValid ||
      areReferencesValid === false
    ) {
      // Trigger force validations if any validation fails
      forceValidations();
      prevExpRef.current?.forceValidations?.();
      technologiesRef.current?.forceValidations?.();
      referencesRef.current?.forceValidations?.();
      focusErrorsIfAny(sectionRef);
    } else if (!isLoading[BUTTON]) {
      // If all validations pass, update the Redux store with form data
      dispatch(
        inputActions.updateField({
          section: SECTIONS.PROFESSION,
          field: FIELDS.PROFESSION.TRAINING_ATTENDED.VALUE,
          value: trainingAttendedValue
            ? FIELDS.PROFESSION.TRAINING_ATTENDED.OPTIONS.YES
            : FIELDS.PROFESSION.TRAINING_ATTENDED.OPTIONS.NO,
        })
      );
      dispatch(
        inputActions.updateField({
          section: SECTIONS.PROFESSION,
          field: FIELDS.PROFESSION.EXPERIENCE.VALUE,
          value: {
            [FIELDS.PROFESSION.EXPERIENCE.YEARS]: +experienceYearsValue,
            [FIELDS.PROFESSION.EXPERIENCE.MONTHS]: +experienceMonthsValue,
          },
        })
      );
      dispatch(
        inputActions.updateField({
          section: SECTIONS.PROFESSION,
          field: FIELDS.PROFESSION.TECHNOLOGIES_KNOWN,
          value: technologies,
        })
      );
      dispatch(
        inputActions.updateField({
          section: SECTIONS.PROFESSION,
          field: FIELDS.PROFESSION.PREVIOUS_EXPERIENCE,
          value: prevExperiences || [],
        })
      );
      dispatch(
        inputActions.updateField({
          section: SECTIONS.PROFESSION,
          field: FIELDS.PROFESSION.REFERENCES,
          value: referencesList,
        })
      );
      dispatch(
        inputActions.updateField({
          section: SECTIONS.PROFESSION,
          field: FIELDS.PROFESSION.LINKEDIN_IDENTIFIER,
          value: linkedInIdentifierValue,
        })
      );
      dispatch(
        inputActions.updateField({
          section: SECTIONS.PROFESSION,
          field: FIELDS.COMMON.COMPLETED,
          value: "Done",
        })
      );
      dispatch(inputActions.enableFormSectionSubmission());
    }
  };

  // Expose submit method to parent component using useImperativeHandle
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
        id="trainingAttended"
        label={sections.profession.training.label}
        value={trainingAttendedValue}
        changeHandler={trainingAttendedChange}
        blurHandler={trainingAttendedBlur}
        helperText={isInNewRoute ? sections.profession.training.helper : ""}
        extraClass={sectionClasses.fullInputWidth}
        isRequired
      />

      <div className={sectionClasses.formRow}>
        <InputV2
          id="experienceYears"
          label={sections.profession.expYears}
          type="number"
          value={experienceYearsValue}
          changeHandler={experienceYearsChange}
          blurHandler={experienceYearsBlur}
          focusHandler={experienceYearsFocus}
          error={experienceYearsError}
          isFocused={isExperienceYearsFocused}
          extraClass={sectionClasses.halfInputWidth}
          isRequired
        />

        <Select
          id="experienceMonths"
          label={sections.profession.expMonths}
          value={experienceMonthsValue}
          options={OPTIONS.EXPERIENCE_MONTHS}
          changeHandler={experienceMonthsChange}
          blurHandler={experienceMonthsBlur}
          focusHandler={experienceMonthsFocus}
          error={experienceMonthsError}
          isFocused={isExperienceMonthsFocused}
          extraClass={sectionClasses.halfInputWidth}
          isRequired
        />
      </div>

      {/* Only display if experience in years or month is not zero */}
      {(+experienceYearsValue !== 0 || +experienceMonthsValue !== 0) && (
        <ListAdd
          label={sections.profession.prevExpList.heading}
          itemLabels={sections.profession.prevExpList.itemLabels}
          element={(props) => (
            <PreviousExperience
              isCompanyDetailsRequired={isCompanyDetailsRequired}
              {...props}
            />
          )}
          savedListItems={previousExperience}
          validationFuncs={{
            employerName: validations.employerName,
            email: validations.employerEmail,
            phone: validations.employerPhone,
          }}
          newValue={defaultPrevExp}
          ref={prevExpRef}
        />
      )}

      <ListAdd
        label={sections.profession.technologyList.heading}
        itemLabels={sections.profession.technologyList.itemLabels}
        element={(props) => <SingleInput {...props} />}
        savedListItems={technologiesKnown}
        validationFuncs={{ input: validations.technology }}
        newValue={""}
        ref={technologiesRef}
      />

      <ListAdd
        label={sections.profession.referencesList.heading}
        itemLabels={sections.profession.referencesList.itemLabels}
        helperText={sections.profession.referencesList.helper}
        element={(props) => <Reference {...props} />}
        savedListItems={references}
        validationFuncs={{
          name: validations.referenceName,
          phone: validations.referencePhone,
          email: validations.referenceEmail,
          designation: validations.referenceDesignation,
          company: validations.referenceCompany,
        }}
        newValue={defaultReference}
        ref={referencesRef}
      />

      <InputV2
        id={"linkedin-identifier"}
        type="text"
        label={
          CONTENT.ONBOARD.candidateForm.sections.profession.linkedInIdentifier
        }
        placeholder="your-profile/"
        value={linkedInIdentifierValue}
        changeHandler={linkedInIdentifierChange}
        blurHandler={linkedInIdentifierBlur}
        focusHandler={linkedInIdentifierFocus}
        error={linkedInIdentifierError}
        isFocused={isLinkedInIdentifierFocused}
        extraClass={`${sectionClasses.fullInputWidth} ${classes.linkedInExtraClass}`}
        prefix="https://www.linkedin.com/in/"
      />
    </fieldset>
  );
});

Profession.propTypes = {
  isInNewRoute: PropTypes.bool.isRequired,
};

Profession.displayName = "FormProfession";
export default Profession;
