import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormProgress from "../FormProgress";
import FormSection from "../FormSection";
import FormActions from "../FormActions";
import { inputActions } from "../../store";
import classes from "./index.module.scss";

const Form = () => {
  const dispatch = useDispatch();
  const { currentSectionIndex: current } = useSelector((state) => state.input);

  const onboardingRef = useRef();
  const personalRef = useRef();
  const locationRef = useRef();
  const relocationRef = useRef();
  const educationRef = useRef();
  const professionRef = useRef();

  const refs = {
    onboarding: onboardingRef,
    personal: personalRef,
    location: locationRef,
    relocation: relocationRef,
    education: educationRef,
    profession: professionRef,
  };

  const previousClickHandler = (event) => {
    event.preventDefault();
    dispatch(inputActions.decrementCurrentSectionIndex());
  };

  const nextClickHandler = (event) => {
    event.preventDefault();

    // Check the current section and call the appropriate ref's submit method
    let hasSectionNoErrors = false;

    if (current === 0) {
      hasSectionNoErrors = onboardingRef.current?.submit?.();
    } else if (current === 1) {
      hasSectionNoErrors = personalRef.current?.submit?.();
    } else if (current === 2) {
      hasSectionNoErrors = locationRef.current?.submit?.();
    } else if (current === 3) {
      hasSectionNoErrors = relocationRef.current?.submit?.();
    } else if (current === 4) {
      hasSectionNoErrors = educationRef.current?.submit?.();
    } else if (current === 5) {
      hasSectionNoErrors = professionRef.current?.submit?.();
    }

    if (hasSectionNoErrors) {
      dispatch(inputActions.incrementCurrentSectionIndex());
    }
  };

  return (
    <div className={classes.formContainer}>
      <FormProgress currentSectionIndex={current} />
      <form className={classes.form}>
        <div className={classes.carouselContainer}>
          <FormSection currentSectionIndex={current} refs={refs} />
        </div>
        <FormActions
          previousHandler={previousClickHandler}
          nextHandler={nextClickHandler}
        />
      </form>
    </div>
  );
};

Form.displayName = "Form";
export default Form;
