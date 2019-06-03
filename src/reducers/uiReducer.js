import { TOGGLE_IS_FETCHING } from "../actions/uiActions";

const defaultState = {
  isFetching: true
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case TOGGLE_IS_FETCHING: {
      return {
        ...state,
        isFetching: !state.isFetching
      };
    }

    default:
      return state;
  }
}
