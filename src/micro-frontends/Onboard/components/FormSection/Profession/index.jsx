import { useImperativeHandle, forwardRef, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputV2 from "../../../../Atoms/components/Inputs/InputV2";
import Select from "../../../../Atoms/components/Inputs/Select";
import Checkbox from "../../../../Atoms/components/Inputs/Checkbox";
import ListAdd from "../ListAdd";
import SingleInput from "../../FormListItems/SingleInput";
import PreviousExperience from "../../FormListItems/PreviousExperience";
import Reference from "../../FormListItems/Reference";
import { useInput } from "../../../../Atoms/hooks";
import { defaultPrevExp, defaultReference, inputActions } from "../../../store";
import {
  determineSectionValidity,
  onboardingValidations,
} from "../../../../../utilities";
import { SECTIONS, FIELDS, OPTIONS } from "../../../constants";
import classes from "./index.module.scss";

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
  const firstInputRef = useRef();

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

  const isFresher =
    (experienceYearsValue === "0" || experienceYearsValue === "") &&
    (experienceMonthsValue === "0" || experienceMonthsValue === "");

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
      (!isFresher && !areReferencesValid)
    ) {
      forceValidations();
      prevExpRef.current?.forceValidations?.();
      technologiesRef.current?.forceValidations?.();
      referencesRef.current?.forceValidations?.();
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
        value: isFresher ? [] : referencesList,
      })
    );

    return true;
  };

  useImperativeHandle(ref, () => ({
    submit,
  }));

  useEffect(() => {
    if (currentSectionIndex === 5) {
      const timer = setTimeout(() => firstInputRef.current.focus(), 500);

      return () => clearTimeout(timer);
    }
  }, [currentSectionIndex]);

  return (
    <>
      <Checkbox
        ref={firstInputRef}
        id="trainingAttended"
        label="Training Attended?"
        value={trainingAttendedValue}
        changeHandler={trainingAttendedChange}
        blurHandler={trainingAttendedBlur}
        helperText="(Considered no by default)"
        extraClass={classes.fullInputWidth}
        isRequired
      />

      <div className={classes.professionRow}>
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
          extraClass={classes.halfInputWidth}
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
          extraClass={classes.halfInputWidth}
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

      {!isFresher && (
        <ListAdd
          label="Any references?"
          itemLabels={{
            name: "Reference Name",
            phone: "Reference Phone",
            email: "Reference Email",
            designation: "Designation",
            company: "Company",
          }}
          helperText="(two references are mandatory)"
          mandatoryItems={2}
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
      )}
    </>
  );
});

Profession.displayName = "FormProfession";
export default Profession;
