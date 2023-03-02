import styled from "styled-components";

const FooterWrapper = styled.div`
  .footer-wrapper {
    height: 100px;
    width: 100%;
    justify-content: flex-end;
    padding-right: 40px;
    position: absolute;
    bottom: 0;
    left: 0;
    .footer-btn-wrapper {
      & > * {
        margin-left: 20px;
      }
    }
  }

  .footer-box-shadow {
    box-shadow: 0px -6px 10px #191e5014;
  }

  .footer-border {
    border-top: 1px solid #e1e3f4;
  }
`;

export { FooterWrapper };
