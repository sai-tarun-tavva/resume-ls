/**
 * Constants representing different visa status values.
 * These are used throughout the application to manage various types of visa statuses.
 */
export const VISA_STATUS_VALUES = {
  H1B: "H-1B", // H-1B visa (Specialty Occupations)
  H4_EAD: "H4-EAD", // H-4 EAD (Employment Authorization Document for H-4 Holders)
  L2: "L-2", // L-2 visa (Dependent of L-1 Holder)
  TN: "TN", // TN visa (NAFTA Professionals)
  E3: "E-3", // E-3 visa (Specialty Occupation Professionals from Australia)
  H4: "H-4", // H-4 visa (Dependent of H-1B Holder)
  CPT: "CPT", // Curricular Practical Training
  STEM_OPT: "STEM-OPT", // STEM Optional Practical Training
  OPT_EAD: "OPT-EAD", // Optional Practical Training Employment Authorization Document
  J1: "J-1", // J-1 visa (Exchange Visitor)
  J2: "J-2", // J-2 visa (Dependent of J-1 Holder)
  EB1: "EB-1", // EB-1 visa (Priority Workers)
  EB2: "EB-2", // EB-2 visa (Advanced Degree Professionals)
  EB3: "EB-3", // EB-3 visa (Skilled Workers, Professionals)
  GREEN_CARD: "Green-Card", // Green Card (Permanent Resident)
  GC_EAD: "GC-EAD", // Green Card Employment Authorization Document
  US_CITIZEN: "US-Citizen", // US Citizen status
  ASYLUM_REFUGEE: "Asylum/refugee", // Asylum or refugee status
  EAD: "EAD", // Employment Authorization Document
  OTHERS: "Others", // Other visa types
};

/**
 * Constants representing different onboarding status values.
 */
export const SUBMISSION_STATUS_VALUES = {
  SUBMITTED: "submitted",
  INTERVIEWED: "interviewed",
  NO_RESPONSE: "noResponse",
  HOLD: "hold",
  SELECTED: "selected",
  REJECTED: "rejected",
};

/**
 * Constants representing different onboarding status labels.
 */
export const SUBMISSION_STATUS_LABELS = {
  SUBMITTED: "Submitted",
  INTERVIEWED: "Interviewed",
  NO_RESPONSE: "No Response",
  HOLD: "Hold",
  SELECTED: "Selected",
  REJECTED: "Rejected",
};

/**
 * Options for various sections of the form.
 * These options are used for dropdowns and selection fields in the UI.
 */
export const OPTIONS = {
  // Submission status options
  SUBMISSION_STATUS: [
    {
      value: SUBMISSION_STATUS_VALUES.SUBMITTED,
      label: SUBMISSION_STATUS_LABELS.SUBMITTED,
    },
    {
      value: SUBMISSION_STATUS_VALUES.INTERVIEWED,
      label: SUBMISSION_STATUS_LABELS.INTERVIEWED,
    },
    {
      value: SUBMISSION_STATUS_VALUES.NO_RESPONSE,
      label: SUBMISSION_STATUS_LABELS.NO_RESPONSE,
    },
    {
      value: SUBMISSION_STATUS_VALUES.HOLD,
      label: SUBMISSION_STATUS_LABELS.HOLD,
    },
    {
      value: SUBMISSION_STATUS_VALUES.SELECTED,
      label: SUBMISSION_STATUS_LABELS.SELECTED,
    },
    {
      value: SUBMISSION_STATUS_VALUES.REJECTED,
      label: SUBMISSION_STATUS_LABELS.REJECTED,
    },
  ],
  // Visa status options with labels mapping to the `VISA_STATUS_VALUES`
  VISA_STATUS: [
    { value: "", label: "" }, // Placeholder option
    {
      value: VISA_STATUS_VALUES.ASYLUM_REFUGEE,
      label: "Asylum/Refugee (Granted Protection in the U.S.)",
    },
    {
      value: VISA_STATUS_VALUES.EAD,
      label: "EAD (Employment Authorization Document)",
    },
    {
      value: VISA_STATUS_VALUES.H1B,
      label: "H-1B (Specialty Occupations - Engineers, IT Professionals, etc.)",
    },
    {
      value: VISA_STATUS_VALUES.H4_EAD,
      label: "H-4 EAD (Employment Authorization Document for H-4 Holders)",
    },
    {
      value: VISA_STATUS_VALUES.H4,
      label: "H-4 (Dependent of H-1B Holder)",
    },
    {
      value: VISA_STATUS_VALUES.L2,
      label: "L-2 (Dependent of L-1 Holder)",
    },
    {
      value: VISA_STATUS_VALUES.TN,
      label: "TN (NAFTA Professionals - Canada & Mexico)",
    },
    {
      value: VISA_STATUS_VALUES.E3,
      label: "E-3 (Specialty Occupation Professionals from Australia)",
    },
    {
      value: VISA_STATUS_VALUES.CPT,
      label: "CPT (Curricular Practical Training for F-1 Students)",
    },
    {
      value: VISA_STATUS_VALUES.STEM_OPT,
      label: "STEM OPT (Optional Practical Training for STEM Graduates)",
    },
    {
      value: VISA_STATUS_VALUES.OPT_EAD,
      label:
        "OPT EAD (Optional Practical Training Employment Authorization Document)",
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
      value: VISA_STATUS_VALUES.GREEN_CARD,
      label: "Green Card (Lawful Permanent Resident)",
    },
    {
      value: VISA_STATUS_VALUES.GC_EAD,
      label: "GC EAD (Green Card Employment Authorization Document)",
    },
    {
      value: VISA_STATUS_VALUES.US_CITIZEN,
      label: "U.S. Citizen",
    },
    {
      value: VISA_STATUS_VALUES.OTHERS,
      label: "Other Visa Types",
    },
  ],
  // Experience months (from 0 to 11)
  EXPERIENCE_MONTHS: [
    { value: "", label: "" }, // Placeholder option
    ...Array.from({ length: 12 }, (_, i) => ({
      value: `${i}`,
      label: `${i}`,
    })),
  ],
  // Rate frequency options
  RATE_FREQUENCY: [
    {
      value: "",
      label: "",
    },
    {
      value: "hourly",
      label: "Hourly",
    },
    {
      value: "daily",
      label: "Daily",
    },
    {
      value: "weekly",
      label: "Weekly",
    },
    {
      value: "biweekly",
      label: "Bi-Weekly (Every Two Weeks)",
    },
    {
      value: "monthly",
      label: "Monthly",
    },
    {
      value: "quarterly",
      label: "Quarterly",
    },
    {
      value: "semi_annually",
      label: "Semi-Annually (Every Six Months)",
    },
    {
      value: "annually",
      label: "Annually",
    },
  ],
};
