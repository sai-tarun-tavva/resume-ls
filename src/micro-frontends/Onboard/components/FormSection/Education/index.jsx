import { forwardRef, useImperativeHandle, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputV2 from "../../../../Atoms/components/Inputs/InputV2";
import Address from "../Address";
import { useInput } from "../../../../Atoms/hooks";
import { inputActions } from "../../../store";
import {
  onboardingValidations,
  transformPhoneNumber,
} from "../../../../../utilities";
import { SECTIONS, FIELDS } from "../../../constants";
import classes from "./index.module.scss";

const Education = forwardRef((_, ref) => {
  const dispatch = useDispatch();
  const {
    data: {
      education: {
        sevisID,
        dso: { name: dsoName, email: dsoEmail, phone: dsoPhone },
        graduatedUniversity: {
          name: universityName,
          address: universityAddress,
          passedMonthAndYear,
          stream,
          //   additionalCertifications,
        },
      },
    },
  } = useSelector((state) => state.input);
  const addressRef = useRef();

  const { education: validations } = onboardingValidations;

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
  } = useInput(dsoPhone, validations.dsoPhone, transformPhoneNumber, true);

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

  const noErrors = allErrors.every((error) => !error);
  const allValuesPresent = allValues.every((value) => value);

  const isSectionValid = noErrors && allValuesPresent;

  const forceValidations = () => {
    forceSevisIDValidations();
    forceDSONameValidations();
    forceDSOEmailValidations();
    forceDSOPhoneValidations();
    forceUniversityNameValidations();
    forcePassedMonthAndYearValidations();
    forceStreamValidations();
  };

  const submit = () => {
    const { isAddressValid, address } = addressRef.current?.submit?.(); // Check if Address is valid

    if (!isSectionValid || !isAddressValid) {
      forceValidations();
      addressRef.current?.forceValidations(); // Force Address validation
      return false;
    }

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
          [FIELDS.EDUCATION.DSO.PHONE]: dsoPhoneValue,
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
        },
      })
    );

    return true;
  };

  // Expose submit method to parent via ref
  useImperativeHandle(ref, () => ({
    submit,
  }));

  return (
    <>
      <div className={classes.educationRow}>
        <InputV2
          id="sevisID"
          label="SEVIS ID"
          value={sevisIDValue}
          changeHandler={sevisIDChange}
          blurHandler={sevisIDBlur}
          focusHandler={sevisIDFocus}
          error={sevisIDError}
          isFocused={isSevisIDFocused}
          extraClass={classes.halfInputWidth}
          isRequired
        />

        <InputV2
          id="dsoName"
          label="DSO Name"
          value={dsoNameValue}
          changeHandler={dsoNameChange}
          blurHandler={dsoNameBlur}
          focusHandler={dsoNameFocus}
          error={dsoNameError}
          isFocused={isDSONameFocused}
          extraClass={classes.halfInputWidth}
          isRequired
        />
      </div>

      <div className={classes.educationRow}>
        <InputV2
          id="dsoEmail"
          label="DSO Email"
          type="email"
          value={dsoEmailValue}
          changeHandler={dsoEmailChange}
          blurHandler={dsoEmailBlur}
          focusHandler={dsoEmailFocus}
          error={dsoEmailError}
          isFocused={isDSOEmailFocused}
          extraClass={classes.halfInputWidth}
          isRequired
        />

        <InputV2
          id="dsoPhone"
          label="DSO Phone"
          type="tel"
          value={dsoPhoneValue}
          changeHandler={dsoPhoneChange}
          blurHandler={dsoPhoneBlur}
          focusHandler={dsoPhoneFocus}
          error={dsoPhoneError}
          isFocused={isDSOPhoneFocused}
          extraClass={classes.halfInputWidth}
          isRequired
        />
      </div>

      <div className={classes.educationRow}>
        <InputV2
          id="graduatedUniversityName"
          label="Graduated University Name"
          value={universityNameValue}
          changeHandler={universityNameChange}
          blurHandler={universityNameBlur}
          focusHandler={universityNameFocus}
          error={universityNameError}
          isFocused={isUniversityNameFocused}
          extraClass={classes.halfInputWidth}
          isRequired
        />

        <InputV2
          id="graduatedUniversityPassedMonthAndYear"
          label="Passed month and year"
          type="month"
          value={passedMonthAndYearValue}
          changeHandler={passedMonthAndYearChange}
          blurHandler={passedMonthAndYearBlur}
          focusHandler={passedMonthAndYearFocus}
          error={passedMonthAndYearError}
          isFocused={isPassedMonthAndYearFocused}
          extraClass={classes.halfInputWidth}
          isRequired
        />
      </div>

      <InputV2
        id="graduatedUniversityStream"
        label="Stream"
        value={streamValue}
        changeHandler={streamChange}
        blurHandler={streamBlur}
        focusHandler={streamFocus}
        error={streamError}
        isFocused={isStreamFocused}
        extraClass={classes.fullInputWidth}
        isRequired
      />
      <Address
        heading="University Address"
        defaultValues={universityAddress}
        id="university"
        ref={addressRef}
      />
    </>
  );
});

Education.displayName = "FormEducation";
export default Education;
