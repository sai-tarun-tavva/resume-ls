import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../../../store";
import Loader from "../../../Atoms/components/Loader";
import NoRecords from "../../../Atoms/components/NoRecords";
import FloatingButton from "../../../Atoms/components/FloatingButton";
import { dataActions } from "../../store";
import {
  fetchOnboardCandidates,
  replaceRouteParam,
} from "../../../../utilities";
import { ROUTES } from "../../../../constants";
import classes from "./index.module.scss";

const OnboardCandidates = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { candidates } = useSelector((state) => state.data);
  const { isLoading, enableAppLoading, disableAppLoading } = useLoading();

  useEffect(() => {
    const fetchCandidates = async () => {
      enableAppLoading();

      const { data } = await fetchOnboardCandidates();

      dispatch(dataActions.replaceCandidates({ candidates: data }));

      disableAppLoading();
    };

    fetchCandidates();
  }, [dispatch, enableAppLoading, disableAppLoading]);

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
                <th title="Experience" style={{ width: "7rem" }}>
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
                <th title="Date of Birth" style={{ width: "12rem" }}>
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
                candidates
                  .slice(0, 3)
                  .map(
                    (
                      { id: candidateId, additional_info: candidate },
                      index
                    ) => (
                      <tr
                        key={index}
                        onClick={() =>
                          navigate(
                            replaceRouteParam(
                              ROUTES.ONBOARD.CANDIDATE_FORM.VIEW,
                              {
                                id: candidateId,
                              }
                            )
                          )
                        }
                      >
                        <td>{candidate.onboarding.status}</td>
                        <td>
                          {
                            candidate.profession.previousExperience?.[0]
                              ?.employerName
                          }
                        </td>
                        <td>
                          {candidate.relocation.preference === "guestHouse"
                            ? "Yes"
                            : "No"}
                        </td>
                        <td>
                          {candidate.profession.technologiesKnown.join(", ")}
                        </td>
                        <td>{candidate.offerLetter.marketingName}</td>
                        <td>{candidate.offerLetter.designation}</td>
                        <td>{`${candidate.profession.experience.years} years and ${candidate.profession.experience.months} months`}</td>
                        <td>{`${candidate.personal.usaLocation.city}, ${candidate.personal.usaLocation.state}`}</td>
                        <td>{candidate.relocation.interested}</td>
                        <td>{candidate.personal.firstName}</td>
                        <td>{candidate.personal.lastName}</td>
                        <td>{candidate.personal.referenceName}</td>
                        <td>{candidate.miscellaneous.remarks}</td>
                        <td>{candidate.personal.phoneNumber}</td>
                        <td>{candidate.personal.emailId}</td>
                        <td>{candidate.offerLetter.status}</td>
                        <td>{candidate.personal.dob}</td>
                        <td>{candidate.education.graduatedUniversity.name}</td>
                        <td>{candidate.miscellaneous.notes}</td>
                      </tr>
                    )
                  )
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
