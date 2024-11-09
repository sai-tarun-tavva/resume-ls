import { VISA_STATUS_VALUES } from "./selectOptions";

/**
 * VISA_STATUS_VALUES.F1CPT and VISA_STATUS_VALUES.F1OPT are types of student visas
 * where candidates are required to provide education details.
 */
export const EDUCATION_REQUIRED_VISA = [
  VISA_STATUS_VALUES.F1CPT, // F1 CPT visa holders require education details
  VISA_STATUS_VALUES.F1OPT, // F1 OPT visa holders require education details
];

/**
 * These visa statuses do not require an Employment Authorization Document (EAD).
 * Typically, these are work visas or citizenship statuses that do not need an EAD.
 */
export const EAD_NOT_REQUIRED_VISA = [
  VISA_STATUS_VALUES.H1B, // H1B visa holders do not need EAD
  VISA_STATUS_VALUES.US_CITIZEN, // US citizens do not need EAD
];

/**
 * These visa statuses have optional EAD requirements.
 * For example, L2, J1, and others may allow candidates to optionally apply for an EAD.
 */
export const EAD_OPTIONAL_VISA = [
  VISA_STATUS_VALUES.L2, // L2 visa holders have optional EAD requirements
  VISA_STATUS_VALUES.J1, // J1 visa holders have optional EAD requirements
  VISA_STATUS_VALUES.OTHERS, // Other visa types may also have optional EAD
];

/**
 * These visa statuses do not require a home country address contact.
 * These are typically visas where the candidate's status already guarantees sufficient contact information
 * or are US citizens or permanent residents.
 */
export const HOME_ADDRESS_CONTACT_NOT_REQUIRED_VISA = [
  VISA_STATUS_VALUES.GREEN_CARD, // Green Card holders do not need home country contact
  VISA_STATUS_VALUES.US_CITIZEN, // US citizens do not need home country contact
  VISA_STATUS_VALUES.EB1, // EB1 visa holders do not need home country contact
  VISA_STATUS_VALUES.EB2, // EB2 visa holders do not need home country contact
  VISA_STATUS_VALUES.EB3, // EB3 visa holders do not need home country contact
];

/**
 * These visa statuses allow for an optional home country address contact.
 * Candidates with certain visa statuses may provide this information optionally.
 */
export const HOME_ADDRESS_CONTACT_OPTIONAL_VISA = [
  VISA_STATUS_VALUES.OTHERS, // Other visa types may optionally provide home country contact
];

/**
 * These visa statuses do not require a port of entry for the candidate to provide.
 * For example, US citizens do not need to provide a port of entry.
 */
export const PORT_OF_ENTRY_NOT_REQUIRED_VISA = [VISA_STATUS_VALUES.US_CITIZEN];

/**
 * These visa statuses have an optional port of entry, where the candidate can provide it if needed.
 * For example, candidates with certain visa types may optionally provide this information.
 */
export const PORT_OF_ENTRY_OPTIONAL_VISA = [VISA_STATUS_VALUES.OTHERS];

/**
 * These visa statuses allow US stay addresses to be provided optionally.
 * Typically, Green Card holders, US citizens, and certain other visa holders may provide US stay addresses.
 */
export const US_STAY_ADDRESSES_OPTIONAL_VISA = [
  VISA_STATUS_VALUES.GREEN_CARD, // Green Card holders may optionally provide US stay address
  VISA_STATUS_VALUES.US_CITIZEN, // US citizens may optionally provide US stay address
  VISA_STATUS_VALUES.OTHERS, // Other visa types may optionally provide US stay address
];
