import { all, fork, takeLatest, put } from "redux-saga/effects";
import { FETCH_DATA, REPLACE_DATA } from "../actions/dataActions";
import { getFetchDataRequestUrl } from "../api";
import { TOGGLE_IS_FETCHING } from "../actions/uiActions";
import {
  convertQuestionsArrayToMap,
  convertOutcomesArrayToMap
} from "../utils";

function* handleFetchData() {
  const requestUrl = getFetchDataRequestUrl();
  try {
    const response = yield fetch(requestUrl);
    const { questions, outcomes } = yield response.json();
    const questionsMap = convertQuestionsArrayToMap(questions);
    const outcomesMap = convertOutcomesArrayToMap(outcomes);
    yield put({
      type: REPLACE_DATA,
      questions: questionsMap,
      outcomes: outcomesMap,
      firstQuestionId: questions[0].id
    });
  } catch (error) {
    console.log(error.message);
  }
  yield put({ type: TOGGLE_IS_FETCHING });
}

function* watchDataActions() {
  yield takeLatest(FETCH_DATA, handleFetchData);
}

export default function* root() {
  yield all([fork(watchDataActions)]);
}
