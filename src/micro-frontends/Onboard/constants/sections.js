import InputV2 from "../../Atoms/components/Inputs/InputV2";
import Select from "../../Atoms/components/Inputs/Select";

export const sections = [
  {
    title: "Onboarding",
    fields: [
      {
        id: "onboardingDate",
        label: "Date",
        type: "date",
        element: <InputV2 />,
      },
      {
        id: "onboardingStatus",
        label: "Status",
        options: [
          { value: "", label: "Status" },
          { value: "inProgress", label: "In Progress" },
          { value: "started", label: "Started" },
        ],
        element: <Select />,
      },
    ],
  },
  {
    title: "Personal",
    fields: [
      { id: "firstName", label: "First Name", type: "text" },
      { id: "lastName", label: "Last Name", type: "text" },
      { id: "emailId", label: "Email ID", type: "email" },
      { id: "phoneNumber", label: "Phone Number", type: "tel" },
      { id: "dobMonth", label: "Date of Birth (Month)", type: "text" },
      { id: "dobYear", label: "Date of Birth (Year)", type: "text" },
      { id: "maritalStatus", label: "Marital Status", type: "text" },
      { id: "passportNumber", label: "Passport Number", type: "text" },
      { id: "visaStatus", label: "Visa Status", type: "text" },
      { id: "photoIDType", label: "Photo ID Type", type: "text" },
      { id: "photoIDNumber", label: "Photo ID Number", type: "text" },
      { id: "eadNumber", label: "EAD Number", type: "text" },
      { id: "SSN", label: "SSN", type: "text" },
      { id: "skypeId", label: "Skype ID", type: "text" },
      { id: "referenceName", label: "Reference Name", type: "text" },
    ],
  },
  {
    title: "Current Location",
    fields: [
      { id: "currentAddress1", label: "Address Line 1", type: "text" },
      { id: "currentAddress2", label: "Address Line 2", type: "text" },
      { id: "currentCity", label: "City", type: "text" },
      { id: "currentState", label: "State", type: "text" },
      { id: "currentCountry", label: "Country", type: "text" },
      { id: "currentZipcode", label: "Zipcode", type: "text" },
    ],
  },
  {
    title: "Relocation",
    fields: [
      {
        id: "relocationInterested",
        label: "Interested in Relocation",
        type: "text",
      },
      {
        id: "relocationPreference",
        label: "Relocation Preference",
        type: "text",
      },
    ],
  },
  {
    title: "Education",
    fields: [
      { id: "sevisID", label: "SEVIS ID", type: "text" },
      { id: "dsoName", label: "DSO Name", type: "text" },
      { id: "dsoEmail", label: "DSO Email", type: "email" },
      { id: "dsoPhone", label: "DSO Phone", type: "tel" },
      {
        id: "graduatedUniversityName",
        label: "Graduated University Name",
        type: "text",
      },
      {
        id: "graduatedUniversityPassedYear",
        label: "Passed Year",
        type: "text",
      },
      { id: "graduatedUniversityStream", label: "Stream", type: "text" },
    ],
  },
  {
    title: "Profession",
    fields: [
      { id: "trainingAttended", label: "Training Attended", type: "text" },
      { id: "experienceYears", label: "Experience (Years)", type: "number" },
      { id: "experienceMonths", label: "Experience (Months)", type: "number" },
    ],
  },
  {
    title: "Offer Letter",
    fields: [
      { id: "status", label: "Status", type: "text" },
      { id: "offeredDate", label: "Offered Date", type: "date" },
      { id: "designation", label: "Designation", type: "text" },
      { id: "startDate", label: "Start Date", type: "date" },
      { id: "endDate", label: "End Date", type: "date" },
      {
        id: "rolesAndResponsibilities",
        label: "Roles and Responsibilities",
        type: "textarea",
      },
    ],
  },
  {
    title: "US Travel and Stay",
    fields: [
      { id: "usEntryMonth", label: "US Entry Month", type: "text" },
      { id: "usEntryYear", label: "US Entry Year", type: "text" },
    ],
  },
  {
    title: "Emergency Contacts",
    fields: [
      { id: "usaContactName", label: "USA Contact Name", type: "text" },
      { id: "usaContactPhone", label: "USA Contact Phone", type: "tel" },
      {
        id: "homeCountryContactName",
        label: "Home Country Contact Name",
        type: "text",
      },
      {
        id: "homeCountryContactPhone",
        label: "Home Country Contact Phone",
        type: "tel",
      },
    ],
  },
  {
    title: "Additional Information",
    fields: [
      { id: "remarks", label: "Remarks", type: "textarea" },
      { id: "notes", label: "Notes", type: "textarea" },
    ],
  },
];
