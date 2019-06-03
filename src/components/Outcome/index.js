import React from "react";
import CTAButton from "../CTAButton";
import PropTypes from "prop-types";

const Outcome = ({ title, text, show_booking_button, reset }) => {
  return (
    <section className="main-section-wrapper">
      <div>
        <h2 className="section-title">{title}</h2>
        <div className="separator-line" />
        <p className="body-text">{text}</p>
        {show_booking_button ? (
          <CTAButton
            label="Book a meeting"
            isDisabled={false}
            onClick={() =>
              console.log("Should navigate user to another screen")
            }
          />
        ) : null}
      </div>
      <div className="-flex-container-center">
        <button onClick={reset} className="underline-link">
          Back to the start screen
        </button>
      </div>
    </section>
  );
};

Outcome.protoTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  show_booking_button: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired
};

export default Outcome;
