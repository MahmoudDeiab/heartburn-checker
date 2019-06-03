import React from "react";
import ChevronRightWhite from "../../assets/icons/chevron_right_white.svg";
import ChevronRightNavy from "../../assets/icons/chevron_right_navy.svg";
import PropTypes from "prop-types";
import "./index.css";

const CTAButton = ({ label, isDisabled, onClick }) => {
  return (
    <button onClick={onClick} disabled={isDisabled} className="cta-btn">
      {label}
      <img alt="" src={isDisabled ? ChevronRightNavy : ChevronRightWhite} />
    </button>
  );
};

CTAButton.propTypes = {
  label: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default CTAButton;
