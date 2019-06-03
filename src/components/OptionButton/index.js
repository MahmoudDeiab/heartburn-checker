import React from "react";
import CheckmarkIcon from "../../assets/icons/checkmark.svg";
import PropTypes from "prop-types";
import "./index.css";

const OptionButton = ({ id, label, isSelected, onClick }) => {
  return (
    <button
      onClick={() => onClick(id)}
      className={`option-btn -option-btn-${
        isSelected ? "selected" : "deselected"
      }`}
    >
      {label}
      {isSelected ? (
        <span className="option-btn-icon">
          <img src={CheckmarkIcon} className="checkmark-icon" alt="" />
        </span>
      ) : null}
    </button>
  );
};

OptionButton.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default OptionButton;
