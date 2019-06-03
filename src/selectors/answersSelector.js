import { createSelector } from "reselect";
import { getCurrentQuestionId, getQuestions } from "./questionsSelector";
import { prop, find, propEq } from "ramda";

export const getAnswers = state => state.answers;

export const getCurrentQuestionAnswerId = createSelector(
  getAnswers,
  getCurrentQuestionId,
  (answers, currentQuestionId) => prop(currentQuestionId, answers) || ""
);

export const getScore = createSelector(
  getAnswers,
  getQuestions,
  (answers, questions) => {
    const entries = Object.entries(answers);
    if (entries.length !== 0) {
      return entries
        .map(entry => {
          const answers = questions[entry[0]].answers;
          const score = prop("score", find(propEq("id", entry[1]), answers));
          return score;
        })
        .reduce((acc, current) => acc + current, 0);
    }
    return 0;
  }
);
