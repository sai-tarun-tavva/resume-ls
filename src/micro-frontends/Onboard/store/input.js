import { createSlice } from "@reduxjs/toolkit";

export const defaultAddress = {
  address1: "",
  address2: "",
  city: "",
  state: "",
  country: "",
  zipcode: "",
};

export const defaultPrevExp = {
  employerName: "",
  address: defaultAddress,
  email: "",
  phone: "",
};

export const defaultReference = {
  name: "",
  phone: "",
  mail: "",
  designation: "",
  company: "",
};

const initialState = {
  currentSectionIndex: 0,
  data: {
    onboarding: {
      id: null,
      createdDate: "",
      updatedDate: "",
      onboardingDate: "",
      onboardingStatus: "",
    },
    personal: {
      firstName: "",
      lastName: "",
      emailId: "",
      phoneNumber: "",
      currentLocation: defaultAddress,
      dob: "",
      maritalStatus: "",
      passportNumber: "",
      visaType: "",
      photoID: {
        type: "",
        number: "",
      },
      eadNumber: "",
      SSN: "",
      skypeId: "",
      referenceName: "",
    },
    relocation: {
      intereseted: "",
      preference: "",
      address: defaultAddress,
    },
    education: {
      sevisID: "",
      dso: {
        name: "",
        email: "",
        phone: "",
      },
      graduatedUniversity: {
        name: "",
        address: defaultAddress,
        passedYear: "",
        stream: "",
        additionalCertifications: [],
      },
    },
    profession: {
      trainingAttended: "",
      experience: {
        years: "",
        months: "",
      },
      technologiesKnown: [],
      previousExperience: [],
      references: [],
    },
    offerLetter: {
      status: "",
      lastUpdated: "",
      designation: "",
      startDate: "",
      endDate: "",
      rolesAndResponsibilities: "",
    },
    usTravelAndStay: {
      usEntry: {
        month: "",
        year: "",
      },
      stayAddresses: [],
    },
    emergencyContacts: {
      usa: {
        name: "",
        phone: "",
      },
      homeCountry: {
        name: "",
        phone: "",
      },
    },
    additional: {
      remarks: "",
      notes: "",
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
    // Update current section index
    incrementCurrentSectionIndex(state) {
      state.currentSectionIndex += 1;
    },
    // Update current section index
    decrementCurrentSectionIndex(state) {
      state.currentSectionIndex -= 1;
    },
    // Resets the form
    resetForm: () => initialState,
  },
});

export const inputActions = InputSlice.actions;
export default InputSlice.reducer;
