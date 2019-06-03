import React, { PureComponent } from "react";
import CTAButton from "../CTAButton";
import OptionButton from "../OptionButton";
import PropTypes from "prop-types";
import "./index.css";

class Question extends PureComponent {
  state = {
    selectedAnswerId: ""
  };

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.setState({ selectedAnswerId: this.props.existingAnswerId });
    }
  }

  setSelectedAnswerId = selectedAnswerId => this.setState({ selectedAnswerId });

  render() {
    const { selectedAnswerId } = this.state;
    const { question_text, answers = [], handleNavigateNext } = this.props;
    return (
      <section className="main-section-wrapper">
        <div>
          <h2 className="section-title">{question_text}</h2>
          <div className="separator-line" />
          <div className="options-container">
            {answers.map(({ id, label }) => (
              <OptionButton
                key={id}
                id={id}
                label={label}
                isSelected={id === selectedAnswerId}
                onClick={answerId => this.setSelectedAnswerId(answerId)}
              />
            ))}
          </div>
        </div>
        <div>
          <CTAButton
            label="Next"
            onClick={() => {
              handleNavigateNext(selectedAnswerId);
            }}
            isDisabled={selectedAnswerId === ""}
          />
        </div>
      </section>
    );
  }
}

Question.propTypes = {
  question_text: PropTypes.string.isRequired,
  handleNavigateNext: PropTypes.func.isRequired,
  answers: PropTypes.array.isRequired
};

export default Question;
