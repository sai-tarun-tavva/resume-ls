import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Table from "../../../Atoms/components/Table";
import Select from "../../../Atoms/components/Inputs/Select";
import Button from "../../../Atoms/components/Button";
import Loader from "../../../Atoms/components/Loader";
import FloatingButton from "../../../Atoms/components/FloatingButton";
import TimestampDisplay from "../../../Atoms/components/TimestampDisplay";
import HistorySideBar from "../../../Atoms/components/HistorySideBar";
import StatusUpdateConfirmation from "../StatusUpdateConfirmation";
import { useInput } from "../../../Atoms/hooks";
import { useLoading, useStatus, useUI } from "../../../../store";
import { dataActions, inputActions } from "../../store";
import {
  buildFetchCandidatesUrl,
  convertDate,
  dispatchAsync,
  exportToExcel,
  fetchFormRecordById,
  fetchFormRecords,
  getEmptyRows,
  getExperienceDisplayText,
  getLabelByValue,
  getStatusesAsJoinedString,
  getValueByLabel,
  highlightText,
  replaceRouteParam,
  transformPhoneNumber,
  updateFormRecordStatus,
} from "../../../../utilities";
import {
  ONBOARD,
  END_POINTS,
  ROUTES,
  LOADING_ACTION_TYPES,
  STATUS_CODES,
  CONTENT,
  PAGES,
} from "../../../../constants";
import { ONBOARDING_STATUS_VALUES, OPTIONS } from "../../constants";
import classes from "./index.module.scss";

// Variable to manage the initial fetch status
let isInitial = true;

const { BUTTON } = LOADING_ACTION_TYPES;

const initialEditStatus = { id: null, status: "" };

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
    state: {
      refetch,
      refetchURL,
      searchTerm,
      selectedStatuses,
      sideBarRecordId,
    },
    enableRefetch,
    disableRefetch,
    updateRefetchURL,
    updatePagination,
    updateSelectedStatuses,
    showSideBar,
    updateSideBarRecordId,
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

  const selectedCandidate = candidates?.find(
    (candidate) => candidate.id === sideBarRecordId
  );

  /**
   * Toggles the status filter for a given status.
   *
   * @param {string} status - The status value to toggle in the selectedStatuses state.
   */
  const toggleStatusFilter = (status) => {
    updateSelectedStatuses({ tool: PAGES.ONBOARD, status });
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

    const { status, response } = await updateFormRecordStatus(url, {
      onboarding: { status: statusLabel },
    });

    if (status === STATUS_CODES.SUCCESS) {
      if (
        getValueByLabel(OPTIONS.ONBOARDING_STATUS, statusLabel) ===
        ONBOARDING_STATUS_VALUES.ONBOARDED
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
        getStatusesAsJoinedString(
          OPTIONS.ONBOARDING_STATUS,
          selectedStatuses.onboard
        )
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
   * If the status is "Onboarded," it opens the status confirmation modal.
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

    const { status, data: candidate } = await fetchFormRecordById(url);

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
   * Handles exporting the onboarded candidates' data to an Excel file.
   *
   * Prepares the worksheet data by mapping candidate information and configures column widths.
   * Triggers the export process by calling the `exportToExcel` utility function.
   */
  const handleDownloadExcel = () => {
    // Prepare data for worksheet
    const worksheetData = candidates.map((candidate) => ({
      Status: candidate.additional_info?.onboarding?.status || "Unknown",
      Date: candidate.additional_info?.onboarding?.date
        ? new Date(
            candidate.additional_info?.onboarding?.date
          ).toLocaleDateString("en-US", {
            timeZone: "UTC",
          })
        : "-",
      "Full Name":
        `${candidate.additional_info?.personal?.firstName || ""} ${
          candidate.additional_info?.personal?.lastName || ""
        }`.trim() || "-",
      "Marketing Name":
        candidate.additional_info?.offerLetter?.marketingName || "-",
      Technology:
        (candidate.additional_info?.profession?.technologiesKnown || []).join(
          ", "
        ) || "None",
      Experience: `${
        candidate.additional_info?.profession?.experience?.years || 0
      } yrs ${
        candidate.additional_info?.profession?.experience?.months || 0
      } mos`,
      City: candidate.additional_info?.location?.usaLocation?.city || "-",
      State: candidate.additional_info?.location?.usaLocation?.state || "-",
      Relocation: candidate.additional_info?.relocation?.interested || "-",
      "Visa Status": candidate.additional_info?.personal?.visaStatus || "-",
      DOB: candidate.additional_info?.personal?.dob
        ? new Date(
            candidate.additional_info?.personal?.dob
          ).toLocaleDateString()
        : "-",
      "Guest House":
        candidate.additional_info?.relocation?.preference === "guestHouse"
          ? "Yes"
          : "No",
      "Reference Name":
        candidate.additional_info?.personal?.referenceName || "-",
      Mobile: candidate.additional_info?.personal?.phoneNumber || "-",
      Email: candidate.additional_info?.personal?.emailId || "-",
      Position: candidate.additional_info?.offerLetter?.designation || "-",
      Company:
        (candidate.additional_info?.profession?.previousExperience || [])[0]
          ?.employerName || "None",
      University:
        (candidate.additional_info?.education?.universities || [])[0]
          ?.universityName || "-",
      "Offer Status": candidate.additional_info?.offerLetter?.status || "-",
      Remarks: candidate.additional_info?.miscellaneous?.remarks || "-",
      Notes: candidate.additional_info?.miscellaneous?.notes || "-",
      "Last Updated": new Date(candidate.updated_at).toLocaleString(),
    }));

    // Set column widths
    const columnWidths = {
      Status: 15,
      Date: 12,
      "Full Name": 20,
      "Marketing Name": 15,
      Technology: 30,
      Experience: 12,
      City: 15,
      State: 10,
      Relocation: 12,
      "Visa Status": 12,
      DOB: 12,
      "Guest House": 12,
      "Reference Name": 20,
      Mobile: 15,
      Email: 25,
      Position: 20,
      Company: 25,
      University: 25,
      "Offer Status": 15,
      Remarks: 30,
      Notes: 30,
      "Last Updated": 20,
    };

    exportToExcel(worksheetData, columnWidths, "Onboard");
  };

  /**
   * Handles the click event to display the history sidebar for a specific record.
   *
   * This function updates the UI state to show the sidebar and sets the record ID
   * for which the status history should be displayed.
   *
   * @param {string|number} id - The unique identifier of the record whose history is to be displayed.
   */
  const handleHistoryClick = (id) => {
    showSideBar();
    updateSideBarRecordId(id);
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
        getStatusesAsJoinedString(
          OPTIONS.ONBOARDING_STATUS,
          selectedStatuses.onboard
        )
      );

    /**
     * Fetches candidates from the server.
     *
     * @async
     */
    const fetchCandidates = async () => {
      enableAppLoading();

      const { status, data } = await fetchFormRecords(url);

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

  const TableHeader = () => (
    <>
      <th style={{ width: "6rem" }}>{columnHeaders.onboardingDate}</th>
      <th style={{ width: "9rem" }}>{columnHeaders.name}</th>
      <th style={{ width: "3rem" }}>{columnHeaders.marketingName}</th>
      <th style={{ width: "12rem" }}>{columnHeaders.technology}</th>
      <th style={{ width: "4rem" }}>{columnHeaders.experience}</th>
      <th style={{ width: "5rem" }}>{columnHeaders.city}</th>
      <th style={{ width: "3rem" }}>{columnHeaders.state}</th>
      <th style={{ width: "4rem" }}>{columnHeaders.relocation}</th>
      <th style={{ width: "4rem" }}>{columnHeaders.visaStatus}</th>
      <th style={{ width: "6.5rem" }}>{columnHeaders.dob}</th>
      <th style={{ width: "2rem" }}>{columnHeaders.guestHouseMember}</th>
      <th style={{ width: "7rem" }}>{columnHeaders.referenceName}</th>
      <th style={{ width: "8.5rem" }}>{columnHeaders.phone}</th>
      <th style={{ width: "8rem" }}>{columnHeaders.email}</th>
      <th style={{ width: "8rem" }}>{columnHeaders.position}</th>
      <th style={{ width: "8rem" }}>{columnHeaders.companyName}</th>
      <th style={{ width: "8rem" }}>{columnHeaders.universityName}</th>
      <th style={{ width: "5rem" }}>{columnHeaders.offerStatus}</th>
      <th style={{ width: "15rem" }}>{columnHeaders.remarks}</th>
      <th style={{ width: "15rem" }}>{columnHeaders.notes}</th>
      <th style={{ width: "19rem" }}>{columnHeaders.lastUpdated}</th>
    </>
  );

  const TableBody = () => (
    <tbody>
      {candidates && candidates.length > 0 ? (
        <>
          {candidates.map((candidate, index) => {
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
                        <Loader extraClass={classes.extraLoaderContainer} />
                      ) : (
                        <Button
                          className={classes.editStatusButton}
                          disabled={
                            getLabelByValue(
                              OPTIONS.ONBOARDING_STATUS,
                              statusValue
                            ) === candidateInfo?.onboarding?.status
                          }
                        >
                          <i
                            className={"bi bi-floppy"}
                            onClick={() =>
                              handleUpdateStatusClick(candidateId, statusValue)
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
                <td>{convertDate(candidateInfo?.onboarding?.date, false)}</td>
                <td>
                  {highlightText(
                    `${candidateInfo?.personal?.firstName}${
                      candidateInfo?.personal?.lastName
                        ? `, ${candidateInfo?.personal?.lastName}`
                        : ""
                    }`,
                    searchTerm
                  )}
                </td>
                <td>{candidateInfo?.offerLetter?.marketingName || "-"}</td>
                <td>
                  {highlightText(
                    candidateInfo?.profession?.technologiesKnown?.join(", ") ||
                      "None",
                    searchTerm
                  )}
                </td>
                <td>
                  {getExperienceDisplayText(
                    candidateInfo?.profession?.experience?.years,
                    candidateInfo?.profession?.experience?.months
                  )}
                </td>
                <td>
                  {highlightText(
                    candidateInfo?.location?.usaLocation?.city,
                    searchTerm
                  )}
                </td>
                <td>
                  {highlightText(
                    candidateInfo?.location?.usaLocation?.state,
                    searchTerm
                  )}
                </td>
                <td>{candidateInfo?.relocation?.interested}</td>
                <td>
                  {highlightText(
                    candidateInfo?.personal?.visaStatus,
                    searchTerm
                  )}
                </td>
                <td>{candidateInfo?.personal?.dob}</td>
                <td>
                  {candidateInfo?.relocation?.preference === "guestHouse"
                    ? "Yes"
                    : "No"}
                </td>
                <td>
                  {highlightText(
                    candidateInfo?.personal?.referenceName,
                    searchTerm
                  )}
                </td>
                <td>
                  {highlightText(
                    transformPhoneNumber(
                      candidateInfo?.personal?.phoneNumber,
                      true
                    ),
                    searchTerm
                  )}
                </td>
                <td>
                  {highlightText(candidateInfo?.personal?.emailId, searchTerm)}
                </td>
                <td>{candidateInfo?.offerLetter?.designation || "-"}</td>
                <td>
                  {candidateInfo?.profession?.previousExperience?.[0]
                    ?.employerName || "None"}
                </td>
                <td>
                  {candidateInfo?.education?.universities?.[0]?.universityName}
                </td>
                <td>
                  {getLabelByValue(
                    OPTIONS.OFFER_LETTER_STATUS,
                    candidateInfo?.offerLetter?.status
                  )}
                </td>
                <td>{candidateInfo?.miscellaneous?.remarks}</td>
                <td>{candidateInfo?.miscellaneous?.notes}</td>
                <td>
                  <TimestampDisplay timestamp={updatedTime} />
                </td>

                <td
                  className={classes.historyIcon}
                  onClick={() => handleHistoryClick(candidateId)}
                >
                  <i className="bi bi-clock-history" />
                </td>
              </tr>
            );
          })}
          {ONBOARD.CANDIDATES_PER_PAGE - candidates.length > 0 &&
            getEmptyRows(ONBOARD.CANDIDATES_PER_PAGE - candidates.length, 21)}
        </>
      ) : (
        <tr>
          <td colSpan="21">{noCandidates}</td>
        </tr>
      )}
    </tbody>
  );

  return (
    <>
      {isStatusModalOpen && (
        <StatusUpdateConfirmation
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
      <HistorySideBar
        candidateName={`${selectedCandidate?.firstname || ""} ${
          selectedCandidate?.lastname || ""
        }`}
        historyList={selectedCandidate?.history || []}
      />
      <Table
        statusFilterOptions={OPTIONS.ONBOARDING_STATUS}
        TableHeader={TableHeader}
        TableBody={TableBody}
        rowsLength={candidates.length}
        handleStatusFilterClick={handleStatusFilterClick}
        toggleStatusFilter={toggleStatusFilter}
        selectedStatuses={selectedStatuses.onboard}
      />

      {/* Floating button to export data as an excel sheet */}
      <FloatingButton
        clickHandler={handleDownloadExcel}
        title={"Export data as an excel sheet"}
        icon={
          <i
            style={{ WebkitTextStroke: "0.03rem" }}
            className="bi bi-filetype-xlsx"
          />
        }
        extraClass={classes.exportExcelButton}
      />

      {/* Floating button to onboard a new candidate */}
      <FloatingButton
        clickHandler={() => {
          dispatch(inputActions.resetForm());
          navigate(`${ROUTES.ONBOARD.CANDIDATE_FORM.NEW}`);
        }}
        title={"Onboard new candidate"}
        icon={
          <i
            style={{ WebkitTextStroke: "0.03rem" }}
            className="bi bi-person-plus"
          />
        }
      />
    </>
  );
};

OnboardCandidates.displayName = "OnboardCandidates";
export default OnboardCandidates;
