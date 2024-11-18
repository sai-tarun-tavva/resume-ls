import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Atoms/components/Loader";
import NoRecords from "../../../Atoms/components/NoRecords";
import TimestampDisplay from "../../../Atoms/components/TimestampDisplay";
import FloatingButton from "../../../Atoms/components/FloatingButton";
import Select from "../../../Atoms/components/Inputs/Select";
import Checkbox from "../../../Atoms/components/Inputs/Checkbox";
import Button from "../../../Atoms/components/Button";
import Tooltip from "../../../Atoms/components/Tooltip";
import StatusUpdateConfirmation from "../StatusUpdateConfirmation";
import { useInput } from "../../../Atoms/hooks";
import { useLoading, useStatus, useUI } from "../../../../store";
import { dataActions, inputActions } from "../../store";
import {
  buildFetchCandidatesUrl,
  convertDate,
  dispatchAsync,
  fetchCandidateById,
  fetchOnboardCandidates,
  getExperienceDisplayText,
  getLabelByValue,
  getStatusesAsJoinedString,
  getValueByLabel,
  highlightText,
  replaceRouteParam,
  transformPhoneNumber,
  updateCandidateStatus,
} from "../../../../utilities";
import {
  ONBOARD,
  END_POINTS,
  ROUTES,
  LOADING_ACTION_TYPES,
  STATUS_CODES,
  CONTENT,
} from "../../../../constants";
import { ONBOARDING_STATUS_VALUES, OPTIONS } from "../../constants";
import classes from "./index.module.scss";

// Variable to manage the initial fetch status
let isInitial = true;

const initialEditStatus = { id: null, status: "" };

const { APP, BUTTON } = LOADING_ACTION_TYPES;
const { columnHeaders, noCandidates } = CONTENT.ONBOARD.candidates;

/**
 * OnboardCandidates Component
 *
 * Fetches and displays a list of onboarded candidates. Handles fetching, displaying, searching,
 * and navigating to candidate details. Displays a loading state if data is being fetched, and renders
 * a no records message if no candidates are found.
 *
 * @component
 * @returns {JSX.Element} The rendered OnboardCandidates component.
 */
const OnboardCandidates = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { candidates } = useSelector((state) => state.data);
  const {
    state: { refetch, refetchURL, searchTerm, selectedStatuses },
    enableRefetch,
    disableRefetch,
    updateRefetchURL,
    updatePagination,
    updateSelectedStatuses,
  } = useUI();

  const {
    isLoading,
    enableAppLoading,
    disableAppLoading,
    enableButtonLoading,
    disableButtonLoading,
  } = useLoading();
  const { updateStatus, resetStatus } = useStatus();

  const [editStatus, setEditStatus] = useState(initialEditStatus);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isDetailsProvided, setIsDetailsProvided] = useState(null);

  const {
    value: statusValue,
    handleInputChange: statusChange,
    handleInputBlur: statusBlur,
    handleInputFocus: statusFocus,
    isFocused: isStatusFocused,
    resetValue: resetStatusValue,
  } = useInput(editStatus.status || ONBOARDING_STATUS_VALUES.IN_PROGRESS);

  /**
   * Toggles the status filter for a given status.
   *
   * @param {string} status - The status value to toggle in the selectedStatuses state.
   */
  const toggleStatusFilter = (status) => {
    updateSelectedStatuses(status);
  };

  /**
   * Resets the component's state related to editing and status update modals.
   *
   * Clears the edit status, closes the modal, and resets the input field values.
   */
  const resetStates = () => {
    setEditStatus(initialEditStatus);
    setIsStatusModalOpen(false);
    setIsDetailsProvided(null);
    resetStatusValue();
  };

  /**
   * Updates the onboarding status of a candidate and shows a success or failure message based on the outcome.
   *
   * @async
   * @function
   * @param {number} id - The ID of the candidate to update.
   * @param {string} statusLabel - The new status label to set for the candidate.
   */
  const updateOnboardingStatus = async (id, statusLabel) => {
    enableButtonLoading();
    await dispatchAsync(resetStatus);

    const url = replaceRouteParam(END_POINTS.ONBOARD.UPDATE_STATUS, { id });

    const { status, response } = await updateCandidateStatus(url, {
      onboarding: { status: statusLabel },
    });

    if (status === STATUS_CODES.SUCCESS) {
      if (
        getValueByLabel(OPTIONS.ONBOARDING_STATUS, statusLabel) ===
        ONBOARDING_STATUS_VALUES.COMPLETED
      ) {
        enableRefetch();
        resetStates();
        updateStatus({
          message:
            CONTENT.ONBOARD.statusMessages.form.success_update_status_completed,
          type: "success",
          darkMode: true,
        });
      } else {
        dispatch(dataActions.replaceCandidate(response?.data));
        resetStates();
        updateStatus({
          message: CONTENT.ONBOARD.statusMessages.form.success_update_status,
          type: "success",
          darkMode: true,
        });
      }
    } else if (status === STATUS_CODES.INVALID) {
      // If required details are not provided, show warning
      setIsStatusModalOpen(true);
      setIsDetailsProvided(false);
    } else {
      updateStatus({
        message: CONTENT.ONBOARD.statusMessages.form.failure,
        type: "failure",
        darkMode: true,
      });
    }

    disableButtonLoading();
  };

  /**
   * Handles the click event for applying the status filter.
   *
   * Builds the refetch URL with selected statuses and triggers a data refetch.
   */
  const handleStatusFilterClick = () => {
    enableRefetch();
    updateRefetchURL(
      buildFetchCandidatesUrl(
        END_POINTS.ONBOARD.FETCH_CANDIDATES,
        ONBOARD.CANDIDATES_PER_PAGE,
        "",
        searchTerm,
        getStatusesAsJoinedString(OPTIONS.ONBOARDING_STATUS, selectedStatuses)
      )
    );
  };

  /**
   * Redirects the user to the candidate edit page.
   *
   * @param {number} id - The ID of the candidate to edit.
   */
  const redirectToEdit = (id) => {
    resetStates();
    handleDoubleClick(id);
  };

  /**
   * Handles the closure of the status update confirmation modal and resets related states.
   */
  const handleStatusModalClose = () => {
    resetStates();
  };

  /**
   * Handles the click event for updating a candidate's status.
   *
   * If the status is "COMPLETED," it opens the status confirmation modal.
   * Otherwise, it directly updates the status.
   *
   * @param {number} id - The ID of the candidate to update.
   * @param {string} statusValue - The new status value.
   */
  const handleUpdateStatusClick = (id, statusValue) => {
    const statusLabel = getLabelByValue(OPTIONS.ONBOARDING_STATUS, statusValue);

    updateOnboardingStatus(id, statusLabel);
  };

  /**
   * Handles the double-click event on a candidate row.
   *
   * Fetches detailed information for the selected candidate by ID and navigates to the candidate's details page.
   * Displays a loading indicator during the fetch process, and updates the app status if an error occurs.
   *
   * @async
   * @function
   * @param {number} id - The ID of the candidate to fetch details for.
   */
  const handleDoubleClick = async (id) => {
    enableAppLoading();
    const url = replaceRouteParam(END_POINTS.ONBOARD.FETCH_CANDIDATE, { id });

    const { status, data: candidate } = await fetchCandidateById(url);

    if (status === STATUS_CODES.SUCCESS) {
      dispatch(inputActions.replaceCandidate(candidate));
      navigate(
        replaceRouteParam(ROUTES.ONBOARD.CANDIDATE_FORM.VIEW, {
          id,
        })
      );
    } else {
      updateStatus({
        message: CONTENT.COMMON.serverError,
        type: "failure",
        darkMode: true,
      });
    }

    disableAppLoading();
  };

  /**
   * Effect to synchronize `statusValue` with the `editStatus` state when `statusValue` changes.
   */
  useEffect(() => {
    setEditStatus((prevValue) => ({ ...prevValue, status: statusValue }));
  }, [statusValue]);

  /**
   * Fetches the list of candidates when the component mounts or when refetch is triggered.
   * Updates the UI state based on the fetch result.
   */
  useEffect(() => {
    const url =
      refetchURL ||
      buildFetchCandidatesUrl(
        END_POINTS.ONBOARD.FETCH_CANDIDATES,
        ONBOARD.CANDIDATES_PER_PAGE,
        "",
        "",
        getStatusesAsJoinedString(OPTIONS.ONBOARDING_STATUS, selectedStatuses)
      );

    /**
     * Fetches candidates from the server.
     *
     * @async
     */
    const fetchCandidates = async () => {
      enableAppLoading();

      const { status, data } = await fetchOnboardCandidates(url);

      if (status === STATUS_CODES.SUCCESS) {
        const {
          count: totalCount,
          previous: previousPage,
          next: nextPage,
          results,
        } = data;

        dispatch(dataActions.replaceCandidates({ candidates: results }));
        dispatch(inputActions.resetForm());
        updatePagination({
          previousPage,
          nextPage,
          totalCount,
        });
      } else {
        updateStatus({
          message: CONTENT.COMMON.serverError,
          type: "failure",
          darkMode: true,
        });
      }
      disableAppLoading();
    };

    // Fetch candidates if it's the initial load or refetch is triggered
    if (isInitial || refetch) {
      isInitial = false;
      setEditStatus(initialEditStatus);
      fetchCandidates();
      disableRefetch();
    }
  }, [
    dispatch,
    enableAppLoading,
    disableAppLoading,
    refetch,
    refetchURL,
    selectedStatuses,
    disableRefetch,
    updatePagination,
    updateStatus,
    setEditStatus,
  ]);

  return (
    <>
      {isStatusModalOpen && (
        <StatusUpdateConfirmation
          isDetailsProvided={isDetailsProvided}
          handleClose={handleStatusModalClose}
          handleEdit={() =>
            isDetailsProvided === false
              ? redirectToEdit(editStatus.id)
              : updateOnboardingStatus(
                  editStatus.id,
                  getLabelByValue(OPTIONS.ONBOARDING_STATUS, editStatus.status)
                )
          }
        />
      )}
      <div className={classes.tableContainer}>
        {isLoading[APP] ? (
          <Loader /> // Show loader if data is being fetched
        ) : (
          <table className={classes.table}>
            {/* Table headers */}
            <thead>
              <tr>
                <th title={columnHeaders.status} style={{ width: "10rem" }}>
                  {columnHeaders.status}
                  <Tooltip
                    extraClass={classes.tooltipExtraClass}
                    baseContentToHover={
                      <i
                        className={`bi bi-caret-down-fill ${classes.filterIcon}`}
                      />
                    }
                  >
                    <div className={classes.statusDropdown}>
                      <div>
                        {OPTIONS.ONBOARDING_STATUS.map(({ value, label }) => (
                          <div key={value} className={classes.label}>
                            <Checkbox
                              id={value}
                              label=""
                              checked={selectedStatuses[value]}
                              value={selectedStatuses[value]}
                              changeHandler={() => toggleStatusFilter(value)}
                              extraClass={classes.checkboxExtraClass}
                            />
                            {label}
                          </div>
                        ))}
                      </div>
                      <span onClick={handleStatusFilterClick}>Apply</span>
                    </div>
                  </Tooltip>
                </th>

                <th
                  title={columnHeaders.onboardingDate}
                  style={{ width: "6rem" }}
                >
                  {columnHeaders.onboardingDate}
                </th>
                <th title={columnHeaders.name} style={{ width: "9rem" }}>
                  {columnHeaders.name}
                </th>
                <th
                  title={columnHeaders.marketingName}
                  style={{ width: "9rem" }}
                >
                  {columnHeaders.marketingName}
                </th>
                <th title={columnHeaders.technology} style={{ width: "12rem" }}>
                  {columnHeaders.technology}
                </th>
                <th title={columnHeaders.experience} style={{ width: "4rem" }}>
                  {columnHeaders.experience}
                </th>
                <th title={columnHeaders.location} style={{ width: "7rem" }}>
                  {columnHeaders.location}
                </th>
                <th title={columnHeaders.relocation} style={{ width: "4rem" }}>
                  {columnHeaders.relocation}
                </th>
                <th title={columnHeaders.visaStatus} style={{ width: "4rem" }}>
                  {columnHeaders.visaStatus}
                </th>
                <th title={columnHeaders.dob} style={{ width: "6.5rem" }}>
                  {columnHeaders.dob}
                </th>
                <th
                  title={columnHeaders.guestHouseMember}
                  style={{ width: "2rem" }}
                >
                  {columnHeaders.guestHouseMember}
                </th>
                <th
                  title={columnHeaders.referenceName}
                  style={{ width: "7rem" }}
                >
                  {columnHeaders.referenceName}
                </th>
                <th title={columnHeaders.phone} style={{ width: "8.5rem" }}>
                  {columnHeaders.phone}
                </th>
                <th title={columnHeaders.email} style={{ width: "8rem" }}>
                  {columnHeaders.email}
                </th>
                <th title={columnHeaders.position} style={{ width: "8rem" }}>
                  {columnHeaders.position}
                </th>
                <th title={columnHeaders.companyName} style={{ width: "8rem" }}>
                  {columnHeaders.companyName}
                </th>
                <th
                  title={columnHeaders.universityName}
                  style={{ width: "8rem" }}
                >
                  {columnHeaders.universityName}
                </th>
                <th title={columnHeaders.offerStatus} style={{ width: "5rem" }}>
                  {columnHeaders.offerStatus}
                </th>
                <th title={columnHeaders.remarks} style={{ width: "15rem" }}>
                  {columnHeaders.remarks}
                </th>
                <th title={columnHeaders.notes} style={{ width: "15rem" }}>
                  {columnHeaders.notes}
                </th>
                <th
                  title={columnHeaders.lastUpdated}
                  style={{ width: "19rem" }}
                >
                  {columnHeaders.lastUpdated}
                </th>
              </tr>
            </thead>

            {/* Table body displaying candidate data */}
            {candidates.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan="21" className={classes.noRecordContainer}>
                    <NoRecords />
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {candidates && candidates.length > 0 ? (
                  candidates.map((candidate, index) => {
                    const {
                      id: candidateId,
                      updated_at: updatedTime,
                      additional_info: candidateInfo,
                    } = candidate;
                    return (
                      <tr
                        key={index}
                        onDoubleClick={() => handleDoubleClick(candidateId)}
                      >
                        <td>
                          {editStatus.id === candidateId ? (
                            <>
                              <Select
                                id="edit-status"
                                label=""
                                value={statusValue}
                                options={OPTIONS.ONBOARDING_STATUS}
                                changeHandler={statusChange}
                                blurHandler={statusBlur}
                                focusHandler={statusFocus}
                                isFocused={isStatusFocused}
                                extraClass={classes.editStatusSelect}
                                version="version-1"
                              />
                              {isLoading[BUTTON] ? (
                                <Loader
                                  extraClass={classes.extraLoaderContainer}
                                />
                              ) : (
                                <Button className={classes.editStatusButton}>
                                  <i
                                    className={"bi bi-floppy"}
                                    onClick={() =>
                                      handleUpdateStatusClick(
                                        candidateId,
                                        statusValue
                                      )
                                    }
                                    onMouseEnter={(e) =>
                                      e.currentTarget.classList.replace(
                                        "bi-floppy",
                                        "bi-floppy-fill"
                                      )
                                    }
                                    onMouseLeave={(e) =>
                                      e.currentTarget.classList.replace(
                                        "bi-floppy-fill",
                                        "bi-floppy"
                                      )
                                    }
                                  />
                                </Button>
                              )}
                            </>
                          ) : (
                            <>
                              <div
                                className={
                                  classes[
                                    `status-${candidateInfo?.onboarding?.status
                                      .replace(/\s+/g, "")
                                      .toLowerCase()}`
                                  ]
                                }
                                title={candidateInfo?.onboarding?.status}
                              >
                                {highlightText(
                                  candidateInfo?.onboarding?.status,
                                  searchTerm
                                )}
                              </div>
                              <Button className={classes.editStatusButton}>
                                <i
                                  className={"bi bi-pencil"}
                                  onClick={() =>
                                    setEditStatus({
                                      id: candidateId,
                                      status: getValueByLabel(
                                        OPTIONS.ONBOARDING_STATUS,
                                        candidateInfo?.onboarding?.status
                                      ),
                                    })
                                  }
                                  onMouseEnter={(e) =>
                                    e.currentTarget.classList.replace(
                                      "bi-pencil",
                                      "bi-pencil-fill"
                                    )
                                  }
                                  onMouseLeave={(e) =>
                                    e.currentTarget.classList.replace(
                                      "bi-pencil-fill",
                                      "bi-pencil"
                                    )
                                  }
                                />
                              </Button>
                            </>
                          )}
                        </td>
                        <td title={candidateInfo?.onboarding?.date}>
                          {convertDate(candidateInfo?.onboarding?.date, false)}
                        </td>
                        <td
                          title={`${candidateInfo?.personal?.firstName}${
                            candidateInfo?.personal?.lastName
                              ? `, ${candidateInfo?.personal?.lastName}`
                              : ""
                          }`}
                        >
                          {highlightText(
                            `${candidateInfo?.personal?.firstName}${
                              candidateInfo?.personal?.lastName
                                ? `, ${candidateInfo?.personal?.lastName}`
                                : ""
                            }`,
                            searchTerm
                          )}
                        </td>
                        <td title={candidateInfo?.offerLetter?.marketingName}>
                          {candidateInfo?.offerLetter?.marketingName}
                        </td>
                        <td
                          title={candidateInfo?.profession?.technologiesKnown?.join(
                            ", "
                          )}
                        >
                          {highlightText(
                            candidateInfo?.profession?.technologiesKnown?.join(
                              ", "
                            ),
                            searchTerm
                          )}
                        </td>
                        <td
                          title={getExperienceDisplayText(
                            candidateInfo?.profession?.experience?.years,
                            candidateInfo?.profession?.experience?.months
                          )}
                        >
                          {getExperienceDisplayText(
                            candidateInfo?.profession?.experience?.years,
                            candidateInfo?.profession?.experience?.months
                          )}
                        </td>
                        <td
                          title={
                            candidateInfo?.location?.usaLocation?.city
                              ? `${candidateInfo?.location?.usaLocation?.city}, ${candidateInfo?.location?.usaLocation?.state}`
                              : ""
                          }
                        >
                          {highlightText(
                            candidateInfo?.location?.usaLocation?.city
                              ? `${candidateInfo?.location?.usaLocation?.city}, ${candidateInfo?.location?.usaLocation?.state}`
                              : "",
                            searchTerm
                          )}
                        </td>
                        <td title={candidateInfo?.relocation?.interested}>
                          {candidateInfo?.relocation?.interested}
                        </td>
                        <td title={candidateInfo?.personal?.visaStatus}>
                          {highlightText(
                            candidateInfo?.personal?.visaStatus,
                            searchTerm
                          )}
                        </td>
                        <td title={candidateInfo?.personal?.dob}>
                          {convertDate(candidateInfo?.personal?.dob, false)}
                        </td>
                        <td
                          title={
                            candidateInfo?.relocation?.preference ===
                            "guestHouse"
                              ? "Yes"
                              : "No"
                          }
                        >
                          {candidateInfo?.relocation?.preference ===
                          "guestHouse"
                            ? "Yes"
                            : "No"}
                        </td>
                        <td title={candidateInfo?.personal?.referenceName}>
                          {highlightText(
                            candidateInfo?.personal?.referenceName,
                            searchTerm
                          )}
                        </td>
                        <td
                          title={transformPhoneNumber(
                            candidateInfo?.personal?.phoneNumber,
                            true
                          )}
                        >
                          {highlightText(
                            transformPhoneNumber(
                              candidateInfo?.personal?.phoneNumber,
                              true
                            ),
                            searchTerm
                          )}
                        </td>
                        <td title={candidateInfo?.personal?.emailId}>
                          {highlightText(
                            candidateInfo?.personal?.emailId,
                            searchTerm
                          )}
                        </td>
                        <td title={candidateInfo?.offerLetter?.designation}>
                          {candidateInfo?.offerLetter?.designation}
                        </td>
                        <td
                          title={
                            candidateInfo?.profession?.previousExperience?.[0]
                              ?.employerName
                          }
                        >
                          {
                            candidateInfo?.profession?.previousExperience?.[0]
                              ?.employerName
                          }
                        </td>
                        <td
                          title={
                            candidateInfo?.education?.universities?.[0]
                              ?.universityName
                          }
                        >
                          {
                            candidateInfo?.education?.universities?.[0]
                              ?.universityName
                          }
                        </td>
                        <td
                          title={getLabelByValue(
                            OPTIONS.OFFER_LETTER_STATUS,
                            candidateInfo?.offerLetter?.status
                          )}
                        >
                          {getLabelByValue(
                            OPTIONS.OFFER_LETTER_STATUS,
                            candidateInfo?.offerLetter?.status
                          )}
                        </td>
                        <td title={candidateInfo?.miscellaneous?.remarks}>
                          {candidateInfo?.miscellaneous?.remarks}
                        </td>
                        <td title={candidateInfo?.miscellaneous?.notes}>
                          {candidateInfo?.miscellaneous?.notes}
                        </td>
                        <td title={convertDate(updatedTime)}>
                          <TimestampDisplay timestamp={updatedTime} />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="21">{noCandidates}</td>
                  </tr>
                )}
              </tbody>
            )}
          </table>
        )}
      </div>

      {/* Floating button to onboard a new candidate */}
      <FloatingButton
        clickHandler={() => {
          dispatch(inputActions.resetForm());
          navigate(`${ROUTES.ONBOARD.CANDIDATE_FORM.NEW}`);
        }}
        title={"Onboard new candidate"}
        icon={<i className="bi bi-person-plus" />}
      />
    </>
  );
};

OnboardCandidates.displayName = "OnboardCandidates";
export default OnboardCandidates;
