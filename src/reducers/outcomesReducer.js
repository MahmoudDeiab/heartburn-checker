import { TOGGLE_SHOULD_SHOW_OUTCOME, RESET } from "../actions/uiActions";
import { REPLACE_DATA, SET_OUTCOME_ID } from "../actions/dataActions";

const defaultState = {
  outcomes: {},
  shouldShowOutcome: false,
  selectedOutcomeId: ""
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case REPLACE_DATA: {
      const { outcomes } = action;
      return {
        ...state,
        outcomes
      };
    }

    case SET_OUTCOME_ID: {
      const { outcomeId } = action;
      return {
        ...state,
        selectedOutcomeId: outcomeId
      };
    }
    case TOGGLE_SHOULD_SHOW_OUTCOME: {
      return {
        ...state,
        shouldShowOutcome: !state.shouldShowOutcome
      };
    }

    case RESET: {
      return {
        ...state,
        shouldShowOutcome: false,
        selectedOutcomeId: ""
      };
    }

    default:
      return state;
  }
}
