import { createSlice } from "@reduxjs/toolkit";
import {
  SECTIONS,
  FIELDS,
  FIELDS_ADDRESS,
  FIELDS_PREV_EXP,
  FIELDS_REFERENCE,
  FIELDS_UNIVERSITY,
} from "../constants";

// Default values for address fields
export const defaultAddress = {
  [FIELDS_ADDRESS.ADDRESS1]: "",
  [FIELDS_ADDRESS.ADDRESS2]: "",
  [FIELDS_ADDRESS.CITY]: "",
  [FIELDS_ADDRESS.STATE]: "",
  [FIELDS_ADDRESS.COUNTRY]: "",
  [FIELDS_ADDRESS.ZIPCODE]: "",
};

export const defaultUniversity = {
  [FIELDS_UNIVERSITY.NAME]: "",
  [FIELDS_UNIVERSITY.ADDRESS]: defaultAddress,
  [FIELDS_UNIVERSITY.PASSED_MONTH_YEAR]: "",
  [FIELDS_UNIVERSITY.STREAM]: "",
};

// Default values for previous employment experience fields
export const defaultPrevExp = {
  [FIELDS_PREV_EXP.EMPLOYER_NAME]: "",
  [FIELDS_PREV_EXP.ADDRESS]: defaultAddress,
  [FIELDS_PREV_EXP.EMAIL]: "",
  [FIELDS_PREV_EXP.PHONE]: "",
};

// Default values for reference fields
export const defaultReference = {
  [FIELDS_REFERENCE.NAME]: "",
  [FIELDS_REFERENCE.PHONE]: "",
  [FIELDS_REFERENCE.EMAIL]: "",
  [FIELDS_REFERENCE.DESIGNATION]: "",
  [FIELDS_REFERENCE.COMPANY]: "",
};

// Initial state of the input slice
const initialState = {
  currentSectionIndex: 0, // Index of the current section in the form
  isEditMode: false, // Flag indicating whether the form is in edit mode
  shouldSubmitFormSection: false, // Flag for whether the section can be submitted
  data: {
    // Sections and their fields, initialized with default values
    [SECTIONS.RECORD]: {
      [FIELDS.RECORD.ID]: "",
      [FIELDS.RECORD.CREATED_DATE]: "",
      [FIELDS.RECORD.UPDATED_DATE]: "",
    },
    [SECTIONS.ONBOARDING]: {
      completed: "",
      [FIELDS.ONBOARDING.DATE]: "",
      [FIELDS.ONBOARDING.STATUS]: "",
    },
    [SECTIONS.PERSONAL]: {
      completed: "",
      [FIELDS.PERSONAL.FIRST_NAME]: "",
      [FIELDS.PERSONAL.LAST_NAME]: "",
      [FIELDS.PERSONAL.EMAIL_ID]: "",
      [FIELDS.PERSONAL.PHONE_NUMBER]: "",
      [FIELDS.PERSONAL.SECONDARY_PHONE_NUMBER]: "",
      [FIELDS.PERSONAL.GENDER]: "",
      [FIELDS.PERSONAL.DOB]: "",
      [FIELDS.PERSONAL.MARITAL_STATUS]: "",
      [FIELDS.PERSONAL.PASSPORT_NUMBER]: "",
      [FIELDS.PERSONAL.VISA_STATUS]: "",
      [FIELDS.PERSONAL.PHOTO_ID.VALUE]: {
        [FIELDS.PERSONAL.PHOTO_ID.TYPE]: "",
        [FIELDS.PERSONAL.PHOTO_ID.NUMBER]: "",
      },
      [FIELDS.PERSONAL.EAD_NUMBER]: "",
      [FIELDS.PERSONAL.SSN]: "",
      [FIELDS.PERSONAL.SKYPE_ID]: "",
      [FIELDS.PERSONAL.REFERENCE_NAME]: "",
    },
    [SECTIONS.LOCATION]: {
      completed: "",
      [FIELDS.LOCATION.USA_LOCATION]: defaultAddress,
      [FIELDS.LOCATION.INDIA_LOCATION]: defaultAddress,
    },
    [SECTIONS.RELOCATION]: {
      completed: "",
      [FIELDS.RELOCATION.INTERESTED.VALUE]:
        FIELDS.RELOCATION.INTERESTED.OPTIONS.YES,
      [FIELDS.RELOCATION.HOW_SOON]: "",
      [FIELDS.RELOCATION.PREFERENCE]: "",
      [FIELDS.RELOCATION.ADDRESS]: defaultAddress,
    },
    [SECTIONS.EDUCATION]: {
      completed: "",
      [FIELDS.EDUCATION.SEVIS_ID]: "",
      [FIELDS.EDUCATION.DSO.VALUE]: {
        [FIELDS.EDUCATION.DSO.NAME]: "",
        [FIELDS.EDUCATION.DSO.EMAIL]: "",
        [FIELDS.EDUCATION.DSO.PHONE]: "",
      },
      [FIELDS.EDUCATION.GRADUATED_UNIVERSITY]: [],
      [FIELDS.EDUCATION.ADDITIONAL_CERTIFICATIONS]: [],
    },
    [SECTIONS.PROFESSION]: {
      completed: "",
      [FIELDS.PROFESSION.TRAINING_ATTENDED.VALUE]:
        FIELDS.PROFESSION.TRAINING_ATTENDED.OPTIONS.NO,
      [FIELDS.PROFESSION.EXPERIENCE.VALUE]: {
        [FIELDS.PROFESSION.EXPERIENCE.YEARS]: "",
        [FIELDS.PROFESSION.EXPERIENCE.MONTHS]: "",
      },
      [FIELDS.PROFESSION.TECHNOLOGIES_KNOWN]: [],
      [FIELDS.PROFESSION.PREVIOUS_EXPERIENCE]: [],
      [FIELDS.PROFESSION.REFERENCES]: [],
    },
    [SECTIONS.OFFER_LETTER]: {
      completed: "",
      [FIELDS.OFFER_LETTER.STATUS]: "",
      [FIELDS.OFFER_LETTER.LAST_UPDATED]: "",
      [FIELDS.OFFER_LETTER.MARKETING_NAME]: "",
      [FIELDS.OFFER_LETTER.DESIGNATION]: "",
      [FIELDS.OFFER_LETTER.START_DATE]: "",
      [FIELDS.OFFER_LETTER.END_DATE]: "",
      [FIELDS.OFFER_LETTER.ROLES_AND_RESPONSIBILITIES]: "",
    },
    [SECTIONS.US_TRAVEL_AND_STAY]: {
      completed: "",
      [FIELDS.US_TRAVEL_AND_STAY.US_ENTRY]: "",
      [FIELDS.US_TRAVEL_AND_STAY.STAY_ADDRESSES]: [],
    },
    [SECTIONS.EMERGENCY_CONTACTS]: {
      completed: "",
      [FIELDS.EMERGENCY_CONTACTS.USA.VALUE]: {
        [FIELDS.EMERGENCY_CONTACTS.USA.NAME]: "",
        [FIELDS.EMERGENCY_CONTACTS.USA.PHONE]: "",
      },
      [FIELDS.EMERGENCY_CONTACTS.HOME_COUNTRY.VALUE]: {
        [FIELDS.EMERGENCY_CONTACTS.HOME_COUNTRY.NAME]: "",
        [FIELDS.EMERGENCY_CONTACTS.HOME_COUNTRY.PHONE]: "",
      },
    },
    [SECTIONS.MISCELLANEOUS]: {
      completed: "",
      [FIELDS.MISCELLANEOUS.REMARKS]: "",
      [FIELDS.MISCELLANEOUS.NOTES]: "",
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
     * @param {string} action.payload.section - The section to update.
     * @param {string} action.payload.field - The field to update.
     * @param {*} action.payload.value - The new value to assign to the field.
     */
    updateField(state, action) {
      const { section, field, value } = action.payload;
      state.data[section][field] = value; // Update the specific field in the section
    },

    /**
     * Replaces the entire candidate data.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The dispatched action with the new candidate data.
     * @param {Object} action.payload - The new candidate data to replace the old data.
     */
    replaceCandidate(state, { payload }) {
      const newCandidate = { ...payload.additional_info };
      newCandidate.record.id = payload.id;
      state.data = newCandidate; // Replace entire candidate data
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
