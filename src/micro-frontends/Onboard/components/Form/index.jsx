import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormProgress from "../FormProgress";
import FormSection from "../FormSection";
import FormActions from "../FormActions";
import { inputActions } from "../../store";
import classes from "./index.module.scss";
import { addOnboardCandidate } from "../../../../utilities";

const Form = () => {
  const dispatch = useDispatch();
  const { currentSectionIndex: current, data } = useSelector(
    (state) => state.input
  );

  const onboardingRef = useRef();
  const personalRef = useRef();
  const locationRef = useRef();
  const relocationRef = useRef();
  const educationRef = useRef();
  const professionRef = useRef();
  const offerLetterRef = useRef();
  const usTravelAndStayRef = useRef();
  const emergencyContactsRef = useRef();
  const miscellaneousRef = useRef();

  const refs = {
    onboarding: onboardingRef,
    personal: personalRef,
    location: locationRef,
    relocation: relocationRef,
    education: educationRef,
    profession: professionRef,
    offerLetter: offerLetterRef,
    usTravelAndStay: usTravelAndStayRef,
    emergencyContacts: emergencyContactsRef,
    miscellaneous: miscellaneousRef,
  };

  const isInitialRender = useRef(true); // Use ref to track initial render

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    const addNewCandidate = async () => {
      const newCandidate = {
        firstName: data.personal.firstName,
        lastName: data.personal.lastName,
        emailId: data.personal.emailId,
        phoneNumber: data.personal.phoneNumber,
        status: data.onboarding.status,
        review: data.miscellaneous.remarks,
        visaStatus: data.personal.visaStatus,
        additional_info: {
          other_info: data,
        },
      };

      await addOnboardCandidate(newCandidate);
    };

    addNewCandidate();
  }, [data]);

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
    } else if (current === 6) {
      hasSectionNoErrors = offerLetterRef.current?.submit?.();
    } else if (current === 7) {
      hasSectionNoErrors = usTravelAndStayRef.current?.submit?.();
    } else if (current === 8) {
      hasSectionNoErrors = emergencyContactsRef.current?.submit?.();
    } else if (current === 9) {
      hasSectionNoErrors = miscellaneousRef.current?.submit?.();
    }

    if (hasSectionNoErrors) {
      if (current < 9) dispatch(inputActions.incrementCurrentSectionIndex());
    }
  };

  return (
    <div className={classes.formContainer}>
      <FormProgress currentSectionIndex={current} />
      <form className={classes.form} onSubmit={(e) => e.preventDefault()}>
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
