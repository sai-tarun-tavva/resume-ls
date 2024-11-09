/**
 * Constants representing different visa status values.
 * These are used throughout the application to manage various types of visa statuses.
 */
export const VISA_STATUS_VALUES = {
  ASYLUM_REFUGEE: "Asylum-Refugee", // Asylum or refugee status
  E1: "E-1", // E-1 visa (Treaty Trader)
  E2: "E-2", // E-2 visa (Treaty Investor)
  E3: "E-3", // E-3 visa (Specialty Occupation Professionals from Australia)
  EAD: "EAD", // Employment Authorization Document
  EB1: "EB-1", // EB-1 visa (Priority Workers)
  EB2: "EB-2", // EB-2 visa (Advanced Degree Professionals)
  EB3: "EB-3", // EB-3 visa (Skilled Workers, Professionals)
  F1CPT: "F-1-CPT", // F-1 CPT (Curricular Practical Training)
  F1OPT: "F-1-OPT", // F-1 OPT (Optional Practical Training)
  GREEN_CARD: "GreenCard", // Green Card (Permanent Resident)
  H1B: "H-1B", // H-1B visa (Specialty Occupations)
  H4: "H-4", // H-4 visa (Dependent of H-1B Holder)
  J1: "J-1", // J-1 visa (Exchange Visitor)
  J2: "J-2", // J-2 visa (Dependent of J-1 Holder)
  L1: "L-1", // L-1 visa (Intracompany Transferee)
  L2: "L-2", // L-2 visa (Dependent of L-1 Holder)
  OTHERS: "others", // Other visa types
  TN: "TN", // TN visa (NAFTA Professionals)
  US_CITIZEN: "USCitizen", // US Citizen status
};

/**
 * Options for various sections of the form.
 * These options are used for dropdowns and selection fields in the UI.
 */
export const OPTIONS = {
  // Onboarding status options
  ONBOARDING_STATUS: [
    { value: "", label: "" }, // Placeholder option
    { value: "applied", label: "Applied" },
    { value: "yetToStart", label: "Yet To Start" },
    { value: "inProgress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ],
  // Gender options
  GENDER: [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ],
  // Marital status options
  MARITAL_STATUS: [
    { value: "", label: "" }, // Placeholder option
    { value: "single", label: "Single" },
    { value: "married", label: "Married" },
    { value: "divorced", label: "Divorced" },
    { value: "widowed", label: "Widowed" },
  ],
  // Visa status options with labels mapping to the `VISA_STATUS_VALUES`
  VISA_STATUS: [
    { value: "", label: "" }, // Placeholder option
    {
      value: VISA_STATUS_VALUES.ASYLUM_REFUGEE,
      label: "Asylum/Refugee (Granted Protection in the U.S.)",
    },
    {
      value: VISA_STATUS_VALUES.E1,
      label: "E-1 (Treaty Trader)",
    },
    {
      value: VISA_STATUS_VALUES.E2,
      label: "E-2 (Treaty Investor)",
    },
    {
      value: VISA_STATUS_VALUES.E3,
      label: "E-3 (Specialty Occupation Professionals from Australia)",
    },
    {
      value: VISA_STATUS_VALUES.EAD,
      label: "EAD (Employment Authorization Document)",
    },
    {
      value: VISA_STATUS_VALUES.EB1,
      label: "EB-1 (Employment-based Permanent Residency - Priority Workers)",
    },
    {
      value: VISA_STATUS_VALUES.EB2,
      label:
        "EB-2 (Employment-based Permanent Residency - Advanced Degree Professionals)",
    },
    {
      value: VISA_STATUS_VALUES.EB3,
      label:
        "EB-3 (Employment-based Permanent Residency - Skilled Workers, Professionals)",
    },
    {
      value: VISA_STATUS_VALUES.F1CPT,
      label: "F1-CPT (Curricular Practical Training for F-1 Students)",
    },
    {
      value: VISA_STATUS_VALUES.F1OPT,
      label: "F1-OPT (Optional Practical Training for F-1 Students)",
    },
    {
      value: VISA_STATUS_VALUES.GREEN_CARD,
      label: "Green Card (Lawful Permanent Resident)",
    },
    {
      value: VISA_STATUS_VALUES.H1B,
      label: "H-1B (Specialty Occupations - Engineers, IT Professionals, etc.)",
    },
    {
      value: VISA_STATUS_VALUES.H4,
      label: "H-4 (Dependent of H-1B Holder)",
    },
    {
      value: VISA_STATUS_VALUES.J1,
      label: "J-1 (Exchange Visitor - Interns, Trainees, Scholars, etc.)",
    },
    {
      value: VISA_STATUS_VALUES.J2,
      label: "J-2 (Dependent of J-1 Holder)",
    },
    {
      value: VISA_STATUS_VALUES.L1,
      label: "L-1 (Intracompany Transferee - Managers and Executives)",
    },
    {
      value: VISA_STATUS_VALUES.L2,
      label: "L-2 (Dependent of L-1 Holder)",
    },
    {
      value: VISA_STATUS_VALUES.TN,
      label: "TN (NAFTA Professionals - Canada & Mexico)",
    },
    { value: VISA_STATUS_VALUES.US_CITIZEN, label: "U.S. Citizen" },
    { value: VISA_STATUS_VALUES.OTHERS, label: "Other Visa Types" },
  ],
  // Photo ID type options
  PHOTO_ID_TYPE: [
    { value: "", label: "" }, // Placeholder option
    { value: "DL", label: "Driver's License" },
    { value: "StateID", label: "State ID" },
  ],
  // Country options (India and USA)
  COUNTRY: [
    { value: "", label: "" }, // Placeholder option
    { value: "india", label: "India" },
    { value: "usa", label: "USA" },
  ],
  // Indian state options
  STATE_INDIA: [
    { value: "", label: "" }, // Placeholder option
    { value: "AP", label: "Andhra Pradesh" },
    { value: "AR", label: "Arunachal Pradesh" },
    { value: "AS", label: "Assam" },
    { value: "BR", label: "Bihar" },
    { value: "CT", label: "Chhattisgarh" },
    { value: "GA", label: "Goa" },
    { value: "GJ", label: "Gujarat" },
    { value: "HR", label: "Haryana" },
    { value: "HP", label: "Himachal Pradesh" },
    { value: "JH", label: "Jharkhand" },
    { value: "KA", label: "Karnataka" },
    { value: "KL", label: "Kerala" },
    { value: "MP", label: "Madhya Pradesh" },
    { value: "MH", label: "Maharashtra" },
    { value: "MN", label: "Manipur" },
    { value: "ML", label: "Meghalaya" },
    { value: "MZ", label: "Mizoram" },
    { value: "NL", label: "Nagaland" },
    { value: "OR", label: "Odisha" },
    { value: "PB", label: "Punjab" },
    { value: "RJ", label: "Rajasthan" },
    { value: "SK", label: "Sikkim" },
    { value: "TN", label: "Tamil Nadu" },
    { value: "TG", label: "Telangana" },
    { value: "TR", label: "Tripura" },
    { value: "UP", label: "Uttar Pradesh" },
    { value: "UK", label: "Uttarakhand" },
    { value: "WB", label: "West Bengal" },
  ],
  // US state options
  STATE_USA: [
    { value: "", label: "" }, // Placeholder option
    { value: "AL", label: "Alabama" },
    { value: "AK", label: "Alaska" },
    { value: "AZ", label: "Arizona" },
    { value: "AR", label: "Arkansas" },
    { value: "CA", label: "California" },
    { value: "CO", label: "Colorado" },
    { value: "CT", label: "Connecticut" },
    { value: "DE", label: "Delaware" },
    { value: "FL", label: "Florida" },
    { value: "GA", label: "Georgia" },
    { value: "HI", label: "Hawaii" },
    { value: "ID", label: "Idaho" },
    { value: "IL", label: "Illinois" },
    { value: "IN", label: "Indiana" },
    { value: "IA", label: "Iowa" },
    { value: "KS", label: "Kansas" },
    { value: "KY", label: "Kentucky" },
    { value: "LA", label: "Louisiana" },
    { value: "ME", label: "Maine" },
    { value: "MD", label: "Maryland" },
    { value: "MA", label: "Massachusetts" },
    { value: "MI", label: "Michigan" },
    { value: "MN", label: "Minnesota" },
    { value: "MS", label: "Mississippi" },
    { value: "MO", label: "Missouri" },
    { value: "MT", label: "Montana" },
    { value: "NE", label: "Nebraska" },
    { value: "NV", label: "Nevada" },
    { value: "NH", label: "New Hampshire" },
    { value: "NJ", label: "New Jersey" },
    { value: "NM", label: "New Mexico" },
    { value: "NY", label: "New York" },
    { value: "NC", label: "North Carolina" },
    { value: "ND", label: "North Dakota" },
    { value: "OH", label: "Ohio" },
    { value: "OK", label: "Oklahoma" },
    { value: "OR", label: "Oregon" },
    { value: "PA", label: "Pennsylvania" },
    { value: "RI", label: "Rhode Island" },
    { value: "SC", label: "South Carolina" },
    { value: "SD", label: "South Dakota" },
    { value: "TN", label: "Tennessee" },
    { value: "TX", label: "Texas" },
    { value: "UT", label: "Utah" },
    { value: "VT", label: "Vermont" },
    { value: "VA", label: "Virginia" },
    { value: "WA", label: "Washington" },
    { value: "WV", label: "West Virginia" },
    { value: "WI", label: "Wisconsin" },
    { value: "WY", label: "Wyoming" },
  ],
  // How soon the candidate is willing to relocate
  HOW_SOON_RELOCATION: [
    { value: "", label: "" }, // Placeholder option
    { value: "withinTwoWeeks", label: "Within 2 weeks" },
    { value: "moreThanTwoWeeks", label: "More than 2 weeks" },
  ],
  // Relocation preference options
  STAY_PREFERENCE: [
    { value: "", label: "" }, // Placeholder option
    { value: "guestHouse", label: "Opt for guest house" },
    { value: "other", label: "Other" },
  ],
  // Experience months (from 0 to 11)
  EXPERIENCE_MONTHS: [
    { value: "", label: "" }, // Placeholder option
    ...Array.from({ length: 12 }, (_, i) => ({
      value: `${i}`,
      label: `${i}`,
    })),
  ],
  // Offer letter status options
  OFFER_LETTER_STATUS: [
    { value: "", label: "" }, // Placeholder option
    { value: "inProgress", label: "In Progress" },
    { value: "accepted", label: "Accepted" },
    { value: "rejected", label: "Rejected" },
  ],
};
