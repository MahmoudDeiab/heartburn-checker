import { SET_CURRENT_QUESTION_ID, REPLACE_DATA } from "../actions/dataActions";
import { RESET } from "../actions/uiActions";

const defaultState = {
  questions: {},
  currentQuestionId: ""
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case REPLACE_DATA: {
      const { questions, firstQuestionId } = action;
      return {
        ...state,
        questions,
        currentQuestionId: firstQuestionId
      };
    }

    case SET_CURRENT_QUESTION_ID: {
      const { questionId } = action;
      return {
        ...state,
        currentQuestionId: questionId
      };
    }

    case RESET: {
      let currentQuestionId = "";
      for (let questionId in state.questions) {
        if (state.questions[questionId].index === 0) {
          currentQuestionId = questionId;
        }
      }
      return {
        ...state,
        currentQuestionId
      };
    }

    default:
      return state;
  }
}
