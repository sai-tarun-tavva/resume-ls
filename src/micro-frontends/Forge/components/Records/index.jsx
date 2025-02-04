import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Atoms/components/Loader";
import Select from "../../../Atoms/components/Inputs/Select";
import Button from "../../../Atoms/components/Button";
import FloatingButton from "../../../Atoms/components/FloatingButton";
import TimestampDisplay from "../../../Atoms/components/TimestampDisplay";
import Table from "../../../Atoms/components/Table";
import HistorySideBar from "../../../Atoms/components/HistorySideBar";
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
  CONTENT,
  END_POINTS,
  FORGE,
  LOADING_ACTION_TYPES,
  PAGES,
  ROUTES,
  STATUS_CODES,
} from "../../../../constants";
import { OPTIONS, SUBMISSION_STATUS_VALUES } from "../../constants";
import classes from "./index.module.scss";

// Variable to manage the initial fetch status
let isInitial = true;

const initialEditStatus = { id: null, status: "" };

const { BUTTON } = LOADING_ACTION_TYPES;

const Records = () => {
  const { updateStatus, resetStatus } = useStatus();

  const [editStatus, setEditStatus] = useState(initialEditStatus);

  const location = useLocation();
  const lastSegment = location.pathname.split("/").pop();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { records: forgeRecords } = useSelector((state) => state.data);

  const {
    isLoading,
    enableAppLoading,
    disableAppLoading,
    enableButtonLoading,
    disableButtonLoading,
  } = useLoading();

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
    value: statusValue,
    handleInputChange: statusChange,
    handleInputBlur: statusBlur,
    handleInputFocus: statusFocus,
    isFocused: isStatusFocused,
    resetValue: resetStatusValue,
  } = useInput(editStatus.status || SUBMISSION_STATUS_VALUES.SUBMITTED);

  const selectedRecord = forgeRecords?.find(
    (record) => record?.additional_info?.record?.id === sideBarRecordId
  );

  const columnHeaders = CONTENT.FORGE.records.columnHeaders;
  const noRecords = CONTENT.FORGE.records.noRecords;

  let updateRecordStatusUrl,
    fetchRecordsUrl,
    fetchRecordUrl,
    inputActionReplaceRecord,
    editRecordRoute;

  switch (lastSegment) {
    case ROUTES.FORGE.SALES.VIEW:
      updateRecordStatusUrl = END_POINTS.FORGE.SALES.UPDATE_RECORD_STATUS;
      fetchRecordsUrl = END_POINTS.FORGE.SALES.FETCH_RECORDS;
      fetchRecordUrl = END_POINTS.FORGE.SALES.FETCH_RECORD;
      inputActionReplaceRecord = inputActions.replaceSalesRecord;
      editRecordRoute = `/${ROUTES.FORGE.HOME}/${ROUTES.FORGE.SALES.EDIT}`;
      break;
    case ROUTES.FORGE.RECRUIT.VIEW:
      updateRecordStatusUrl = END_POINTS.FORGE.RECRUIT.UPDATE_RECORD_STATUS;
      fetchRecordsUrl = END_POINTS.FORGE.RECRUIT.FETCH_RECORDS;
      fetchRecordUrl = END_POINTS.FORGE.RECRUIT.FETCH_RECORD;
      inputActionReplaceRecord = inputActions.replaceRecruitRecord;
      editRecordRoute = `/${ROUTES.FORGE.HOME}/${ROUTES.FORGE.RECRUIT.EDIT}`;
      break;
    default:
      updateRecordStatusUrl = "";
      fetchRecordsUrl = "";
      fetchRecordUrl = "";
      inputActionReplaceRecord = () => {};
      editRecordRoute = "";
  }

  /**
   * Toggles the status filter for a given status.
   *
   * @param {string} status - The status value to toggle in the selectedStatuses state.
   */
  const toggleStatusFilter = (status) => {
    updateSelectedStatuses({ tool: PAGES.FORGE, status });
  };

  /**
   * Resets the component's state related to editing and status update modals.
   *
   * Clears the edit status, and resets the input field values.
   */
  const resetStates = () => {
    setEditStatus(initialEditStatus);
    resetStatusValue();
  };

  /**
   * Updates the status of a candidate and shows a success or failure message based on the outcome.
   *
   * @async
   * @function
   * @param {number} id - The ID of the record to update.
   * @param {string} statusLabel - The new status label to set for the record.
   */
  const updateRecordStatus = async (id, statusLabel) => {
    enableButtonLoading();
    await dispatchAsync(resetStatus);

    const url = replaceRouteParam(updateRecordStatusUrl, { id });

    const { status, response } = await updateFormRecordStatus(url, {
      submission: { status: statusLabel },
    });

    if (status === STATUS_CODES.SUCCESS) {
      dispatch(dataActions.replaceRecord(response?.data));
      resetStates();
      updateStatus({
        message: CONTENT.FORGE.statusMessages.form.success_update_status,
        type: "success",
        darkMode: true,
      });
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
        fetchRecordsUrl,
        FORGE.CANDIDATES_PER_PAGE,
        "",
        searchTerm,
        getStatusesAsJoinedString(
          OPTIONS.SUBMISSION_STATUS,
          selectedStatuses.forge
        )
      )
    );
  };

  /**
   * Handles exporting records (sales or recruit) to an Excel file.
   * Dynamically maps data and column configurations based on the record type.
   */
  const handleDownloadExcel = () => {
    let worksheetData = [];
    let columnWidths = {};

    if (lastSegment === ROUTES.FORGE.SALES.VIEW) {
      // Mapping sales records
      worksheetData = forgeRecords.map((record) => ({
        Status: record?.submission?.status || "Unknown",
        Date: record?.submission?.date
          ? new Date(record?.submission?.date).toLocaleDateString("en-US", {
              timeZone: "UTC",
            })
          : "-",
        "Sales Person Name": record?.submission?.by,
        "Client Name": record?.requirement?.clientName || "-",
        "Prime Vendor": record?.requirement?.primeVendor || "-",
        "Project Implementor": record?.requirement?.implementor || "-",
        Position: record?.requirement?.position || "-",
        City: record?.requirement?.city || "-",
        State: record?.requirement?.state || "-",
        Rate:
          `$${record?.requirement?.rate?.value} (${record?.requirement?.rate?.frequency})` ||
          "-",
        Terms: record?.requirement?.terms || "-",
        "Candidate Name":
          `${record?.candidate?.firstName || ""} ${
            record?.candidate?.lastName || ""
          }`.trim() || "-",
        "Vendor Name": record?.vendor?.name,
        "Vendor Company": record?.vendor?.company,
        "Vendor Mobile": transformPhoneNumber(record?.vendor?.phone, true),
        "Vendor Alt Mobile": transformPhoneNumber(
          record?.vendor?.alternatePhone,
          true
        ),
        "Vendor Extension": record?.vendor?.extension,
        "Vendor Email": record?.vendor?.email,
        Remarks: record?.miscellaneous?.remarks || "-",
        "Last Updated": record?.record?.updatedDate
          ? new Date(record?.record?.updatedDate).toLocaleString()
          : "-",
      }));

      // Column widths for sales records
      columnWidths = {
        Status: 15,
        Date: 12,
        "Sales Person Name": 20,
        "Client Name": 20,
        "Prime Vendor": 15,
        "Project Implementor": 15,
        Position: 20,
        City: 15,
        State: 10,
        Rate: 10,
        Terms: 25,
        "Candidate Name": 20,
        "Vendor Name": 20,
        "Vendor Company": 20,
        "Vendor Mobile": 15,
        "Vendor Alt Mobile": 15,
        "Vendor Extension": 5,
        "Vendor Email": 25,
        Remarks: 30,
        "Last Updated": 20,
      };
    } else if (lastSegment === ROUTES.FORGE.RECRUIT.VIEW) {
      // Mapping recruit records
      worksheetData = forgeRecords.map((record) => ({
        Status: record?.submission?.status || "Unknown",
        Date: record?.submission?.date
          ? new Date(record?.submission?.date).toLocaleDateString("en-US", {
              timeZone: "UTC",
            })
          : "-",
        "Recruiter Name": record?.submission?.by,
        "Candidate Name":
          `${record?.candidate?.firstName || ""} ${
            record?.candidate?.lastName || ""
          }`.trim() || "-",
        "Candidate Experience": getExperienceDisplayText(
          record?.candidate?.experience
        ),
        "Candidate Mobile": transformPhoneNumber(
          record?.candidate?.phoneNumber || "-",
          true
        ),
        "Candidate Email": record?.candidate?.emailId || "-",
        "Candidate City": record?.candidate?.city || "-",
        "Candidate State": record?.candidate?.state || "-",
        "Visa Status": record?.candidate?.visaStatus || "-",
        "Client Name": record?.requirement?.clientName || "-",
        Position: record?.requirement?.position || "-",
        Rate:
          `$${record?.requirement?.rate?.value} (${record?.requirement?.rate?.frequency})` ||
          "-",
        Terms: record?.requirement?.terms || "-",
        "SP Name": record?.employer?.name || "-",
        "SP Company": record?.employer?.company || "-",
        "SP Mobile": transformPhoneNumber(record?.employer?.phone, true) || "-",
        "SP Alt Mobile":
          transformPhoneNumber(record?.employer?.alternatePhone, true) || "-",
        "SP Extension": record?.employer?.extension || "-",
        "SP Email": record?.employer?.email || "-",
        Remarks: record?.miscellaneous?.remarks || "-",
        "Last Updated": record?.record?.updatedDate
          ? new Date(record?.record?.updatedDate).toLocaleString()
          : "-",
      }));

      // Column widths for recruit records
      columnWidths = {
        Status: 15,
        Date: 12,
        "Recruiter Name": 20,
        "Candidate Name": 20,
        "Candidate Experience": 15,
        "Candidate Mobile": 15,
        "Candidate Email": 25,
        "Candidate City": 15,
        "Candidate State": 10,
        "Visa Status": 15,
        "Client Name": 20,
        Position: 20,
        Rate: 10,
        Terms: 40,
        "SP Name": 20,
        "SP Company": 20,
        "SP Mobile": 15 || "-",
        "SP Alt Mobile": 15 || "-",
        "SP Extension": 5 || "-",
        "SP Email": 25 || "-",
        Remarks: 30,
        "Last Updated": 20,
      };
    }

    // Export to Excel
    exportToExcel(
      worksheetData,
      columnWidths,
      lastSegment === ROUTES.FORGE.SALES.VIEW
        ? "SalesRecords"
        : "RecruitRecords"
    );
  };

  /**
   * Handles the click event for updating a record's status.
   *
   * @param {number} id - The ID of the record to update.
   * @param {string} statusValue - The new status value.
   */
  const handleUpdateStatusClick = (id, statusValue) => {
    const statusLabel = getLabelByValue(OPTIONS.SUBMISSION_STATUS, statusValue);

    updateRecordStatus(id, statusLabel);
  };

  /**
   * Handles the double-click event on a form row.
   *
   * Fetches detailed information for the selected record by ID and navigates to the record's details page.
   * Displays a loading indicator during the fetch process, and updates the app status if an error occurs.
   *
   * @async
   * @function
   * @param {number} id - The ID of the record to fetch details.
   */
  const handleDoubleClick = async (id) => {
    enableAppLoading();
    const url = replaceRouteParam(fetchRecordUrl, { id });

    const { status, data: record } = await fetchFormRecordById(url);

    if (status === STATUS_CODES.SUCCESS) {
      dispatch(inputActionReplaceRecord(record.additional_info));
      navigate(
        replaceRouteParam(editRecordRoute, {
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
   * Fetches the list of records when the component mounts or when refetch is triggered.
   * Updates the UI state based on the fetch result.
   */
  useEffect(() => {
    const url =
      refetchURL ||
      buildFetchCandidatesUrl(
        fetchRecordsUrl,
        FORGE.CANDIDATES_PER_PAGE,
        "",
        "",
        getStatusesAsJoinedString(
          OPTIONS.SUBMISSION_STATUS,
          selectedStatuses.forge
        )
      );

    /**
     * Fetches records from the server.
     *
     * @async
     */
    const fetchRecords = async () => {
      enableAppLoading();

      const { status, data } = await fetchFormRecords(url);

      if (status === STATUS_CODES.SUCCESS) {
        const {
          count: totalCount,
          previous: previousPage,
          next: nextPage,
          results,
        } = data;

        dispatch(dataActions.replaceRecords({ records: results }));
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
      fetchRecords();
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
    fetchRecordsUrl,
    setEditStatus,
  ]);

  const SalesHeaders = () => (
    <>
      <th style={{ width: "6rem" }}>{columnHeaders.sales.date}</th>
      <th style={{ width: "9rem" }}>{columnHeaders.sales.submittedBy}</th>

      <th style={{ width: "9rem" }}>{columnHeaders.sales.clientName}</th>
      <th style={{ width: "5rem" }}>{columnHeaders.sales.vendor}</th>
      <th style={{ width: "5rem" }}>{columnHeaders.sales.implementor}</th>
      <th style={{ width: "8rem" }}>{columnHeaders.sales.position}</th>
      <th style={{ width: "5rem" }}>{columnHeaders.sales.city}</th>
      <th style={{ width: "3rem" }}>{columnHeaders.sales.state}</th>
      <th style={{ width: "8rem" }}>{columnHeaders.sales.rate}</th>
      <th style={{ width: "5rem" }}>{columnHeaders.sales.terms}</th>

      <th style={{ width: "9rem" }}>{columnHeaders.sales.candidateName}</th>

      <th style={{ width: "8rem" }}>{columnHeaders.sales.vendorName}</th>
      <th style={{ width: "8rem" }}>{columnHeaders.sales.vendorCompany}</th>
      <th style={{ width: "8.5rem" }}>{columnHeaders.sales.vendorPhone}</th>
      <th style={{ width: "8.5rem" }}>
        {columnHeaders.sales.vendorAlternatePhone}
      </th>
      <th style={{ width: "5rem" }}>{columnHeaders.sales.vendorExtension}</th>
      <th style={{ width: "8rem" }}>{columnHeaders.sales.vendorEmail}</th>

      <th style={{ width: "15rem" }}>{columnHeaders.sales.remarks}</th>
      <th style={{ width: "19rem" }}>{columnHeaders.sales.lastUpdated}</th>
    </>
  );

  const RecruitHeaders = () => (
    <>
      <th style={{ width: "6rem" }}>{columnHeaders.recruit.date}</th>
      <th style={{ width: "9rem" }}>{columnHeaders.recruit.submittedBy}</th>

      <th style={{ width: "9rem" }}>{columnHeaders.recruit.candidateName}</th>
      <th style={{ width: "4rem" }}>{columnHeaders.recruit.candidateExp}</th>
      <th style={{ width: "8.5rem" }}>
        {columnHeaders.recruit.candidatePhone}
      </th>
      <th style={{ width: "8rem" }}>{columnHeaders.recruit.candidateEmail}</th>
      <th style={{ width: "5rem" }}>{columnHeaders.recruit.candidateCity}</th>
      <th style={{ width: "3rem" }}>{columnHeaders.recruit.candidateState}</th>
      <th style={{ width: "4rem" }}>{columnHeaders.recruit.visaStatus}</th>

      <th style={{ width: "9rem" }}>{columnHeaders.recruit.clientName}</th>
      <th style={{ width: "8rem" }}>{columnHeaders.recruit.position}</th>
      <th style={{ width: "8rem" }}>{columnHeaders.recruit.rate}</th>
      <th style={{ width: "5rem" }}>{columnHeaders.recruit.terms}</th>

      <th style={{ width: "8rem" }}>{columnHeaders.recruit.employerName}</th>
      <th style={{ width: "8rem" }}>{columnHeaders.recruit.employerCompany}</th>
      <th style={{ width: "8.5rem" }}>{columnHeaders.recruit.employerPhone}</th>
      <th style={{ width: "8.5rem" }}>
        {columnHeaders.recruit.employerAlternatePhone}
      </th>
      <th style={{ width: "5rem" }}>
        {columnHeaders.recruit.employerExtension}
      </th>
      <th style={{ width: "8rem" }}>{columnHeaders.recruit.employerEmail}</th>

      <th style={{ width: "15rem" }}>{columnHeaders.recruit.remarks}</th>

      <th style={{ width: "19rem" }}>{columnHeaders.recruit.lastUpdated}</th>
    </>
  );

  const SalesRows = () => (
    <tbody>
      {forgeRecords && forgeRecords.length > 0 ? (
        <>
          {forgeRecords.map((r, index) => {
            const record = r.additional_info;

            return (
              <tr
                key={index}
                onDoubleClick={() => handleDoubleClick(record?.record?.id)}
              >
                <td>
                  {editStatus.id === record.record.id ? (
                    <>
                      <Select
                        id="edit-status"
                        label=""
                        value={statusValue}
                        options={OPTIONS.SUBMISSION_STATUS}
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
                              OPTIONS.SUBMISSION_STATUS,
                              statusValue
                            ) === record?.submission?.status
                          }
                        >
                          <i
                            className={"bi bi-floppy"}
                            onClick={() =>
                              handleUpdateStatusClick(
                                record.record.id,
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
                            `status-${record?.submission?.status
                              .replace(/\s+/g, "")
                              .toLowerCase()}`
                          ]
                        }
                      >
                        {highlightText(record?.submission?.status, searchTerm)}
                      </div>
                      <Button className={classes.editStatusButton}>
                        <i
                          className={"bi bi-pencil"}
                          onClick={() =>
                            setEditStatus({
                              id: record?.record?.id,
                              status: getValueByLabel(
                                OPTIONS.SUBMISSION_STATUS,
                                record?.submission?.status
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
                <td>{convertDate(record?.submission?.date, false)}</td>
                <td>
                  {highlightText(
                    record?.submission?.by?.toUpperCase(),
                    searchTerm
                  )}
                </td>

                <td>
                  {highlightText(
                    record?.requirement?.clientName?.toUpperCase(),
                    searchTerm
                  )}
                </td>
                <td>
                  {highlightText(
                    record?.requirement?.primeVendor?.toUpperCase() || "",
                    searchTerm
                  )}
                </td>
                <td>
                  {highlightText(
                    record?.requirement?.implementor?.toUpperCase(),
                    searchTerm
                  )}
                </td>
                <td>
                  {highlightText(
                    record?.requirement?.position?.toUpperCase(),
                    searchTerm
                  )}
                </td>
                <td>
                  {highlightText(
                    record?.requirement?.city?.toUpperCase(),
                    searchTerm
                  )}
                </td>
                <td>
                  {highlightText(
                    record?.requirement?.state?.toUpperCase(),
                    searchTerm
                  )}
                </td>
                <td>
                  {record?.requirement?.rate?.value &&
                  record?.requirement?.rate?.frequency
                    ? `$${record?.requirement?.rate?.value} (${record?.requirement?.rate?.frequency})`
                    : ""}
                </td>
                <td>{record?.requirement?.terms?.toUpperCase()}</td>

                <td>
                  {highlightText(
                    `${record?.candidate?.firstName?.toUpperCase()}${
                      record?.candidate?.lastName
                        ? `, ${record?.candidate?.lastName?.toUpperCase()}`
                        : ""
                    }`,
                    searchTerm
                  )}
                </td>

                <td>
                  {highlightText(
                    record?.vendor?.name?.toUpperCase(),
                    searchTerm
                  )}
                </td>
                <td>
                  {highlightText(
                    record?.vendor?.company?.toUpperCase(),
                    searchTerm
                  )}
                </td>
                <td>{transformPhoneNumber(record?.vendor?.phone, true)}</td>
                <td>
                  {transformPhoneNumber(record?.vendor?.alternatePhone, true)}
                </td>
                <td>{record?.vendor?.extension}</td>
                <td>{record?.vendor?.email}</td>

                <td>{record?.miscellaneous?.remarks}</td>
                <td>
                  <TimestampDisplay timestamp={record?.record?.updatedDate} />
                </td>
                <td
                  className={classes.historyIcon}
                  onClick={() => handleHistoryClick(record?.record?.id)}
                >
                  <i className="bi bi-clock-history" />
                </td>
              </tr>
            );
          })}
          {FORGE.CANDIDATES_PER_PAGE - forgeRecords.length > 0 &&
            getEmptyRows(FORGE.CANDIDATES_PER_PAGE - forgeRecords.length, 18)}
        </>
      ) : (
        <tr>
          <td colSpan="21">{noRecords}</td>
        </tr>
      )}
    </tbody>
  );

  const RecruitRows = () => (
    <tbody>
      {forgeRecords && forgeRecords.length > 0 ? (
        <>
          {forgeRecords.map((r, index) => {
            const record = r.additional_info;

            return (
              <tr
                key={index}
                onDoubleClick={() => handleDoubleClick(record?.record?.id)}
              >
                <td>
                  {editStatus.id === record.record.id ? (
                    <>
                      <Select
                        id="edit-status"
                        label=""
                        value={statusValue}
                        options={OPTIONS.SUBMISSION_STATUS}
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
                              OPTIONS.SUBMISSION_STATUS,
                              statusValue
                            ) === record?.submission?.status
                          }
                        >
                          <i
                            className={"bi bi-floppy"}
                            onClick={() =>
                              handleUpdateStatusClick(
                                record.record.id,
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
                            `status-${record?.submission?.status
                              .replace(/\s+/g, "")
                              .toLowerCase()}`
                          ]
                        }
                      >
                        {highlightText(record?.submission?.status, searchTerm)}
                      </div>
                      <Button className={classes.editStatusButton}>
                        <i
                          className={"bi bi-pencil"}
                          onClick={() =>
                            setEditStatus({
                              id: record?.record?.id,
                              status: getValueByLabel(
                                OPTIONS.SUBMISSION_STATUS,
                                record?.submission?.status
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
                <td>{convertDate(record?.submission?.date, false)}</td>
                <td>
                  {highlightText(
                    record?.submission?.by?.toUpperCase(),
                    searchTerm
                  )}
                </td>

                <td>
                  {highlightText(
                    `${record?.candidate?.firstName?.toUpperCase()}${
                      record?.candidate?.lastName
                        ? `, ${record?.candidate?.lastName?.toUpperCase()}`
                        : ""
                    }`,
                    searchTerm
                  )}
                </td>
                <td>
                  {highlightText(
                    getExperienceDisplayText(
                      record?.candidate?.experience?.years,
                      record?.candidate?.experience?.months
                    ),
                    searchTerm
                  )}
                </td>
                <td>
                  {transformPhoneNumber(record?.candidate?.phoneNumber, true)}
                </td>
                <td>{record?.candidate?.emailId?.toUpperCase()}</td>
                <td>
                  {highlightText(
                    record?.candidate?.city?.toUpperCase(),
                    searchTerm
                  )}
                </td>
                <td>
                  {highlightText(
                    record?.candidate?.state?.toUpperCase(),
                    searchTerm
                  )}
                </td>
                <td>
                  {highlightText(
                    record?.candidate?.visaStatus?.toUpperCase(),
                    searchTerm
                  )}
                </td>

                <td>
                  {highlightText(
                    record?.requirement?.clientName?.toUpperCase(),
                    searchTerm
                  )}
                </td>
                <td>
                  {highlightText(
                    record?.requirement?.position?.toUpperCase(),
                    searchTerm
                  )}
                </td>
                <td>
                  {record?.requirement?.rate?.value &&
                  record?.requirement?.rate?.frequency
                    ? `$${record?.requirement?.rate?.value} (${record?.requirement?.rate?.frequency})`
                    : ""}
                </td>
                <td>{record?.requirement?.terms?.toUpperCase()}</td>

                <td>
                  {highlightText(
                    record?.employer?.name?.toUpperCase() || "",
                    searchTerm
                  )}
                </td>
                <td>
                  {highlightText(
                    record?.employer?.company?.toUpperCase() || "",
                    searchTerm
                  )}
                </td>
                <td>{transformPhoneNumber(record?.employer?.phone, true)}</td>
                <td>
                  {transformPhoneNumber(record?.employer?.alternatePhone, true)}
                </td>
                <td>{record?.employer?.extension}</td>
                <td>{record?.employer?.email?.toUpperCase()}</td>

                <td>{record?.miscellaneous?.remarks}</td>
                <td>
                  <TimestampDisplay timestamp={record?.record?.updatedDate} />
                </td>
                <td
                  className={classes.historyIcon}
                  onClick={() => handleHistoryClick(record?.record?.id)}
                >
                  <i className="bi bi-clock-history" />
                </td>
              </tr>
            );
          })}
          {FORGE.CANDIDATES_PER_PAGE - forgeRecords.length > 0 &&
            getEmptyRows(FORGE.CANDIDATES_PER_PAGE - forgeRecords.length, 19)}
        </>
      ) : (
        <tr>
          <td colSpan="21">{noRecords}</td>
        </tr>
      )}
    </tbody>
  );

  let Headers, Rows, newPath;

  switch (lastSegment) {
    case ROUTES.FORGE.SALES.VIEW:
      Headers = SalesHeaders;
      Rows = SalesRows;
      newPath = `/${ROUTES.FORGE.HOME}/${ROUTES.FORGE.SALES.NEW}`;
      break;
    case ROUTES.FORGE.RECRUIT.VIEW:
      Headers = RecruitHeaders;
      Rows = RecruitRows;
      newPath = `/${ROUTES.FORGE.HOME}/${ROUTES.FORGE.RECRUIT.NEW}`;
      break;
    default:
      Headers = <></>;
      Rows = <></>;
  }

  return (
    <>
      <HistorySideBar
        candidateName={`${
          selectedRecord?.additional_info?.candidate?.firstName || ""
        } ${selectedRecord?.additional_info?.candidate?.lastName || ""}`}
        historyList={selectedRecord?.history || []}
      />
      <Table
        statusFilterOptions={OPTIONS.SUBMISSION_STATUS}
        TableHeader={Headers}
        TableBody={Rows}
        rowsLength={forgeRecords.length}
        handleStatusFilterClick={handleStatusFilterClick}
        toggleStatusFilter={toggleStatusFilter}
        selectedStatuses={selectedStatuses.forge}
        extraClass={classes.extraTableClass}
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

      {/* Floating button to add a new record */}
      <FloatingButton
        clickHandler={() => {
          dispatch(inputActions.resetForm());
          navigate(newPath);
        }}
        title={"Add new record"}
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

Records.displayName = "Records";
export default Records;
