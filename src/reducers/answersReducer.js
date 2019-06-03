import { objOf, merge } from "ramda";
import { SET_ANSWER } from "../actions/dataActions";
import { RESET } from "../actions/uiActions";

const defaultState = {};

export default function(state = defaultState, action) {
  switch (action.type) {
    case SET_ANSWER: {
      const { questionId, answerId } = action;
      return merge(state, objOf(questionId, answerId));
    }

    case RESET: {
      return defaultState;
    }

    default:
      return state;
  }
}
