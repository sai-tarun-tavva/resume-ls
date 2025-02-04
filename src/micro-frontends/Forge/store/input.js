import { createSlice } from "@reduxjs/toolkit";
import { SECTIONS, FIELDS } from "../constants";

// Initial state of the input slice
const initialState = {
  currentSectionIndex: 0, // Index of the current section in the form
  isEditMode: false, // Flag indicating whether the form is in edit mode
  shouldSubmitFormSection: false, // Flag for whether the section can be submitted
  data: {
    sales: {
      // Sales sections and their fields, initialized with default values
      [SECTIONS.SALES.RECORD]: {
        [FIELDS.SALES.RECORD.ID]: "",
        [FIELDS.SALES.RECORD.CREATED_DATE]: "",
        [FIELDS.SALES.RECORD.UPDATED_DATE]: "",
      },
      [SECTIONS.SALES.SUBMISSION]: {
        completed: "",
        [FIELDS.SALES.SUBMISSION.DATE]: "",
        [FIELDS.SALES.SUBMISSION.STATUS]: "",
        [FIELDS.SALES.SUBMISSION.BY]: "",
      },
      [SECTIONS.SALES.CANDIDATE]: {
        completed: "",
        [FIELDS.SALES.CANDIDATE.FIRST_NAME]: "",
        [FIELDS.SALES.CANDIDATE.LAST_NAME]: "",
      },
      [SECTIONS.SALES.REQUIREMENT]: {
        completed: "",
        [FIELDS.SALES.REQUIREMENT.CLIENT_NAME]: "",
        [FIELDS.SALES.REQUIREMENT.POSITION]: "",
        [FIELDS.SALES.REQUIREMENT.RATE.LABEL]: {
          [FIELDS.SALES.REQUIREMENT.RATE.FREQUENCY]: "",
          [FIELDS.SALES.REQUIREMENT.RATE.VALUE]: "",
        },
        [FIELDS.SALES.REQUIREMENT.TERMS]: "",
        [FIELDS.SALES.REQUIREMENT.CITY]: "",
        [FIELDS.SALES.REQUIREMENT.STATE]: "",
        [FIELDS.SALES.REQUIREMENT.PRIME_VENDOR]: "",
        [FIELDS.SALES.REQUIREMENT.IMPLEMENTOR]: "",
      },
      [SECTIONS.SALES.VENDOR]: {
        completed: "",
        [FIELDS.SALES.VENDOR.NAME]: "",
        [FIELDS.SALES.VENDOR.COMPANY]: "",
        [FIELDS.SALES.VENDOR.PHONE]: "",
        [FIELDS.SALES.VENDOR.ALTERNATE_PHONE]: "",
        [FIELDS.SALES.VENDOR.EXTENSION]: "",
        [FIELDS.SALES.VENDOR.EMAIL]: "",
      },
      [SECTIONS.SALES.MISCELLANEOUS]: {
        completed: "",
        [FIELDS.SALES.MISCELLANEOUS.REMARKS]: "",
      },
    },
    recruit: {
      // Recruit sections and their fields, initialized with default values
      [SECTIONS.RECRUIT.RECORD]: {
        [FIELDS.RECRUIT.RECORD.ID]: "",
        [FIELDS.RECRUIT.RECORD.CREATED_DATE]: "",
        [FIELDS.RECRUIT.RECORD.UPDATED_DATE]: "",
      },
      [SECTIONS.RECRUIT.SUBMISSION]: {
        completed: "",
        [FIELDS.RECRUIT.SUBMISSION.DATE]: "",
        [FIELDS.RECRUIT.SUBMISSION.STATUS]: "",
        [FIELDS.RECRUIT.SUBMISSION.BY]: "",
      },
      [SECTIONS.RECRUIT.CANDIDATE]: {
        completed: "",
        [FIELDS.RECRUIT.CANDIDATE.FIRST_NAME]: "",
        [FIELDS.RECRUIT.CANDIDATE.LAST_NAME]: "",
        [FIELDS.RECRUIT.CANDIDATE.PHONE_NUMBER]: "",
        [FIELDS.RECRUIT.CANDIDATE.EMAIL_ID]: "",
        [FIELDS.RECRUIT.CANDIDATE.CITY]: "",
        [FIELDS.RECRUIT.CANDIDATE.STATE]: "",
        [FIELDS.RECRUIT.CANDIDATE.VISA_STATUS]: "",
        [FIELDS.RECRUIT.CANDIDATE.EXPERIENCE.VALUE]: {
          [FIELDS.RECRUIT.CANDIDATE.EXPERIENCE.YEARS]: "",
          [FIELDS.RECRUIT.CANDIDATE.EXPERIENCE.MONTHS]: "",
        },
      },
      [SECTIONS.RECRUIT.REQUIREMENT]: {
        completed: "",
        [FIELDS.RECRUIT.REQUIREMENT.CLIENT_NAME]: "",
        [FIELDS.RECRUIT.REQUIREMENT.POSITION]: "",
        [FIELDS.SALES.REQUIREMENT.RATE.LABEL]: {
          [FIELDS.SALES.REQUIREMENT.RATE.FREQUENCY]: "",
          [FIELDS.SALES.REQUIREMENT.RATE.VALUE]: "",
        },
        [FIELDS.RECRUIT.REQUIREMENT.TERMS]: "",
      },
      [SECTIONS.RECRUIT.EMPLOYER]: {
        completed: "",
        [FIELDS.RECRUIT.EMPLOYER.NAME]: "",
        [FIELDS.RECRUIT.EMPLOYER.COMPANY]: "",
        [FIELDS.RECRUIT.EMPLOYER.PHONE]: "",
        [FIELDS.RECRUIT.EMPLOYER.ALTERNATE_PHONE]: "",
        [FIELDS.RECRUIT.EMPLOYER.EXTENSION]: "",
        [FIELDS.RECRUIT.EMPLOYER.EMAIL]: "",
      },
      [SECTIONS.RECRUIT.MISCELLANEOUS]: {
        completed: "",
        [FIELDS.RECRUIT.MISCELLANEOUS.REMARKS]: "",
      },
    },
  },
};

// Creating slice for input management
const InputSlice = createSlice({
  name: "input", // Name of the slice
  initialState, // Initial state for the slice
  reducers: {
    /**
     * Updates a field in the state.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The dispatched action with payload data.
     * @param {Object} formType - The form type to update.
     * @param {string} action.payload.section - The section to update.
     * @param {string} action.payload.field - The field to update.
     * @param {*} action.payload.value - The new value to assign to the field.
     */
    updateField(state, action) {
      const { formType, section, field, value } = action.payload;
      state.data[formType][section][field] = value; // Update the specific field in the section
    },

    /**
     * Replaces the entire sales record.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The dispatched action with the new record.
     * @param {Object} action.payload - The new record to replace the old record.
     */
    replaceSalesRecord(state, { payload }) {
      state.data.sales = { ...payload };
    },

    /**
     * Replaces the entire recruit record.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The dispatched action with the new record.
     * @param {Object} action.payload - The new record to replace the old record.
     */
    replaceRecruitRecord(state, { payload }) {
      state.data.recruit = { ...payload };
    },

    /**
     * Increments the current section index by 1.
     *
     * @param {Object} state - The current state of the slice.
     */
    incrementCurrentSectionIndex(state) {
      state.currentSectionIndex += 1; // Move to the next section
    },

    /**
     * Decrements the current section index by 1.
     *
     * @param {Object} state - The current state of the slice.
     */
    decrementCurrentSectionIndex(state) {
      state.currentSectionIndex -= 1; // Move to the previous section
    },

    /**
     * Updates the current section index with a specific value.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The dispatched action with the payload value.
     * @param {number} action.payload - The value to set the current section index to.
     */
    updateCurrentSectionIndex(state, { payload }) {
      state.currentSectionIndex = payload; // Set section index to the payload value
    },

    /**
     * Enables edit mode in the form.
     *
     * @param {Object} state - The current state of the slice.
     */
    enableEditMode(state) {
      state.isEditMode = true; // Set edit mode flag to true
    },

    /**
     * Enables view mode in the form.
     *
     * @param {Object} state - The current state of the slice.
     */
    enableViewMode(state) {
      state.isEditMode = false; // Set edit mode flag to false
    },

    /**
     * Enables submission for the current section.
     *
     * @param {Object} state - The current state of the slice.
     */
    enableFormSectionSubmission(state) {
      state.shouldSubmitFormSection = true; // Set the flag to enable form section submission
    },

    /**
     * Disables submission for the current section.
     *
     * @param {Object} state - The current state of the slice.
     */
    disableFormSectionSubmission(state) {
      state.shouldSubmitFormSection = false; // Set the flag to disable form section submission
    },

    /**
     * Resets the form to its initial state.
     *
     * @returns {Object} The initial state of the slice.
     */
    resetForm: () => initialState,
  },
});

// Exporting actions and reducer for the slice
export const inputActions = InputSlice.actions;
export default InputSlice.reducer;
