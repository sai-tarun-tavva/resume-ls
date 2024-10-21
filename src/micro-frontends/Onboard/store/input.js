import { createSlice } from "@reduxjs/toolkit";
import {
  SECTIONS,
  FIELDS,
  FIELDS_ADDRESS,
  FIELDS_PREV_EXP,
  FIELDS_REFERENCE,
} from "../constants";

export const defaultAddress = {
  [FIELDS_ADDRESS.ADDRESS1]: "",
  [FIELDS_ADDRESS.ADDRESS2]: "",
  [FIELDS_ADDRESS.CITY]: "",
  [FIELDS_ADDRESS.STATE]: "",
  [FIELDS_ADDRESS.COUNTRY]: "",
  [FIELDS_ADDRESS.ZIPCODE]: "",
};

export const defaultPrevExp = {
  [FIELDS_PREV_EXP.EMPLOYER_NAME]: "",
  [FIELDS_PREV_EXP.ADDRESS]: defaultAddress,
  [FIELDS_PREV_EXP.EMAIL]: "",
  [FIELDS_PREV_EXP.PHONE]: "",
};

export const defaultReference = {
  [FIELDS_REFERENCE.NAME]: "",
  [FIELDS_REFERENCE.PHONE]: "",
  [FIELDS_REFERENCE.EMAIL]: "",
  [FIELDS_REFERENCE.DESIGNATION]: "",
  [FIELDS_REFERENCE.COMPANY]: "",
};

const initialState = {
  currentSectionIndex: 1,
  data: {
    [SECTIONS.RECORD]: {
      [FIELDS.RECORD.ID]: null,
      [FIELDS.RECORD.CREATED_DATE]: "",
      [FIELDS.RECORD.UPDATED_DATE]: "",
    },
    [SECTIONS.ONBOARDING]: {
      [FIELDS.ONBOARDING.DATE]: "",
      [FIELDS.ONBOARDING.STATUS]: "",
    },
    [SECTIONS.PERSONAL]: {
      [FIELDS.PERSONAL.FIRST_NAME]: "",
      [FIELDS.PERSONAL.LAST_NAME]: "",
      [FIELDS.PERSONAL.EMAIL_ID]: "",
      [FIELDS.PERSONAL.PHONE_NUMBER]: "",
      [FIELDS.PERSONAL.SECONDARY_PHONE_NUMBER]: "",
      [FIELDS.PERSONAL.GENDER]: "",
      [FIELDS.PERSONAL.USA_LOCATION]: defaultAddress,
      [FIELDS.PERSONAL.INDIA_LOCATION]: defaultAddress,
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
    [SECTIONS.RELOCATION]: {
      [FIELDS.RELOCATION.INTERESTED.VALUE]:
        FIELDS.RELOCATION.INTERESTED.OPTIONS.YES,
      [FIELDS.RELOCATION.PREFERENCE]: "",
      [FIELDS.RELOCATION.ADDRESS]: defaultAddress,
    },
    [SECTIONS.EDUCATION]: {
      [FIELDS.EDUCATION.SEVIS_ID]: "",
      [FIELDS.EDUCATION.DSO.VALUE]: {
        [FIELDS.EDUCATION.DSO.NAME]: "",
        [FIELDS.EDUCATION.DSO.EMAIL]: "",
        [FIELDS.EDUCATION.DSO.PHONE]: "",
      },
      [FIELDS.EDUCATION.GRADUATED_UNIVERSITY.VALUE]: {
        [FIELDS.EDUCATION.GRADUATED_UNIVERSITY.NAME]: "",
        [FIELDS.EDUCATION.GRADUATED_UNIVERSITY.ADDRESS]: defaultAddress,
        [FIELDS.EDUCATION.GRADUATED_UNIVERSITY.PASSED_MONTH_YEAR]: "",
        [FIELDS.EDUCATION.GRADUATED_UNIVERSITY.STREAM]: "",
        [FIELDS.EDUCATION.GRADUATED_UNIVERSITY.ADDITIONAL_CERTIFICATIONS]: [],
      },
    },
    [SECTIONS.PROFESSION]: {
      [FIELDS.PROFESSION.TRAINING_ATTENDED.VALUE]: [
        FIELDS.PROFESSION.TRAINING_ATTENDED.OPTIONS.NO,
      ],
      [FIELDS.PROFESSION.EXPERIENCE.VALUE]: {
        [FIELDS.PROFESSION.EXPERIENCE.YEARS]: "",
        [FIELDS.PROFESSION.EXPERIENCE.MONTHS]: "",
      },
      [FIELDS.PROFESSION.TECHNOLOGIES_KNOWN]: [],
      [FIELDS.PROFESSION.PREVIOUS_EXPERIENCE]: [],
      [FIELDS.PROFESSION.REFERENCES]: [defaultReference, defaultReference], // two references are mandatory
    },
    [SECTIONS.OFFER_LETTER]: {
      [FIELDS.OFFER_LETTER.STATUS]: "",
      [FIELDS.OFFER_LETTER.LAST_UPDATED]: "",
      [FIELDS.OFFER_LETTER.MARKETING_NAME]: "",
      [FIELDS.OFFER_LETTER.DESIGNATION]: "",
      [FIELDS.OFFER_LETTER.START_DATE]: "",
      [FIELDS.OFFER_LETTER.END_DATE]: "",
      [FIELDS.OFFER_LETTER.ROLES_AND_RESPONSIBILITIES]: "",
    },
    [SECTIONS.US_TRAVEL_AND_STAY]: {
      [FIELDS.US_TRAVEL_AND_STAY.US_ENTRY]: "",
      [FIELDS.US_TRAVEL_AND_STAY.STAY_ADDRESSES]: [defaultAddress],
    },
    [SECTIONS.EMERGENCY_CONTACTS]: {
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
      [FIELDS.MISCELLANEOUS.REMARKS]: "",
      [FIELDS.MISCELLANEOUS.NOTES]: "",
    },
  },
};

const InputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    // Update fields
    updateField(state, action) {
      const { section, field, value } = action.payload;
      state.data[section][field] = value;
    },
    // Increment current section index by 1
    incrementCurrentSectionIndex(state) {
      state.currentSectionIndex += 1;
    },
    // Decrement current section index by 1
    decrementCurrentSectionIndex(state) {
      state.currentSectionIndex -= 1;
    },
    // Update current section index with payload
    updateCurrentSectionIndex(state, { payload }) {
      state.currentSectionIndex = payload;
    },
    // Resets the form
    resetForm: () => initialState,
  },
});

export const inputActions = InputSlice.actions;
export default InputSlice.reducer;
