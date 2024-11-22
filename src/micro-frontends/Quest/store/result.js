import { createSlice } from "@reduxjs/toolkit";

// Initial state for the results slice
const initialState = {
  questions: [],
  // conversation: {},
  conversation: {
    question_1: {
      user_response: "I have a background in software engineering.",
      ai_response:
        "That's great! Can you share some of the projects you've worked on?",
    },
    question_2: {
      user_response: "I worked on a healthcare app that manages patient data.",
      ai_response: "Interesting! What was your role in the project?",
    },
    question_3: {
      user_response:
        "I was responsible for backend development and database optimization.",
      ai_response: "Impressive! What technologies did you use for the backend?",
    },
    question_4: {
      user_response:
        "I used Python with Django and PostgreSQL for the database.",
      ai_response:
        "That's a solid stack. Can you describe a challenging problem you faced and how you solved it?",
    },
    question_5: {
      user_response:
        "We had an issue with slow queries on large datasets. I optimized indexes and improved query performance.",
      ai_response:
        "Great problem-solving! Do you have experience working in a team environment?",
    },
    question_6: {
      user_response:
        "Yes, I collaborated with a cross-functional team of designers and frontend developers.",
      ai_response:
        "Collaboration is key! How do you handle conflicting opinions within a team?",
    },
    question_7: {
      user_response:
        "I try to listen to all perspectives and find a compromise that aligns with the project goals.",
      ai_response:
        "That's a good approach. What motivates you to keep learning new skills?",
    },
    question_8: {
      user_response:
        "I enjoy staying updated with technology trends to solve problems more efficiently.",
      ai_response:
        "That's a great mindset! Do you have experience working under tight deadlines?",
    },
    question_9: {
      user_response:
        "Yes, I have delivered projects within strict timelines while ensuring quality.",
      ai_response:
        "Impressive! What do you consider your greatest strength in your work?",
    },
    question_10: {
      user_response:
        "My analytical skills and ability to adapt quickly to new challenges.",
      ai_response:
        "Fantastic! Finally, where do you see yourself in the next five years?",
    },
  },
  sessionID: "",
};

/**
 * Results slice for managing and displaying results related to candidate interview.
 */
const resultSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    /**
     * Updates the state with new questions.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The dispatched action with payload data.
     * @param {Array} action.payload - The new array of questions.
     */
    updateQuestions(state, { payload }) {
      // Return a new state where all attributes are reset to their initial state
      // but `questions` is updated with the provided payload.
      return {
        ...initialState, // Reset all attributes to their initial values
        questions: payload, // Override the `questions` attribute
      };
    },

    /**
     * Updates the state with new conversation data.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The dispatched action with payload data.
     * @param {Object} action.payload - The new conversation object.
     */
    updateConversation(state, { payload }) {
      state.conversation = payload;
    },

    /**
     * Updates the sessionID in the state.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The dispatched action with payload data.
     * @param {string} action.payload - The new session ID.
     */
    updateSessionID(state, { payload }) {
      state.sessionID = payload;
    },
  },
});

// Exporting actions and reducer for the result slice
export const resultActions = resultSlice.actions;
export default resultSlice.reducer;
