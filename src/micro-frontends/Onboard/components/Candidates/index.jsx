import { useEffect, useState } from "react";
import classes from "./index.module.scss";
import FloatingButton from "../../../Atoms/components/FloatingButton";
import { fetchOnboardCandidates } from "../../../../utilities/api";

const OnboardCandidates = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      const { data } = await fetchOnboardCandidates();

      setCandidates(data);
    };

    fetchCandidates();
  }, []);

  return (
    <>
      <div className={classes.tableContainer}>
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
                Offer
              </th>
              <th title="OfferDate" style={{ width: "10rem" }}>
                Offer Date
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
              candidates.map((candidate, index) => (
                <tr key={index}>
                  <td>{candidate.status}</td>
                  <td>{candidate.companyName}</td>
                  <td>{candidate.guestHouseMember}</td>
                  <td>{candidate.technology}</td>
                  <td>{candidate.marketingName}</td>
                  <td>{candidate.position}</td>
                  <td>{candidate.experience}</td>
                  <td>{candidate.location}</td>
                  <td>{candidate.relocation}</td>
                  <td>{candidate.firstName}</td>
                  <td>{candidate.lastName}</td>
                  <td>{candidate.referenceName}</td>
                  <td>{candidate.remarks}</td>
                  <td>{candidate.phone}</td>
                  <td>{candidate.emailId}</td>
                  <td>{candidate.offer}</td>
                  <td>{candidate.offerDate}</td>
                  <td>{candidate.dateOfBirth}</td>
                  <td>{candidate.university}</td>
                  <td>{candidate.notes}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="21">No candidates available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <FloatingButton
        clickHandler={() => {}}
        title={"Onboard new candidate"}
        icon={<i className="bi bi-person-plus" />}
      />
    </>
  );
};

OnboardCandidates.displayName = "OnboardCandidates";
export default OnboardCandidates;
