import React from 'react';
import PropTypes from 'prop-types';

// import './style.scss';

const Footer = (props) => {
  const { boxShadow, className, children, renderLeftSideContent, style } = props;
  return (
    <div
      className={`footer-wrapper d-flex align-items-center
      ${boxShadow ? 'footer-box-shadow' : 'footer-border'} ${className}`}
      style={{ justifyContent: renderLeftSideContent ? 'space-between' : 'flex-end', style }}
    >
      {renderLeftSideContent}
      <div className="footer-btn-wrapper d-flex">
        {children}
      </div>
    </div>
  );
};

Footer.propTypes = {
  boxShadow: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  renderLeftSideContent: PropTypes.node,
  style: PropTypes.shape()
};

Footer.defaultProps = {
  boxShadow: false,
  className: '',
  renderLeftSideContent: null,
  style: {}
};

export default Footer;
