import styled, { css } from "styled-components";

const QAContentWrapper = styled.div`
  width: 85%;
  margin: 0 auto;
  padding: ${(props) =>
    props.BreadcrumbLinksLoaded ? "4rem 0" : "6rem 0 4rem"};
  font-family: Poppins_Regular;
`;

const TaggingAuditContentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  font-family: Poppins_Regular;
`;

const TaggingAuditHeading = styled.h2`
  font-family: Poppins_Regular;
  text-align: center;
  margin-bottom: 20px;
`;

const TaggingAuditContentImage = styled.div`
  width: 35%;
  margin-right: 30px;
  position: relative;
  img {
    padding: 10px;
    width: 100%;
    border: 2px rgb(228, 231, 255) solid;
    border-radius: 10px;
  }
`;

const TaggingAuditForm = styled.form`
  width: 75%;
  text-align: center;
  // border: 0.5px #2862ff solid;
  padding: 30px;
  border-radius: 10px;
  background-color: rgb(228, 231, 255);
`;

const TaggingAuditFormHeading = styled.h3`
  font-family: Poppins_Regular;
  margin-bottom: 50px;
`;

const TaggingAuditOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  margin: 0 auto;
  border-top: solid 2px #fff;
  border-right: solid 2px #fff;
`;

const TaggingAuditOption = styled.div`
  width: calc(100% / 3);
  text-align: left;
  padding: 20px 10px;
  border-left: solid 2px #fff;
  border-bottom: solid 2px #fff;
  input {
    vertical-align: middle;
    margin-right: 10px;
    cursor: pointer;
  }
  label {
    vertical-align: middle;
    cursor: pointer;
    min-width: 18px;
    display: inline-block;
  }
`;

const TaggingAuditButton = styled.button`
  height: 55px;
  cursor: pointer;
  background-color: ${(props) =>
    props.loaderState ? "transparent" : "#2862ff"};
  color: #fff;
  font-family: Poppins_Regular;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 1.05px;
  border: none;
  outline: none;
  border-radius: 30px;
  padding: 0 45px;
  display: block;
  margin: 30px auto 0;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.h4`
  color: red;
  font-family: Poppins_Regular;
  text-align: center;
`;

const ErrorWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .icon {
    color: #2862ff;
  }
  span {
    font-size: 20px;
    margin-top: 20px;
  }
`;

const ImageMetaData = styled.div`
  text-align: center;
  margin-bottom: 10px;
  span {
    font-size: 16px;
    font-weight: bold;
    font-family: Poppins_Regular;
  }
`;

const LoadingWrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background: transparent;
  z-index: 1000;
`;

const AlertEl = styled.div`
  text-align: center;
  font-family: "SourceSansPro-Regular";
  font-size: 24px;
  line-height: 30px;
  font-weight: bold;
  color: #2862ff;
  width: 450px;
  margin: 20px;
  left: 32%;
  background-color: #fff;
  position: fixed;
  z-index: 1;
  box-sizing: border-box;
  transition: transform 0.5s;
  box-shadow: 0px 0px 21px -9px #000;
  border-radius: 30px;
  cursor: default;

  ${(props) => css`
    transform: ${props.isActive
      ? "translate(10px, 100px)"
      : "translate(10px, -55px)"};
    ${props.isActive
      ? css`
          padding: 10px 60px;
        `
      : `padding: 0;`}
  `}
`;

const ImageIconWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  background: rgb(228, 231, 255);
  padding: 5px;
  border-radius: 8px;
  i {
    color: #2862ff;
    margin: 0 auto !important;
    vertical-align: initial !important;
  }
`;

const ZoomTools = styled.div`
  position: absolute;
  z-index: 1;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
`;

const ZoomContainer = styled.div`
  position: relative;
  padding: 15px;
  .react-transform-wrapper {
    margin: 0 auto;
  }
`;

const ZoomButton = styled.button`
  margin-bottom: 1rem;
  cursor: pointer;
  border: none;
  outline: none;
  background: #2862ff;
  padding: 5px;
  border-radius: 8px;
  box-shadow: 2px 2px 3px 2px #e4e7ff;
  i {
    color: #fff;
    margin: 0 auto 3px !important;
    vertical-align: initial !important;
  }
`;

export {
  QAContentWrapper,
  TaggingAuditContentWrapper,
  TaggingAuditContentImage,
  TaggingAuditForm,
  TaggingAuditOptions,
  TaggingAuditOption,
  TaggingAuditButton,
  TaggingAuditFormHeading,
  TaggingAuditHeading,
  ErrorMessage,
  ErrorWrapper,
  ImageMetaData,
  LoadingWrapper,
  AlertEl,
  ImageIconWrapper,
  ZoomButton,
  ZoomContainer,
  ZoomTools,
};
