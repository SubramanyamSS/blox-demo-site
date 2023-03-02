import styled from "styled-components";
import Button from "msd-button";

const ModalWrapper = styled.div`
  .custom-modal {
    z-index: 5;

    .modal-content {
      width: 90%;
      height: 90%;
      max-width: 1280px;
      max-height: 720px;
      border-radius: 30px;
      border: 1px solid #e2e2e2;

      .modal-header {
        padding: 20px 30px;
        font-size: 22px;
        font-weight: 600;
        width: 100%;
        height: 68px;
      }

      .modal-body {
        padding: 30px;
        width: 100%;
        height: calc(100% - 168px);
      }

      .modal-close-icon {
        top: 0px;
        right: 0px;
        height: 50px;
        width: 50px;
        border-radius: 0 0 0 5px;
        mask: none !important;
        mask-image: none !important;
        -webkit-mask-image: none !important;
        // background: url("/assets/icons/pop-up_close.svg")
      }

      .modal-footer {
        padding: 25px 30px;
        width: 100%;
        bottom: 0;

        button {
          height: 50px;
          margin: 0 0 0 30px;
        }
      }
    }

    &.action-modal {
      .modal-content {
        width: 600px;
        height: auto;
        max-height: none;
        max-width: none;

        .modal-body {
          position: relative;
          padding: 35px 30px;
          line-height: 21px;
        }

        .modal-footer {
          position: relative;

          .modal-failure-button {
            font-size: 16px;
          }
        }
      }
    }
  }
`;

const ModalButtonWrapper = styled(Button)`
  cursor: pointer;
  background-color: ${({ type }) =>
    type === "secondary" ? "grey" : "#2862FF"};
  height: 3rem;
  color: #ffffff;
  border-radius: 30px;
  border: none;
  outline: none;
  width: 100px;
  font-family: Poppins_Regular;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 1.05px;
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: center;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export { ModalWrapper, ModalButtonWrapper };
