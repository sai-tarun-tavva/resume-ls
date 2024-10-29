import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import FormProgress from "../FormProgress";
import FormSection from "../FormSection";
import FormActions from "../FormActions";
import IconToggler from "../../../Atoms/components/IconToggler";
import { inputActions } from "../../store";
import { ROUTES } from "../../../../constants";
import classes from "./index.module.scss";

const Form = () => {
  const dispatch = useDispatch();
  const routeLocation = useLocation();
  const isInNewRoute = routeLocation.pathname.endsWith(
    ROUTES.ONBOARD.CANDIDATE_FORM.NEW
  );
  const { currentSectionIndex: current, isEditMode } = useSelector(
    (state) => state.input
  );

  useEffect(() => {
    if (isInNewRoute) dispatch(inputActions.enableEditMode());
  }, [isInNewRoute, dispatch]);

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

  const previousClickHandler = (event) => {
    event.preventDefault();
    dispatch(inputActions.decrementCurrentSectionIndex());
  };

  const nextClickHandler = async (event) => {
    event.preventDefault();

    if (current === 0) {
      onboardingRef.current?.submit?.();
    } else if (current === 1) {
      personalRef.current?.submit?.();
    } else if (current === 2) {
      locationRef.current?.submit?.();
    } else if (current === 3) {
      relocationRef.current?.submit?.();
    } else if (current === 4) {
      educationRef.current?.submit?.();
    } else if (current === 5) {
      professionRef.current?.submit?.();
    } else if (current === 6) {
      offerLetterRef.current?.submit?.();
    } else if (current === 7) {
      usTravelAndStayRef.current?.submit?.();
    } else if (current === 8) {
      emergencyContactsRef.current?.submit?.();
    } else if (current === 9) {
      miscellaneousRef.current?.submit?.();
    }
  };

  const toggleHandler = () => {
    const action = isEditMode
      ? inputActions.enableViewMode
      : inputActions.enableEditMode;
    dispatch(action());
  };

  return (
    <div className={classes.formContainer}>
      <FormProgress currentSectionIndex={current} />
      {!isInNewRoute && (
        <IconToggler
          toggleMode={isEditMode}
          clickHandler={toggleHandler}
          primaryIcon={<i className="bi bi-eye" />}
          secondaryIcon={<i className="bi bi-pencil" />}
        />
      )}
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
