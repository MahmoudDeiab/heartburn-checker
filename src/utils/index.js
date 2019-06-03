import { merge } from "ramda";

export function convertQuestionsArrayToMap(questionsArray) {
  const map = {};
  questionsArray.forEach((question, index) => {
    map[question.id] = merge(question, { index });
  });
  return map;
}

export function convertOutcomesArrayToMap(outcomesArray) {
  const map = {};
  outcomesArray.forEach(outcome => {
    map[outcome.id] = outcome;
  });
  return map;
}
