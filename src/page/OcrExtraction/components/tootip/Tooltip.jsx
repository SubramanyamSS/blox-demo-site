import React from 'react';
import PropTypes from 'prop-types';
import 'tippy.js/dist/tippy.css';
import { TooltipWrapper } from './styled';

const Tooltip = (props) => {
  const { children, content, className, ...attr } = props;

  return (
    <TooltipWrapper
      content={content}
      className={`font-body-1 tooltip-content ${className}`}
      {...attr}
    >
      {children}
    </TooltipWrapper>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  className: PropTypes.string,
  onShow: PropTypes.bool
};

Tooltip.defaultProps = {
  className: ''
};

export default Tooltip;
