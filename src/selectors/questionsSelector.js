import { createSelector } from "reselect";

export const getCurrentQuestionId = state => state.questions.currentQuestionId;
export const getQuestions = state => state.questions.questions;

export const getCurrentQuestion = createSelector(
  getQuestions,
  getCurrentQuestionId,
  (questionsMap, currentQuestionId) => questionsMap[currentQuestionId] || {}
);

export const getQuestionsLength = createSelector(
  getQuestions,
  questionsMap => Object.keys(questionsMap).length
);

export const getPreviousQuestionId = createSelector(
  getCurrentQuestion,
  getQuestions,
  (currentQuestion, questionsMap) => {
    for (let questionId in questionsMap) {
      if (questionsMap[questionId].index === currentQuestion.index - 1) {
        return questionId;
      }
    }
  }
);
