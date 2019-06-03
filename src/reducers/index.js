import { combineReducers } from "redux";
import questionsReducer from "./questionsReducer";
import answersReducer from "./answersReducer";
import outcomesReducer from "./outcomesReducer";
import uiReducer from "./uiReducer";

export default combineReducers({
  questions: questionsReducer,
  answers: answersReducer,
  outcomes: outcomesReducer,
  ui: uiReducer
});
