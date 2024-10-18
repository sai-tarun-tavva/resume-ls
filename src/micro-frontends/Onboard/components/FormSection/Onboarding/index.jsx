import { useDispatch, useSelector } from "react-redux";
import FormActions from "../../FormActions";
import InputV2 from "../../../../Atoms/components/Inputs/InputV2";
import Select from "../../../../Atoms/components/Inputs/Select";
import { useInput } from "../../../../Atoms/hooks";
import { inputActions } from "../../../store";
import { onboardingValidations } from "../../../../../utilities";
import { SECTIONS, FIELDS } from "../../../constants";
import classes from "./index.module.scss";

const Onboarding = () => {
  const dispatch = useDispatch();
  const {
    data: {
      onboarding: { date, status },
    },
  } = useSelector((state) => state.input);
  const { onboarding: validations } = onboardingValidations;

  const {
    value: dateValue,
    handleInputChange: dateChange,
    handleInputBlur: dateBlur,
    handleInputFocus: dateFocus,
    error: dateError,
    isFocused: isDateFocused,
  } = useInput(date, validations.date);

  const {
    value: statusValue,
    handleInputChange: statusChange,
    handleInputBlur: statusBlur,
    handleInputFocus: statusFocus,
    error: statusError,
    isFocused: isStatusFocused,
  } = useInput(status, validations.status);

  const isSectionValid = !!dateValue && !!statusValue;

  const nextClickHandler = (event) => {
    event.preventDefault();

    dispatch(
      inputActions.updateField({
        section: SECTIONS.ONBOARDING,
        field: FIELDS.ONBOARDING.DATE,
        value: dateValue,
      })
    );
    dispatch(
      inputActions.updateField({
        section: SECTIONS.ONBOARDING,
        field: FIELDS.ONBOARDING.STATUS,
        value: statusValue,
      })
    );
    dispatch(inputActions.incrementCurrentSectionIndex());
  };

  return (
    <>
      <div className={classes.onboardingContainer}>
        <InputV2
          id="onboardingDate"
          type="date"
          label="Date"
          value={dateValue}
          changeHandler={dateChange}
          blurHandler={dateBlur}
          focusHandler={dateFocus}
          error={dateError}
          isFocused={isDateFocused}
        />
        <Select
          id="onboardingStatus"
          label="Status"
          options={[
            { value: "", label: "" },
            { value: "inProgress", label: "In Progress" },
            { value: "started", label: "Started" },
          ]}
          value={statusValue}
          changeHandler={statusChange}
          blurHandler={statusBlur}
          focusHandler={statusFocus}
          error={statusError}
          isFocused={isStatusFocused}
        />
      </div>
      <FormActions
        isNextDisabled={!isSectionValid}
        nextHandler={nextClickHandler}
      />
    </>
  );
};

Onboarding.displayName = "FormOnboarding";
export default Onboarding;
