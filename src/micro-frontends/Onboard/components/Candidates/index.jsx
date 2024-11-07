import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../../../store";
import Loader from "../../../Atoms/components/Loader";
import NoRecords from "../../../Atoms/components/NoRecords";
import FloatingButton from "../../../Atoms/components/FloatingButton";
import { dataActions, inputActions, uiActions } from "../../store";
import {
  buildFetchCandidatesUrl,
  convertDate,
  fetchOnboardCandidates,
  replaceRouteParam,
  transformPhoneNumber,
} from "../../../../utilities";
import { ONBOARD, END_POINTS, ROUTES } from "../../../../constants";
import classes from "./index.module.scss";

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

let isInitial = true;

const OnboardCandidates = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { candidates } = useSelector((state) => state.data);
  const { refetch, refetchURL } = useSelector((state) => state.ui);
  const { isLoading, enableAppLoading, disableAppLoading } = useLoading();

  useEffect(() => {
    const url =
      refetchURL ||
      buildFetchCandidatesUrl(
        END_POINTS.ONBOARD.FETCH_CANDIDATES,
        ONBOARD.CANDIDATES_PER_PAGE
      );

    const fetchCandidates = async () => {
      enableAppLoading();

      const { data } = await fetchOnboardCandidates(url);

      dispatch(inputActions.resetForm());
      dispatch(dataActions.replaceCandidates({ candidates: data }));

      disableAppLoading();
    };

    if (isInitial || refetch) {
      isInitial = false;
      fetchCandidates();
      dispatch(uiActions.disableRefetch());
    }
  }, [dispatch, enableAppLoading, disableAppLoading, refetch, refetchURL]);

  return (
    <>
      <div className={classes.tableContainer}>
        {isLoading.app ? (
          <Loader />
        ) : candidates.length === 0 ? (
          <NoRecords />
        ) : (
          <table className={classes.table}>
            <thead>
              <tr>
                <th title="Status" style={{ width: "10rem" }}>
                  Status
                </th>
                <th title="Last Updated" style={{ width: "15rem" }}>
                  Last Updated
                </th>
                <th title="Company Name" style={{ width: "15rem" }}>
                  Company Name
                </th>
                <th title="Guest House Member" style={{ width: "8rem" }}>
                  Guest House Member
                </th>
                <th title="Technology" style={{ width: "12rem" }}>
                  Technology
                </th>
                <th title="Marketing Name" style={{ width: "15rem" }}>
                  Marketing Name
                </th>
                <th title="Position" style={{ width: "12rem" }}>
                  Position
                </th>
                <th title="Experience" style={{ width: "14rem" }}>
                  Experience
                </th>
                <th title="Location" style={{ width: "10rem" }}>
                  Location
                </th>
                <th title="Relocation" style={{ width: "8rem" }}>
                  Relocation
                </th>
                <th title="First Name" style={{ width: "12rem" }}>
                  First Name
                </th>
                <th title="Last Name" style={{ width: "12rem" }}>
                  Last Name
                </th>
                <th title="Reference Name" style={{ width: "15rem" }}>
                  Reference Name
                </th>
                <th title="Remarks" style={{ width: "20rem" }}>
                  Remarks
                </th>
                <th title="Phone" style={{ width: "12rem" }}>
                  Phone
                </th>
                <th title="Email" style={{ width: "18rem" }}>
                  Email
                </th>
                <th title="Offer" style={{ width: "8rem" }}>
                  Offer Letter Status
                </th>
                <th title="Date of Birth" style={{ width: "8rem" }}>
                  Date of Birth
                </th>
                <th title="University" style={{ width: "15rem" }}>
                  University
                </th>
                <th title="Notes" style={{ width: "20rem" }}>
                  Notes
                </th>
              </tr>
            </thead>
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
                        {candidateInfo.onboarding.status}
                      </td>
                      <td title={convertDate(updatedTime)}>
                        {convertDate(updatedTime)}
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
                      <td
                        title={candidateInfo.profession.technologiesKnown.join(
                          ", "
                        )}
                      >
                        {candidateInfo.profession.technologiesKnown.join(", ")}
                      </td>
                      <td title={candidateInfo.offerLetter.marketingName}>
                        {candidateInfo.offerLetter.marketingName}
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
                      <td title={candidateInfo.personal.firstName}>
                        {candidateInfo.personal.firstName}
                      </td>
                      <td title={candidateInfo.personal.lastName}>
                        {candidateInfo.personal.lastName}
                      </td>
                      <td title={candidateInfo.personal.referenceName}>
                        {candidateInfo.personal.referenceName}
                      </td>
                      <td title={candidateInfo.miscellaneous.remarks}>
                        {candidateInfo.miscellaneous.remarks}
                      </td>
                      <td
                        title={transformPhoneNumber(
                          candidateInfo.personal.phoneNumber,
                          true
                        )}
                      >
                        {transformPhoneNumber(
                          candidateInfo.personal.phoneNumber,
                          true
                        )}
                      </td>
                      <td title={candidateInfo.personal.emailId}>
                        {candidateInfo.personal.emailId}
                      </td>
                      <td title={candidateInfo.offerLetter.status}>
                        {candidateInfo.offerLetter.status}
                      </td>
                      <td title={candidateInfo.personal.dob}>
                        {candidateInfo.personal.dob}
                      </td>
                      <td
                        title={candidateInfo.education.graduatedUniversity.name}
                      >
                        {candidateInfo.education.graduatedUniversity.name}
                      </td>
                      <td title={candidateInfo.miscellaneous.notes}>
                        {candidateInfo.miscellaneous.notes}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="21">No candidates available</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
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
