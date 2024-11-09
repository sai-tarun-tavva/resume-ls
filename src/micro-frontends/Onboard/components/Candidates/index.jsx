import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoading, useStatus, useUI } from "../../../../store";
import Loader from "../../../Atoms/components/Loader";
import NoRecords from "../../../Atoms/components/NoRecords";
import TimestampDisplay from "../../../Atoms/components/TimestampDisplay";
import FloatingButton from "../../../Atoms/components/FloatingButton";
import { dataActions, inputActions } from "../../store";
import {
  buildFetchCandidatesUrl,
  convertDate,
  fetchOnboardCandidates,
  highlightText,
  replaceRouteParam,
  transformPhoneNumber,
} from "../../../../utilities";
import {
  ONBOARD,
  END_POINTS,
  ROUTES,
  LOADING_ACTION_TYPES,
  STATUS_CODES,
  CONTENT,
} from "../../../../constants";
import classes from "./index.module.scss";

/**
 * Function to get the experience display text for a candidate.
 * @param {number} years - Years of experience.
 * @param {number} months - Months of experience.
 * @returns {string} - Formatted experience text.
 */
const getExperienceDisplayText = (years, months) => {
  if (years && months) {
    return `${years} years and ${months} months`;
  } else if (years) {
    return `${years} years`;
  } else if (months) {
    return `${months} months`;
  } else {
    return "";
  }
};

// Variable to manage the initial fetch status
let isInitial = true;

const { APP } = LOADING_ACTION_TYPES;
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
    state: { refetch, refetchURL, searchTerm },
    disableRefetch,
    updatePagination,
  } = useUI();
  const { isLoading, enableAppLoading, disableAppLoading } = useLoading();
  const { updateStatus } = useStatus();

  // Effect to fetch candidates when component mounts or refetch is triggered
  useEffect(() => {
    const url =
      refetchURL ||
      buildFetchCandidatesUrl(
        END_POINTS.ONBOARD.FETCH_CANDIDATES,
        ONBOARD.CANDIDATES_PER_PAGE
      );

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
        });
      }
      disableAppLoading();
    };

    // Fetch candidates if it is the initial load or refetch is triggered
    if (isInitial || refetch) {
      isInitial = false;
      fetchCandidates();
      disableRefetch();
    }
  }, [
    dispatch,
    enableAppLoading,
    disableAppLoading,
    refetch,
    refetchURL,
    disableRefetch,
    updatePagination,
    updateStatus,
  ]);

  return (
    <>
      <div className={classes.tableContainer}>
        {isLoading[APP] ? (
          <Loader /> // Show loader if data is being fetched
        ) : candidates.length === 0 ? (
          <NoRecords /> // Display message if no records found
        ) : (
          <table className={classes.table}>
            {/* Table headers */}
            <thead>
              <tr>
                <th title={columnHeaders.status} style={{ width: "10rem" }}>
                  {columnHeaders.status}
                </th>
                <th
                  title={columnHeaders.onboardingDate}
                  style={{ width: "9rem" }}
                >
                  {columnHeaders.onboardingDate}
                </th>
                <th
                  title={columnHeaders.lastUpdated}
                  style={{ width: "23rem" }}
                >
                  {columnHeaders.lastUpdated}
                </th>
                <th title={columnHeaders.position} style={{ width: "12rem" }}>
                  {columnHeaders.position}
                </th>
                <th title={columnHeaders.experience} style={{ width: "14rem" }}>
                  {columnHeaders.experience}
                </th>
                <th
                  title={columnHeaders.companyName}
                  style={{ width: "15rem" }}
                >
                  {columnHeaders.companyName}
                </th>
                <th title={columnHeaders.technology} style={{ width: "12rem" }}>
                  {columnHeaders.technology}
                </th>
                <th title={columnHeaders.firstName} style={{ width: "12rem" }}>
                  {columnHeaders.firstName}
                </th>
                <th title={columnHeaders.lastName} style={{ width: "12rem" }}>
                  {columnHeaders.lastName}
                </th>
                <th
                  title={columnHeaders.marketingName}
                  style={{ width: "15rem" }}
                >
                  {columnHeaders.marketingName}
                </th>
                <th title={columnHeaders.location} style={{ width: "10rem" }}>
                  {columnHeaders.location}
                </th>
                <th title={columnHeaders.relocation} style={{ width: "8rem" }}>
                  {columnHeaders.relocation}
                </th>
                <th title={columnHeaders.phone} style={{ width: "12rem" }}>
                  {columnHeaders.phone}
                </th>
                <th title={columnHeaders.email} style={{ width: "18rem" }}>
                  {columnHeaders.email}
                </th>
                <th title={columnHeaders.dob} style={{ width: "8rem" }}>
                  {columnHeaders.dob}
                </th>
                <th
                  title={columnHeaders.universityName}
                  style={{ width: "15rem" }}
                >
                  {columnHeaders.universityName}
                </th>
                <th title={columnHeaders.offerStatus} style={{ width: "8rem" }}>
                  {columnHeaders.offerStatus}
                </th>
                <th
                  title={columnHeaders.referenceName}
                  style={{ width: "15rem" }}
                >
                  {columnHeaders.referenceName}
                </th>
                <th
                  title={columnHeaders.guestHouseMember}
                  style={{ width: "8rem" }}
                >
                  {columnHeaders.guestHouseMember}
                </th>
                <th title={columnHeaders.remarks} style={{ width: "20rem" }}>
                  {columnHeaders.remarks}
                </th>
                <th title={columnHeaders.notes} style={{ width: "20rem" }}>
                  {columnHeaders.notes}
                </th>
              </tr>
            </thead>

            {/* Table body displaying candidate data */}
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
                      onClick={() => {
                        dispatch(inputActions.replaceCandidate(candidateInfo));
                        navigate(
                          replaceRouteParam(
                            ROUTES.ONBOARD.CANDIDATE_FORM.VIEW,
                            {
                              id: candidateId,
                            }
                          )
                        );
                      }}
                    >
                      <td title={candidateInfo.onboarding.status}>
                        {highlightText(
                          candidateInfo.onboarding.status,
                          searchTerm
                        )}
                      </td>
                      <td title={candidateInfo.onboarding.date}>
                        {convertDate(candidateInfo.onboarding.date, false)}
                      </td>
                      <td title={convertDate(updatedTime)}>
                        <TimestampDisplay timestamp={updatedTime} />
                      </td>
                      <td title={candidateInfo.offerLetter.designation}>
                        {candidateInfo.offerLetter.designation}
                      </td>
                      <td
                        title={getExperienceDisplayText(
                          candidateInfo.profession.experience.years,
                          candidateInfo.profession.experience.months
                        )}
                      >
                        {getExperienceDisplayText(
                          candidateInfo.profession.experience.years,
                          candidateInfo.profession.experience.months
                        )}
                      </td>
                      <td
                        title={
                          candidateInfo.profession.previousExperience?.[0]
                            ?.employerName
                        }
                      >
                        {
                          candidateInfo.profession.previousExperience?.[0]
                            ?.employerName
                        }
                      </td>
                      <td
                        title={candidateInfo.profession.technologiesKnown.join(
                          ", "
                        )}
                      >
                        {candidateInfo.profession.technologiesKnown.join(", ")}
                      </td>
                      <td title={candidateInfo.personal.firstName}>
                        {highlightText(
                          candidateInfo.personal.firstName,
                          searchTerm
                        )}
                      </td>
                      <td title={candidateInfo.personal.lastName}>
                        {highlightText(
                          candidateInfo.personal.lastName,
                          searchTerm
                        )}
                      </td>
                      <td title={candidateInfo.offerLetter.marketingName}>
                        {candidateInfo.offerLetter.marketingName}
                      </td>
                      <td
                        title={
                          candidateInfo.personal.usaLocation.city
                            ? `${candidateInfo.personal.usaLocation.city}, ${candidateInfo.personal.usaLocation.state}`
                            : ""
                        }
                      >
                        {candidateInfo.personal.usaLocation.city
                          ? `${candidateInfo.personal.usaLocation.city}, ${candidateInfo.personal.usaLocation.state}`
                          : ""}
                      </td>
                      <td title={candidateInfo.relocation.interested}>
                        {candidateInfo.relocation.interested}
                      </td>
                      <td
                        title={transformPhoneNumber(
                          candidateInfo.personal.phoneNumber,
                          true
                        )}
                      >
                        {highlightText(
                          transformPhoneNumber(
                            candidateInfo.personal.phoneNumber,
                            true
                          ),
                          searchTerm
                        )}
                      </td>
                      <td title={candidateInfo.personal.emailId}>
                        {highlightText(
                          candidateInfo.personal.emailId,
                          searchTerm
                        )}
                      </td>
                      <td title={candidateInfo.personal.dob}>
                        {convertDate(candidateInfo.personal.dob, false)}
                      </td>
                      <td
                        title={candidateInfo.education.graduatedUniversity.name}
                      >
                        {candidateInfo.education.graduatedUniversity.name}
                      </td>
                      <td title={candidateInfo.offerLetter.status}>
                        {candidateInfo.offerLetter.status}
                      </td>
                      <td title={candidateInfo.personal.referenceName}>
                        {candidateInfo.personal.referenceName}
                      </td>
                      <td
                        title={
                          candidateInfo.relocation.preference === "guestHouse"
                            ? "Yes"
                            : "No"
                        }
                      >
                        {candidateInfo.relocation.preference === "guestHouse"
                          ? "Yes"
                          : "No"}
                      </td>
                      <td title={candidateInfo.miscellaneous.remarks}>
                        {candidateInfo.miscellaneous.remarks}
                      </td>
                      <td title={candidateInfo.miscellaneous.notes}>
                        {candidateInfo.miscellaneous.notes}
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
          </table>
        )}
      </div>

      {/* Floating button to onboard a new candidate */}
      <FloatingButton
        clickHandler={() => {
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
