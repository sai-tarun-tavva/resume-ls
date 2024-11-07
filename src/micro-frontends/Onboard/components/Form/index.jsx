import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import FormProgress from "../FormProgress";
import FormSection from "../FormSection";
import FormActions from "../FormActions";
import IconToggler from "../../../Atoms/components/IconToggler";
import { useLoading, useStatus } from "../../../../store";
import { inputActions } from "../../store";
import {
  addOnboardCandidate,
  dispatchAsync,
  updateOnboardCandidate,
} from "../../../../utilities";
import { CONTENT, ROUTES, STATUS_CODES } from "../../../../constants";
import classes from "./index.module.scss";

const Form = () => {
  const dispatch = useDispatch();
  const routeLocation = useLocation();
  const navigate = useNavigate();
  const { updateStatus, resetStatus } = useStatus();
  const { enableButtonLoading, disableButtonLoading } = useLoading();
  const isInNewRoute = routeLocation.pathname.endsWith(
    ROUTES.ONBOARD.CANDIDATE_FORM.NEW
  );
  const {
    currentSectionIndex: current,
    isEditMode,
    shouldSubmitFormSection,
    data,
  } = useSelector((state) => state.input);
  const idRef = useRef(data.record.id || null);

  useEffect(() => {
    if (isInNewRoute) dispatch(inputActions.enableEditMode());
    else dispatch(inputActions.enableViewMode());
  }, [isInNewRoute, dispatch]);

  // Redirect to the candidates list if the view route is accessed directly because candidate details are only fetched on the candidates page, not when accessing the view route directly.
  useEffect(() => {
    if (!data.record.id && !isInNewRoute) navigate(ROUTES.ONBOARD.HOME);
  }, [data.record.id, navigate, isInNewRoute]);

  useEffect(() => {
    const updateCandidate = async () => {
      if (!shouldSubmitFormSection) return;
      enableButtonLoading();

      await dispatchAsync(resetStatus);

      const { status, apiData } = !idRef.current
        ? await addOnboardCandidate(data)
        : await updateOnboardCandidate(data, idRef.current);

      if (!idRef.current) idRef.current = apiData.id;

      if (status !== STATUS_CODES.SUCCESS) {
        updateStatus({
          message: CONTENT.COMMON.serverError,
          type: "failure",
        });
      } else {
        if (isInNewRoute) dispatch(inputActions.incrementCurrentSectionIndex());
        else
          updateStatus({
            message: "Successfully updated candidate details!",
            type: "success",
          });
      }

      dispatch(inputActions.disableFormSectionSubmission());
      disableButtonLoading();

      if (
        isInNewRoute &&
        data.miscellaneous.remarks &&
        data.miscellaneous.notes
      ) {
        updateStatus({
          message: "Successfully added new candidate details!",
          type: "success",
        });
        navigate("..");
      }
    };

    updateCandidate();
  }, [
    shouldSubmitFormSection,
    data,
    enableButtonLoading,
    disableButtonLoading,
    dispatch,
    navigate,
    isInNewRoute,
    resetStatus,
    updateStatus,
  ]);

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
      <FormProgress currentSectionIndex={current} isInNewRoute={isInNewRoute} />
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
          isInNewRoute={isInNewRoute}
          previousHandler={previousClickHandler}
          nextHandler={nextClickHandler}
        />
      </form>
    </div>
  );
};

Form.displayName = "Form";
export default Form;
