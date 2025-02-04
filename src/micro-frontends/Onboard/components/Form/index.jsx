import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import IconToggler from "../../../Atoms/components/IconToggler";
import FormProgress from "../../../Atoms/components/FormProgress";
import FormSections from "../../../Atoms/components/FormSections";
import FormActions from "../../../Atoms/components/FormActions";
import Onboarding from "../FormSection/Onboarding";
import Personal from "../FormSection/Personal";
import Location from "../FormSection/Location";
import Relocation from "../FormSection/Relocation";
import Education from "../FormSection/Education";
import Profession from "../FormSection/Profession";
import OfferLetter from "../FormSection/OfferLetter";
import USTravelAndStay from "../FormSection/USTravelAndStay";
import EmergencyContacts from "../FormSection/EmergencyContacts";
import Miscellaneous from "../FormSection/Miscellaneous";
import { useLoading, useStatus, useUI } from "../../../../store";
import { inputActions } from "../../store";
import {
  addFormRecord,
  dispatchAsync,
  updateFormRecord,
} from "../../../../utilities";
import {
  CONTENT,
  END_POINTS,
  ROUTES,
  STATUS_CODES,
} from "../../../../constants";
import classes from "./index.module.scss";
import { SECTION_TITLES } from "../../constants";

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
        ? await addFormRecord(data, END_POINTS.ONBOARD.ADD_CANDIDATE)
        : await updateFormRecord(
            data,
            idRef.current,
            END_POINTS.ONBOARD.UPDATE_CANDIDATE
          );

      if (!idRef.current) idRef.current = apiData.id;

      if (status !== STATUS_CODES.SUCCESS) {
        updateStatus({
          message: CONTENT.ONBOARD.statusMessages.form.failure,
          type: "failure",
        });
      } else {
        if (isInNewRoute) {
          if (current < SECTION_TITLES.length - 1)
            dispatch(inputActions.incrementCurrentSectionIndex());
          else {
            updateStatus({
              message: CONTENT.ONBOARD.statusMessages.form.success_add,
              type: "success",
              darkMode: true,
            });
            enableRefetch();
            navigate("..");
          }
        } else
          updateStatus({
            message: CONTENT.ONBOARD.statusMessages.form.success_update,
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

  /**
   * Handler for section title click event.
   * Updates the current section index in the Redux store when a section is clicked.
   *
   * @param {number} index - The index of the section clicked.
   */
  const titleClickHandler = (index) => {
    // Only allow navigating to previous sections or within a new route
    if (index < current || !isInNewRoute) {
      dispatch(inputActions.updateCurrentSectionIndex(index));
    }
  };

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

  const sections = [
    { Component: Onboarding, ref: onboardingRef },
    { Component: Personal, ref: personalRef },
    { Component: Location, ref: locationRef },
    { Component: Relocation, ref: relocationRef },
    { Component: Education, ref: educationRef },
    { Component: Profession, ref: professionRef },
    { Component: OfferLetter, ref: offerLetterRef },
    { Component: USTravelAndStay, ref: usTravelAndStayRef },
    { Component: EmergencyContacts, ref: emergencyContactsRef },
    { Component: Miscellaneous, ref: miscellaneousRef },
  ];

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
   * Navigates to the next section of the form
   */
  const nextClickHandler = (event) => {
    event.preventDefault();

    // Hide sensitive fields on next in view mode
    if (current === 1) personalRef.current?.hideSensitiveFieldsOnNext?.();

    dispatch(inputActions.incrementCurrentSectionIndex());
  };

  /**
   * Next and save button click handler
   * Submits the current section and navigates to the next section
   */
  const nextAndSaveClickHandler = async (event) => {
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
      <FormProgress
        currentSectionIndex={current}
        isInNewRoute={isInNewRoute}
        titleClickHandler={titleClickHandler}
        titles={SECTION_TITLES}
      />
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
          <FormSections currentSectionIndex={current} sections={sections} />
        </div>
        <FormActions
          isInNewRoute={isInNewRoute}
          previousHandler={previousClickHandler}
          nextHandler={nextClickHandler}
          nextAndSaveHandler={nextAndSaveClickHandler}
          index={current}
          isEditMode={isEditMode}
          closeRedirectRoute={`/${ROUTES.ONBOARD.HOME}`}
        />
      </form>
    </div>
  );
};

Form.displayName = "Form";
export default Form;
