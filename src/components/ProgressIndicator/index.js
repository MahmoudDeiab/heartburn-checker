import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const ProgressIndicator = ({ currentIndex, questionsLength, isFullWidth }) => {
  const widthPercentage = isFullWidth
    ? 100
    : (currentIndex * 100) / questionsLength;
  return (
    <div className="progress-indicator-container">
      <div
        className="progress-indicator-fill"
        style={{
          width: `${widthPercentage}%`
        }}
      />
    </div>
  );
};

ProgressIndicator.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  questionsLength: PropTypes.number.isRequired,
  isFullWidth: PropTypes.bool.isRequired
};

export default ProgressIndicator;
