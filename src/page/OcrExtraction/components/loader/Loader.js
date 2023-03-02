import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

const Loader = (props) => {
  const { isLoading, isFullScreen, helpText, ...attr } = props;

  return isLoading ? (
    <div
      className={`loader-container d-flex-center flex-column ${
        isFullScreen ? "full-screen-loader" : ""
      }`}
      style={{
        overflow: "hide",
        height: "92.5vh"
      }}
    >
      <div
        className="loader d-flex justify-content-around align-items-center"
        {...attr}
      >
        <div className="dot_1" style={{ height: "40px", width: "40px" }} />
        <div className="dot_2" style={{ height: "40px", width: "40px" }} />
        <div className="dot_3" style={{ height: "40px", width: "40px" }} />
      </div>
      <span className="loader-help-text text-bold text-center">{helpText}</span>
    </div>
  ) : (
    props.children || null
  );
};

Loader.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node,
  isFullScreen: PropTypes.bool,
  helpText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

Loader.defaultProps = {
  isLoading: false,
  isFullScreen: false,
  helpText: "Please wait while we load...",
  children: null,
};

export default Loader;
