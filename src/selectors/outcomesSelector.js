import { createSelector } from "reselect";

export const getShouldShowOutcome = state => state.outcomes.shouldShowOutcome;

export const getOutcomes = state => state.outcomes.outcomes;

export const getSelectedOutcomeId = state => state.outcomes.selectedOutcomeId;

export const getOutcome = createSelector(
  getOutcomes,
  getSelectedOutcomeId,
  (outcomesMap, selectedOutcomeId) => outcomesMap[selectedOutcomeId]
);
