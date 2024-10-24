import { useImperativeHandle, forwardRef, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputV2 from "../../../../Atoms/components/Inputs/InputV2";
import Select from "../../../../Atoms/components/Inputs/Select";
import Checkbox from "../../../../Atoms/components/Inputs/Checkbox";
import ListAdd from "../ListAdd";
import SingleInput from "../../FormListItems/SingleInput";
import PreviousExperience from "../../FormListItems/PreviousExperience";
import Reference from "../../FormListItems/Reference";
import { useSectionInputsFocus } from "../../../hooks";
import { useInput } from "../../../../Atoms/hooks";
import { defaultPrevExp, defaultReference, inputActions } from "../../../store";
import {
  determineSectionValidity,
  focusErrorsIfAny,
  onboardingValidations,
} from "../../../../../utilities";
import { SECTIONS, FIELDS, OPTIONS } from "../../../constants";
import sectionClasses from "../sections.module.scss";

const Profession = forwardRef((_, ref) => {
  const dispatch = useDispatch();
  const {
    currentSectionIndex,
    data: {
      profession: {
        trainingAttended,
        experience: { years, months },
        previousExperience,
        technologiesKnown,
        references,
      },
    },
  } = useSelector((state) => state.input);
  const sectionRef = useSectionInputsFocus(currentSectionIndex);

  const { profession: validations } = onboardingValidations;

  const {
    value: trainingAttendedValue,
    handleInputChange: trainingAttendedChange,
    handleInputBlur: trainingAttendedBlur,
  } = useInput(
    trainingAttended === FIELDS.RELOCATION.INTERESTED.OPTIONS.YES ? true : false
  );

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

  const technologiesRef = useRef();
  const prevExpRef = useRef();
  const referencesRef = useRef();

  const allErrors = [experienceYearsError, experienceMonthsError];
  const allValues = [experienceYearsValue, experienceMonthsValue];

  const isSectionValid = determineSectionValidity(allErrors, allValues);

  const forceValidations = () => {
    forceExperienceYearsValidations();
    forceExperienceMonthsValidations();
  };

  const submit = () => {
    const {
      isSectionValid: arePrevExperiencesValid,
      listItems: prevExperiences,
    } = prevExpRef?.current?.submit?.();
    const { isSectionValid: areTechnologiesValid, listItems: technologies } =
      technologiesRef?.current?.submit?.();

    const referenceSubmitResult = referencesRef.current?.submit?.();
    const areReferencesValid = referenceSubmitResult?.isSectionValid;
    const referencesList = referenceSubmitResult?.listItems;

    if (
      !isSectionValid ||
      !arePrevExperiencesValid ||
      !areTechnologiesValid ||
      !areReferencesValid
    ) {
      forceValidations();
      prevExpRef.current?.forceValidations?.();
      technologiesRef.current?.forceValidations?.();
      referencesRef.current?.forceValidations?.();
      console.log(sectionRef);
      focusErrorsIfAny(sectionRef);
      return false;
    }

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
        value: prevExperiences,
      })
    );
    dispatch(
      inputActions.updateField({
        section: SECTIONS.PROFESSION,
        field: FIELDS.PROFESSION.REFERENCES,
        value: referencesList,
      })
    );

    return true;
  };

  useImperativeHandle(ref, () => ({
    submit,
  }));

  return (
    <div ref={sectionRef} className={sectionClasses.onboardFormSection}>
      <Checkbox
        id="trainingAttended"
        label="Training Attended?"
        value={trainingAttendedValue}
        changeHandler={trainingAttendedChange}
        blurHandler={trainingAttendedBlur}
        helperText="(Considered no by default)"
        extraClass={sectionClasses.fullInputWidth}
        isRequired
      />

      <div className={sectionClasses.formRow}>
        <InputV2
          id="experienceYears"
          label="Experience in Years"
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
          label="Experience in Months"
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

      <ListAdd
        label="Any past experience?"
        itemLabels={{
          employerName: "Company Name",
          email: "Company Email",
          phone: "Company Phone",
          address: "Company Address",
        }}
        element={(props) => <PreviousExperience {...props} />}
        savedListItems={previousExperience}
        validationFuncs={{
          employerName: validations.employerName,
          email: validations.employerEmail,
          phone: validations.employerPhone,
        }}
        newValue={defaultPrevExp}
        ref={prevExpRef}
      />

      <ListAdd
        label="Any familiar technologies?"
        itemLabels={{ input: "Technology" }}
        element={(props) => <SingleInput {...props} />}
        savedListItems={technologiesKnown}
        validationFuncs={{ input: validations.technology }}
        newValue={""}
        ref={technologiesRef}
      />

      <ListAdd
        label="Any references?"
        itemLabels={{
          name: "Reference Name",
          phone: "Reference Phone",
          email: "Reference Email",
          designation: "Designation",
          company: "Company",
        }}
        helperText="(atleast two references are preferred)"
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
    </div>
  );
});

Profession.displayName = "FormProfession";
export default Profession;
