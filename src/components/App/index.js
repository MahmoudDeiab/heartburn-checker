import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Header from "../Header";
import Question from "../Question";
import ProgressIndicator from "../ProgressIndicator";
import {
  FETCH_DATA,
  SET_CURRENT_QUESTION_ID,
  SET_ANSWER,
  SET_OUTCOME_ID
} from "../../actions/dataActions";
import { TOGGLE_SHOULD_SHOW_OUTCOME, RESET } from "../../actions/uiActions";
import {
  getCurrentQuestion,
  getQuestionsLength,
  getPreviousQuestionId
} from "../../selectors/questionsSelector";
import {
  getCurrentQuestionAnswerId,
  getScore
} from "../../selectors/answersSelector";
import { find, propEq, prop, reject } from "ramda";
import {
  getShouldShowOutcome,
  getOutcome
} from "../../selectors/outcomesSelector";
import { getIsFetchingData } from "../../selectors/uiSelector";
import Outcome from "../Outcome";
import { BarLoader } from "react-spinners";
import PropTypes from "prop-types";

class App extends PureComponent {
  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  navigateNext = selectedAnswerId => {
    const {
      currentQuestion,
      setAnswer,
      setCurrentQuestionId,
      toggleShouldShowOutcomes,
      setOutcomeId
    } = this.props;
    setAnswer(currentQuestion.id, selectedAnswerId);
    if (!this._getIsLastQuestion()) {
      const nextQuestionId = this._getNextQuestionId(selectedAnswerId);
      setCurrentQuestionId(nextQuestionId);
    } else {
      const outComeId = this._getOutcomeId();
      setOutcomeId(outComeId);
      toggleShouldShowOutcomes();
    }
  };

  navigatePrevious = () => {
    const { previousQuestionId, setCurrentQuestionId } = this.props;
    setCurrentQuestionId(previousQuestionId);
  };

  _getNextQuestionId = selectedAnswerId => {
    const {
      currentQuestion: { next }
    } = this.props;
    if (next.length === 1) {
      return next[0].next_question;
    } else {
      return prop(
        "next_question",
        find(propEq("answered", selectedAnswerId), next)
      );
    }
  };

  _getIsLastQuestion = () => {
    const {
      currentQuestion: { index },
      questionsLength
    } = this.props;
    return index === questionsLength - 1;
  };

  _getOutcomeId = () => {
    const {
      currentQuestion: { next },
      score
    } = this.props;
    const possibleOutcomes = reject(({ max_score }) => max_score < score, next);
    return possibleOutcomes[0].outcome;
  };

  _getIsPreviousButtonDisabled = () => {
    const {
      currentQuestion: { index },
      questionsLength
    } = this.props;
    return index === 0 || index === questionsLength - 1;
  };

  render() {
    const {
      currentQuestion,
      questionsLength,
      currentQuestionAnswerId,
      shouldShowOutcome,
      outcome,
      reset,
      isFetchingData
    } = this.props;
    return (
      <div className="app -subtle-shadow-transition">
        {isFetchingData ? (
          <div className="-flex-container-center -height-100">
            <BarLoader
              sizeUnit={"px"}
              size={20}
              color={"#6accba"}
              loading={true}
            />
          </div>
        ) : (
          <div>
            <Header
              title="Heartburn Checker"
              currentIndex={currentQuestion.index || 0}
              handleNavigatePrevious={this.navigatePrevious}
              isPreviousButtonDisabled={this._getIsPreviousButtonDisabled()}
            />
            <ProgressIndicator
              currentIndex={currentQuestion.index || 0}
              questionsLength={questionsLength}
              isFullWidth={shouldShowOutcome}
            />
            {shouldShowOutcome ? (
              <Outcome
                reset={reset}
                title="Thank you for answering the questions!"
                {...outcome}
              />
            ) : (
              <Question
                {...currentQuestion}
                handleNavigateNext={this.navigateNext}
                existingAnswerId={currentQuestionAnswerId}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentQuestion: getCurrentQuestion(state),
  questionsLength: getQuestionsLength(state),
  previousQuestionId: getPreviousQuestionId(state),
  currentQuestionAnswerId: getCurrentQuestionAnswerId(state),
  score: getScore(state),
  shouldShowOutcome: getShouldShowOutcome(state),
  outcome: getOutcome(state),
  isFetchingData: getIsFetchingData(state)
});

const mapDispatchToProps = {
  fetchData: () => ({
    type: FETCH_DATA
  }),
  setAnswer: (questionId, answerId) => ({
    type: SET_ANSWER,
    questionId,
    answerId
  }),
  setCurrentQuestionId: questionId => ({
    type: SET_CURRENT_QUESTION_ID,
    questionId
  }),
  toggleShouldShowOutcomes: () => ({
    type: TOGGLE_SHOULD_SHOW_OUTCOME
  }),
  setOutcomeId: outcomeId => ({
    type: SET_OUTCOME_ID,
    outcomeId
  }),
  reset: () => ({
    type: RESET
  })
};

App.protoTypes = {
  currentQuestion: PropTypes.object.isRequired,
  questionsLength: PropTypes.number.isRequired,
  previousQuestionId: PropTypes.string.isRequired,
  currentQuestionAnswerId: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  shouldShowOutcome: PropTypes.bool.isRequired,
  outcome: PropTypes.object.isRequired,
  isFetchingData: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
