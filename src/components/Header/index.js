import React from "react";
import ChevronLeftGreen from "../../assets/icons/chevron_left_green.svg";
import ChevronLeftGrey from "../../assets/icons/chevron_left_grey.svg";
import PropTypes from "prop-types";
import "./index.css";

const Header = ({
  title,
  handleNavigatePrevious,
  isPreviousButtonDisabled
}) => {
  return (
    <header className="header-wrapper">
      <div className="header-content-container">
        <button
          disabled={isPreviousButtonDisabled}
          onClick={handleNavigatePrevious}
          className="chevron-icon"
        >
          <img
            src={isPreviousButtonDisabled ? ChevronLeftGrey : ChevronLeftGreen}
            alt=""
          />
        </button>
        <h1 className="title-label">{title}</h1>
      </div>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  handleNavigatePrevious: PropTypes.func.isRequired,
  isPreviousButtonDisabled: PropTypes.bool.isRequired
};

export default Header;
