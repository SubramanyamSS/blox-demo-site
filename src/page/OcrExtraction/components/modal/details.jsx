import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody } from 'msd-modal';
// import './style.scss';
import Footer from '../footer';

const DetailsModal = (props) => {
  const { isOpen, title, closeButtonLabel, onClose, toggle, className,
    showCloseIcon, footerButtons, footerProps, isClosedOnEsc, isClosedOnOutsideClick, ...attr } = props;

  const detailsModalNode = useRef(null);

  useEffect(() => {
    // close modal on clicking modal backdrop
    const listener = (event) => {
      if (!detailsModalNode.current || detailsModalNode.current.contains(event.target)) return;
      onClose(event);
    };

    if (isClosedOnEsc) document.addEventListener('keydown', handleKeys);
    if (isClosedOnOutsideClick) document.addEventListener('mousedown', listener);
    return () => {
      if (isClosedOnEsc) document.removeEventListener('keydown', handleKeys);
      if (isClosedOnOutsideClick) document.removeEventListener('mousedown', listener);
    };
  }, []);

  const handleKeys = (event) => {
    // fire on close on pressing esc
    if (event.keyCode === 27) onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      showCloseIcon={showCloseIcon}
      onClose={onClose}
      toggle={toggle}
      className={`custom-modal ${className}`}
      {...attr}
    >
      <div ref={detailsModalNode} style={{ height: '50%' }}>
        <ModalHeader className="d-inline-flex flex-column">{title}</ModalHeader>
        <ModalBody>{props.children}</ModalBody>
        {footerButtons && (
          <Footer {...footerProps} className={`modal-footer ${footerProps.className}`}>{footerButtons}</Footer>)}
      </div>
    </Modal>
  );
};

DetailsModal.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  showCloseIcon: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  toggle: PropTypes.func,
  className: PropTypes.string,
  closeButtonLabel: PropTypes.string,
  children: PropTypes.node,
  footerButtons: PropTypes.node,
  isClosedOnEsc: PropTypes.bool,
  isClosedOnOutsideClick: PropTypes.bool,
  footerProps: PropTypes.shape()
};

DetailsModal.defaultProps = {
  isOpen: false,
  showCloseIcon: true,
  className: '',
  closeButtonLabel: 'Close',
  isClosedOnEsc: false,
  isClosedOnOutsideClick: false,
  footerProps: {},
  toggle: null,
  children: null,
  footerButtons: null
};

export default DetailsModal;
