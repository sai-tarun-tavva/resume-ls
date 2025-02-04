import { VISA_STATUS_VALUES } from "./selectOptions";

/**
 * PASSPORT_OPTIONAL_VISA lists visa statuses where a passport is optional.
 * These visa statuses typically indicate that the candidate is either a citizen,
 * lawful permanent resident, or holds a work visa that does not mandate a passport
 * for employment authorization purposes.
 */
export const PASSPORT_OPTIONAL_VISA = [
  VISA_STATUS_VALUES.H1B, // H1B visa holders may optionally provide passport number
  VISA_STATUS_VALUES.TN, // TN visa holders may optionally provide passport number
  VISA_STATUS_VALUES.GREEN_CARD, // Greencard visa holders may optionally provide passport number
  VISA_STATUS_VALUES.US_CITIZEN, // US Citizens may optionally provide passport number
];

/**
 * VISA_STATUS_VALUES.CPT, VISA_STATUS_VALUES.OPT_EAD, and VISA_STATUS_VALUES.STEM_OPT
 * are types of student visas where candidates are required to provide SEVIS ID
 * and DSO (Designated School Official) details.
 */
export const SEVIS_DSO_REQUIRED_VISA = [
  VISA_STATUS_VALUES.CPT, // CPT visa holders require SEVIS ID and DSO details
  VISA_STATUS_VALUES.OPT_EAD, // OPT visa holders require SEVIS ID and DSO details
  VISA_STATUS_VALUES.STEM_OPT, // STEM OPT visa holders require SEVIS ID and DSO details
];

/**
 * These visa statuses are university-specific and require CPT, STEM OPT, or OPT EAD.
 * Candidates need SEVIS ID and DSO details as part of their documentation.
 */
export const UNIVERSITY_DETAILS_REQUIRED_VISA = [
  VISA_STATUS_VALUES.CPT, // CPT visa holders are associated with university programs
  VISA_STATUS_VALUES.STEM_OPT, // STEM OPT is typically associated with degree programs
  VISA_STATUS_VALUES.OPT_EAD, // OPT EAD requires university and SEVIS information
];

/**
 * These visa statuses are company-specific and require employment details,
 * such as job offers or sponsorship for EAD.
 */
export const COMPANY_DETAILS_REQUIRED_VISA = [
  VISA_STATUS_VALUES.CPT, // CPT requires a company offer letter for eligibility
  VISA_STATUS_VALUES.STEM_OPT, // STEM OPT requires employer details and E-Verify registration
  VISA_STATUS_VALUES.OPT_EAD, // OPT EAD needs a valid job offer and employment authorization
];

/**
 * These visa statuses do not require an Employment Authorization Document (EAD).
 * These are typically work visas, citizenship statuses, or lawful permanent resident statuses
 * that inherently provide employment authorization.
 */
export const EAD_NOT_REQUIRED_VISA = [
  VISA_STATUS_VALUES.H1B, // H1B visa holders do not need EAD
  VISA_STATUS_VALUES.US_CITIZEN, // US citizens do not need EAD
  VISA_STATUS_VALUES.GREEN_CARD, // Green card holders do not need EAD
  VISA_STATUS_VALUES.TN, // H1B visa holders do not need EAD
];

/**
 * These visa statuses have optional EAD requirements.
 * Candidates with these statuses may apply for an EAD based on their circumstances.
 */
export const EAD_OPTIONAL_VISA = [
  VISA_STATUS_VALUES.L2, // L2 visa holders may optionally apply for an EAD
  VISA_STATUS_VALUES.J1, // J1 visa holders may optionally apply for an EAD
  VISA_STATUS_VALUES.OTHERS, // Other visa types may also have optional EAD
];

/**
 * These visa statuses do not require a home country address.
 * These are typically granted statuses (e.g., US Citizen, Green Card holder)
 * or employment-based visas that do not mandate a home country address.
 */
export const HOME_ADDRESS_NOT_REQUIRED_VISA = [
  VISA_STATUS_VALUES.GREEN_CARD, // Green Card holders do not need to provide home country contact
  VISA_STATUS_VALUES.GC_EAD, // GC EAD holders do not need to provide home country contact
  VISA_STATUS_VALUES.US_CITIZEN, // US citizens do not need to provide home country contact
  VISA_STATUS_VALUES.EB1, // EB1 visa holders do not need to provide home country contact
  VISA_STATUS_VALUES.EB2, // EB2 visa holders do not need to provide home country contact
  VISA_STATUS_VALUES.EB3, // EB3 visa holders do not need to provide home country contact
];

/**
 * These visa statuses allow for an optional home country address.
 * Candidates with these visa statuses can provide this information optionally if needed.
 */
export const HOME_ADDRESS_OPTIONAL_VISA = [
  VISA_STATUS_VALUES.H1B, // H1B visa holders may optionally provide home country contact
  VISA_STATUS_VALUES.OTHERS, // Other visa types may optionally provide home country contact
];

/**
 * These visa statuses do not require a port of entry.
 * For example, US citizens and certain permanent statuses do not require this information.
 */
export const PORT_OF_ENTRY_NOT_REQUIRED_VISA = [
  VISA_STATUS_VALUES.US_CITIZEN, // US citizens do not need to provide a port of entry
];

/**
 * These visa statuses allow for an optional port of entry.
 * Candidates with these statuses may provide this information optionally if relevant.
 */
export const PORT_OF_ENTRY_OPTIONAL_VISA = [
  VISA_STATUS_VALUES.OTHERS, // Other visa types may optionally provide port of entry details
];

/**
 * These visa statuses allow US stay addresses to be provided optionally.
 * Typically, Green Card holders, US citizens, and certain visa holders have the option
 * to provide their US stay address if they choose.
 */
export const US_STAY_ADDRESSES_OPTIONAL_VISA = [
  VISA_STATUS_VALUES.H1B, // H1B visa holders may optionally provide US stay address
  VISA_STATUS_VALUES.TN, // TN visa holders may optionally provide US stay address
  VISA_STATUS_VALUES.GREEN_CARD, // Green Card holders may optionally provide US stay address
  VISA_STATUS_VALUES.GC_EAD, // GC EAD holders may optionally provide US stay address
  VISA_STATUS_VALUES.US_CITIZEN, // US citizens may optionally provide US stay address
  VISA_STATUS_VALUES.OTHERS, // Other visa types may optionally provide US stay address
];
