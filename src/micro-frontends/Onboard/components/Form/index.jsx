import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormProgress from "../FormProgress";
import FormSection from "../FormSection";
import FormActions from "../FormActions";
import { inputActions } from "../../store";
import classes from "./index.module.scss";

const Form = () => {
  const dispatch = useDispatch();
  const { currentSectionIndex: current } = useSelector((state) => state.input);
  const formSectionRef = useRef();
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  // Use effect to update the isNextDisabled state when current section or validation changes
  useEffect(() => {
    // Check if the current section is valid using the ref
    const isSectionValid = formSectionRef.current?.isSectionValid?.();
    setIsNextDisabled(!isSectionValid); // Disable the Next button if the section is invalid
  }, [current]); // Recalculate when the current section changes

  const previousClickHandler = (event) => {
    event.preventDefault();
    dispatch(inputActions.decrementCurrentSectionIndex());
  };

  const nextClickHandler = (event) => {
    event.preventDefault();
    const hasSectionNoErrors = formSectionRef.current?.submit?.();
    if (hasSectionNoErrors) {
      dispatch(inputActions.incrementCurrentSectionIndex());
    }
  };

  return (
    <div className={classes.formContainer}>
      <FormProgress currentSectionIndex={current} />
      <form className={classes.form}>
        <div className={classes.sectionContainer}>
          <FormSection index={current} ref={formSectionRef} />
        </div>
        <FormActions
          isNextDisabled={!isNextDisabled}
          previousHandler={previousClickHandler}
          nextHandler={nextClickHandler}
        />
      </form>
    </div>
  );
};

Form.displayName = "Form";
export default Form;
