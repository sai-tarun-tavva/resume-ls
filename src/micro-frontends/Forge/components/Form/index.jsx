import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import IconToggler from "../../../Atoms/components/IconToggler";
import FormProgress from "../../../Atoms/components/FormProgress";
import FormSections from "../../../Atoms/components/FormSections";
import FormActions from "../../../Atoms/components/FormActions";
import Submission from "../FormSections/Submission";
import Candidate from "../FormSections/Candidate";
import Requirement from "../FormSections/Requirement";
import Vendor from "../FormSections/Vendor";
import Employer from "../FormSections/Employer";
import Miscellaneous from "../FormSections/Miscellaneous";
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
import { SECTION_TITLES } from "../../constants";
import classes from "./index.module.scss";

/**
 * Form Component
 *
 * This component represents the entire form for adding a sales or recruit record. It manages
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
  const isInNewRoute = routeLocation.pathname.endsWith("new");

  const {
    currentSectionIndex: current,
    isEditMode,
    shouldSubmitFormSection,
    data,
  } = useSelector((state) => state.input);

  const isSales = routeLocation.pathname.includes(ROUTES.FORGE.SALES.VIEW);
  const isRecruit = routeLocation.pathname.includes(ROUTES.FORGE.RECRUIT.VIEW);

  const idRef = useRef(
    (isSales && data?.sales?.record?.id) ||
      (isRecruit && data?.recruit?.record?.id) ||
      null
  );

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
    if (
      ((isSales && !data?.sales?.record?.id) ||
        (isRecruit && !data?.recruit?.record?.id)) &&
      !isInNewRoute
    ) {
      navigate(ROUTES.COMMON.NOT_FOUND, {
        state: { from: routeLocation.pathname },
      });
    }
  }, [
    isSales,
    isRecruit,
    data?.sales?.record?.id,
    data?.recruit?.record?.id,
    navigate,
    isInNewRoute,
    routeLocation,
  ]);

  /**
   * Handle record update or addition
   */
  useEffect(() => {
    const updateRecord = async () => {
      if (!shouldSubmitFormSection) return;
      enableButtonLoading();

      await dispatchAsync(resetStatus);

      let addRecordUrl = "",
        updateRecordUrl = "",
        payloadData;

      if (isSales) {
        addRecordUrl = END_POINTS.FORGE.SALES.ADD_RECORD;
        updateRecordUrl = END_POINTS.FORGE.SALES.UPDATE_RECORD;
        payloadData = data.sales;
      } else if (isRecruit) {
        addRecordUrl = END_POINTS.FORGE.RECRUIT.ADD_RECORD;
        updateRecordUrl = END_POINTS.FORGE.RECRUIT.UPDATE_RECORD;
        payloadData = data.recruit;
      }

      const { status, apiData } = !idRef.current
        ? await addFormRecord(payloadData, addRecordUrl)
        : await updateFormRecord(payloadData, idRef.current, updateRecordUrl);

      if (!idRef.current) {
        idRef.current = apiData.additional_info.record.id;
        if (isSales)
          dispatch(inputActions.replaceSalesRecord(apiData.additional_info));
        else if (isRecruit)
          dispatch(inputActions.replaceRecruitRecord(apiData.additional_info));
      }

      if (status !== STATUS_CODES.SUCCESS) {
        updateStatus({
          message: CONTENT.FORGE.statusMessages.form.failure,
          type: "failure",
        });
      } else {
        if (isInNewRoute) {
          let sectionTitles;

          if (isSales) sectionTitles = SECTION_TITLES.SALES;
          if (isRecruit) sectionTitles = SECTION_TITLES.RECRUIT;

          if (current < sectionTitles.length - 1)
            dispatch(inputActions.incrementCurrentSectionIndex());
          else {
            updateStatus({
              message: CONTENT.FORGE.statusMessages.form.success_add,
              type: "success",
              darkMode: true,
            });
            enableRefetch();

            if (isSales)
              navigate(`/${ROUTES.FORGE.HOME}/${ROUTES.FORGE.SALES.VIEW}`);
            if (isRecruit)
              navigate(`/${ROUTES.FORGE.HOME}/${ROUTES.FORGE.RECRUIT.VIEW}`);
          }
        } else
          updateStatus({
            message: CONTENT.FORGE.statusMessages.form.success_update,
            type: "success",
          });
      }

      dispatch(inputActions.disableFormSectionSubmission());
      disableButtonLoading();
    };

    updateRecord();
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
    isSales,
    isRecruit,
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
  const submissionRef = useRef();
  const candidateRef = useRef();
  const requirementRef = useRef();
  const vendorRef = useRef();
  const employerRef = useRef();
  const miscellaneousRef = useRef();

  const sections = [
    { Component: Submission, ref: submissionRef },
    { Component: Candidate, ref: candidateRef },
    { Component: Requirement, ref: requirementRef },
    isSales && { Component: Vendor, ref: vendorRef },
    isRecruit && { Component: Employer, ref: employerRef },
    { Component: Miscellaneous, ref: miscellaneousRef },
  ].filter(Boolean);

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

    dispatch(inputActions.incrementCurrentSectionIndex());
  };

  /**
   * Next and save button click handler
   * Submits the current section and navigates to the next section
   */
  const nextAndSaveClickHandler = async (event) => {
    event.preventDefault();

    if (current === 0) {
      submissionRef.current?.submit?.();
    } else if (current === 1) {
      candidateRef.current?.submit?.();
    } else if (current === 2) {
      requirementRef.current?.submit?.();
    } else if (current === 3) {
      isSales && vendorRef.current?.submit?.();
      isRecruit && employerRef.current?.submit?.();
    } else if (current === 4) {
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
        titles={
          (isSales && SECTION_TITLES.SALES) ||
          (isRecruit && SECTION_TITLES.RECRUIT)
        }
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
          closeRedirectRoute={`/${ROUTES.FORGE.HOME}/${
            (isSales && ROUTES.FORGE.SALES.VIEW) ||
            (isRecruit && ROUTES.FORGE.RECRUIT.VIEW)
          }`}
        />
      </form>
    </div>
  );
};

Form.displayName = "Form";
export default Form;
