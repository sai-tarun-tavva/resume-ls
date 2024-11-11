import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import FormProgress from "../FormProgress";
import FormSection from "../FormSection";
import FormActions from "../FormActions";
import IconToggler from "../../../Atoms/components/IconToggler";
import { useLoading, useStatus, useUI } from "../../../../store";
import { inputActions } from "../../store";
import {
  addOnboardCandidate,
  dispatchAsync,
  updateOnboardCandidate,
} from "../../../../utilities";
import { CONTENT, ROUTES, STATUS_CODES } from "../../../../constants";
import classes from "./index.module.scss";

/**
 * Form Component
 *
 * This component represents the entire form for onboarding a candidate. It manages
 * form sections, validates each section's input, handles submission, and navigates
 * between sections while updating the Redux store accordingly.
 *
 * @component
 * @returns {JSX.Element} The rendered Form component.
 */
const Form = () => {
  const dispatch = useDispatch();
  const routeLocation = useLocation();
  const navigate = useNavigate();
  const { updateStatus, resetStatus } = useStatus();
  const { enableButtonLoading, disableButtonLoading } = useLoading();
  const { enableRefetch } = useUI();
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

  /**
   * Effect for handling the edit mode based on the route
   */
  useEffect(() => {
    if (isInNewRoute) dispatch(inputActions.enableEditMode());
    else dispatch(inputActions.enableViewMode());
  }, [isInNewRoute, dispatch]);

  /**
   * Redirect to the not found page if the view route is accessed directly.
   */
  useEffect(() => {
    if (!data.record.id && !isInNewRoute)
      navigate(ROUTES.COMMON.NOT_FOUND, {
        state: { from: routeLocation.pathname },
      });
  }, [data.record.id, navigate, isInNewRoute, routeLocation]);

  /**
   * Handle candidate update or addition
   */
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
        if (isInNewRoute) {
          if (current < 9)
            dispatch(inputActions.incrementCurrentSectionIndex());
          else {
            updateStatus({
              message: "Successfully added new candidate details!",
              type: "success",
            });
            enableRefetch();
            navigate("..");
          }
        } else
          updateStatus({
            message: "Successfully updated candidate details!",
            type: "success",
          });
      }

      dispatch(inputActions.disableFormSectionSubmission());
      disableButtonLoading();
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
    enableRefetch,
    current,
  ]);

  // Refs for each form section
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

  /**
   * Previous button click handler
   * Navigates to the previous section of the form
   */
  const previousClickHandler = (event) => {
    event.preventDefault();
    dispatch(inputActions.decrementCurrentSectionIndex());
  };

  /**
   * Next button click handler
   * Submits the current section and navigates to the next section
   */
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

  /**
   * Toggle between edit mode and view mode
   */
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
