/**
 * These options are used for dropdowns and selection fields in the UI.
 */
export const OPTIONS = {
  // Onboarding status options
  CANDIDATES_PER_PAGE: [
    {
      value: "20",
      label: "20",
    },
    {
      value: "50",
      label: "50",
    },
    {
      value: "100",
      label: "100",
    },
    {
      value: "250",
      label: "250",
    },
    {
      value: "500",
      label: "500",
    },
  ],
};

export const BATCH_PROCESS_STATUS = {
  NO_FILES: "no-files",
  PROCESSING: "processing",
  PROCESSING_WARNING: "processing-warning",
  ERROR: "error",
  PROCESSED: "processed",
};
