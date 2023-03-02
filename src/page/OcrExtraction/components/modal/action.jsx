import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "msd-button";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "msd-modal";
import { ModalButtonWrapper, ModalWrapper } from "./styled";
// import './style.scss';

const ActionModal = (props) => {
  const {
    isOpen,
    title,
    mainText,
    buttonSuccess,
    buttonFailure,
    onClose,
    toggle,
    className,
    showCloseIcon,
    onSuccess,
    onFailure,
    isClosedOnEsc,
    isClosedOnOutsideClick,
    children,
    ...attr
  } = props;

  const actionModalNode = useRef(null);

  useEffect(() => {
    // close modal on clicking modal backdrop
    const listener = (event) => {
      if (
        !actionModalNode.current ||
        actionModalNode.current.contains(event.target)
      )
        return;
      onClose(event);
    };

    if (isClosedOnEsc) document.addEventListener("keydown", handleKeys);
    if (isClosedOnOutsideClick)
      document.addEventListener("mousedown", listener);
    return () => {
      if (isClosedOnEsc) document.removeEventListener("keydown", handleKeys);
      if (isClosedOnOutsideClick)
        document.removeEventListener("mousedown", listener);
    };
  }, []);

  const handleKeys = (event) => {
    // fire failure or onclose on pressing esc
    if (event.keyCode === 27) {
      try {
        onFailure();
      } catch (e) {
        onClose();
      }
    }

    // fire success on pressing return
    if (event.keyCode === 13) onSuccess();
  };

  return (
    <ModalWrapper>
      <Modal
        isOpen={isOpen}
        showCloseIcon={showCloseIcon}
        toggle={toggle}
        className={`custom-modal action-modal ${className}`}
        {...attr}
      >
        <div ref={actionModalNode}>
          <ModalHeader className="d-inline-flex flex-column">
            {title}
          </ModalHeader>
          <ModalBody>
            <p className="font-regular">{mainText || children}</p>
          </ModalBody>
          <ModalFooter className="d-flex justify-content-end">
            {buttonFailure && (
              <ModalButtonWrapper
                type="secondary"
                onClick={onFailure}
              >
                {buttonFailure}
              </ModalButtonWrapper>
            )}
            {buttonSuccess && (
              <ModalButtonWrapper
                type="primary"
                onClick={onSuccess}
              >
                {buttonSuccess}
              </ModalButtonWrapper>
            )}
          </ModalFooter>
        </div>
      </Modal>
    </ModalWrapper>
  );
};

ActionModal.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string.isRequired,
  mainText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  buttonSuccess: PropTypes.string,
  buttonFailure: PropTypes.string,
  showCloseIcon: PropTypes.bool,
  onSuccess: PropTypes.func,
  onFailure: PropTypes.func,
  onClose: PropTypes.func,
  toggle: PropTypes.func.isRequired,
  className: PropTypes.string,
  isClosedOnEsc: PropTypes.bool,
  isClosedOnOutsideClick: PropTypes.bool,
};

ActionModal.defaultProps = {
  isOpen: false,
  buttonSuccess: "",
  buttonFailure: "",
  showCloseIcon: true,
  className: "",
  onSuccess: undefined,
  onFailure: undefined,
  onClose: undefined,
  isClosedOnEsc: false,
  isClosedOnOutsideClick: false,
};

export default ActionModal;
