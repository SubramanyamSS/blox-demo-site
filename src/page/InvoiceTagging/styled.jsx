import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const TaggingCategoryWrapper = styled.div`
  padding-top: 50px;
`;

const BreadcrumbWrapper = styled.div`
  position: fixed;
  width: 100%;
  padding: 20px 0;
  background: #fff;
  z-index: 900;

  div {
    width: 85%;
    margin: 0 auto;
    font-size: 16px;
    font-weight: 300;
    font-family: Poppins_Regular !important;
  }

  .separator {
    margin: 0 10px;
  }
`;

const InputFieldsWrapper = styled.form`
  width: 85%;
  margin: 80px auto 60px;

  & > div {
    margin-bottom: 30px;
    display: flex;
    width: 700px;
    &:last-child {
      margin-bottom: 0px;
      justify-content: flex-end;
    }
  }

  label {
    width: 200px;
    display: inline-block;
    font-size: 16px;
    font-weight: 600;
    font-family: Poppins_Regular !important;
    margin-top: 22px;
  }

  input,
  textarea {
    width: 500px;
    height: 60px !important;
    color: #333;
    height: 100%;
    outline: none;
    font-size: 16px;
    font-weight: 300;
    font-family: Poppins_Regular !important;
    padding: 5px 20px;
    border-radius: 10px;
    letter-spacing: 0.7px;
    border: 1px solid #2862ff;
  }

  textarea {
    height: 200px !important;
    padding: 20px;
  }

  .button__wrapper {
    width: 500px;
    text-align: center;
  }

  button {
    height: 55px;
    cursor: pointer;
    background-color: #2862ff;
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
    margin-top: 15px;
    width: 160px;
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

const TextareaWrapper = styled.div`
  width: 70%;
  height: 200px;
  margin: 100px auto 150px;
  position: relative;
  text-align: center;

  textarea {
    width: 100%;
    height: 100%;
    border: 1px solid #2862ff;
    border-radius: 10px;
    padding: 20px;
    font-size: 16px;
    font-weight: 600;
    font-family: Poppins_Regular !important;
    outline: none;
  }

  button {
    height: 55px;
    cursor: pointer;
    background-color: #2862ff;
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
    margin-top: 15px;
    width: 160px;
  }
`;

const FileUploadWrapper = styled.div`
  width: 70%;
  height: 60px;
  margin: 122px auto;
  position: relative;
  border: 1px solid #2862ff;
  border-radius: 30px;

  input {
    width: 100%;
    color: #333;
    height: 100%;
    outline: none;
    font-size: 16px;
    font-weight: 600;
    font-family: Poppins_Regular !important;
    padding: 5px;
    letter-spacing: 0.7px;
    &::-webkit-file-upload-button {
      background: #2862ff;
      border: none;
      width: 160px;
      color: #fff;
      height: 100%;
      border-radius: 30px;
      margin-right: 30px;
      cursor: pointer;
      font-size: 14px;
      font-family: Poppins_Regular;
      font-weight: 700;
      letter-spacing: 1.05px;
      text-transform: uppercase;
    }
    &::-ms-browse {
      background: #2862ff;
      border: none;
      padding: 0 100px;
      color: #fff;
      height: 100%;
      border-radius: 30px;
      margin-right: 30px;
      cursor: pointer;
      font-size: 14px;
      font-family: Poppins_Regular;
      font-weight: 700;
      letter-spacing: 1.05px;
      text-transform: uppercase;
    }
  }
  input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &::-webkit-file-upload-button {
      opacity: 0.5;
      cursor: not-allowed;
    }
    &::-ms-browse {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

const Divider = styled.hr`
  background-color: #d9d9d9;
  height: 1px;
  border: 0;
`;

const ErrorWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Poppins_Regular;
  .icon {
    color: #2862ff;
  }
  span {
    font-size: 20px;
    margin-top: 20px;
  }
`;

const ResultsWrapper = styled.div`
  width: 85%;
  margin: 0 auto;
  padding-bottom: 4rem;
`;

const ResultBlocksWrapper = styled.div`
  display: flex;
  margin-bottom: 40px;
  &:last-child {
    margin-bottom: 0px;
  }
`;

const ResultsHeading = styled.div`
  font-size: 24px;
  font-family: Poppins_Medium;
  color: rgb(25, 30, 80);
  margin-bottom: 60px;
  padding-top: 60px;
`;

const TableWrapper = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: left;
  table-layout: auto !important;
  .status {
    padding: 6px 12px;
    border-radius: 15px;
    // height: 30px;
    font-size: 14px;
    text-align: center;
    &.success {
      background-color: #5ff0866f;
      color: #167224;
    }
    &.partial {
      background-color: #fffc8e;
      color: #86811E;
    }
    &.failure {
      background-color: #FEF8E9;
      color: #EE9501;
    }
    &.exception {
      background-color: #f49c9c79;
      color: #de0808;
    }
    &.probable {
      background-color: #E5EFFA;
      color: #006CE3;
    }
  }
  th {
    font-weight: 700 !important;
    font-family: Poppins_Medium !important;
    text-transform: capitalize;
    background-color: #e4e7ff;
  }
  td {
    &.clickable {
      color: #2862ff;
      cursor: pointer;
    }
  }
  td,
  th {
    // background-color: #fff;
    padding: 10px;
    border-bottom: solid 0.5px #d9d9d9;
    // border-right: solid 0.5px #d9d9d9;
    font-family: Poppins_Regular !important;
    font-size: 14px;
    width: auto !important;
    &:first-child {
      // padding-left: 0;
      font-weight: 600;
      text-transform: capitalize;
    }
    &.font-light {
      font-weight: 300;
    }
    &:nth-child(2) {
      font-weight: 300;
    }
    &:last-child {
      font-weight: 300;
      border-right: none;
      padding-right: 0;
    }
  }

  tr {
    &:last-child {
      td {
        border-bottom: none;
      }
    }
  }
`;

const ResultTabWrapper = styled.div`
  width: 70%;
  .menu {
    .item {
      margin: 0 6px !important;
      justify-content: center !important;
      min-width: 170px !important;
      border-radius: 30px !important;
      background-color: #f8f8f8 !important;
      border: 1px solid #6c6c6c !important;
      font-family: Poppins_Semi_Bold !important;
      font-size: 16px !important;
      &.active {
        background-color: #2862ff !important;
        color: #fff !important;
        border-color: #2862ff !important;
      }
    }
  }
  .segment {
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
    background: transparent !important;
  }
`;

const InnerTabWrapper = styled.div`
  .tab {
    background: transparent;
  }
  .menu {
    border-bottom: none !important;
    min-height: 30px !important;
    margin: 25px 0 30px !important;
    .item {
      margin: 0 15px !important;
      min-width: unset !important;
      font-size: 16px !important;
      padding: 0px 5px !important;
      border: none !important;
      background: transparent !important;
      text-transform: uppercase !important;
      &:first-child {
        margin-left: 0px !important;
      }
      &.active {
        background-color: transparent !important;
        color: #000 !important;
        position: relative;
        &:after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          background: #2862ff;
          border-radius: 25px;
          height: 4px;
          width: 100%;
        }
      }
    }
  }
`;

const ResultImageWrapper = styled.div`
  display: unset;
  margin-right: 30px;
  width: 25%;

  img {
    position: sticky;
    top: 100px;
    max-width: 300px;
  }

  iframe {
    height: 387px;
  }
`;

const ResponseWrapper = styled.div`
  position: relative;

  textarea {
    width: 100%;
    max-height: 700px;
    padding: 20px;
    background-color: #e4e7ff;
    border-color: transparent;
    border-radius: 10px;
    font-family: Poppins_Medium;
    line-height: 20px;
    padding-right: 70px;
    &:focus {
      border-color: #2862ff;
      outline: #2862ff;
    }
    /* width */
    ::-webkit-scrollbar {
      width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #d9d9d9;
      border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #2862ff;
      border-radius: 10px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #2862ff;
    }
  }

  button {
    position: absolute;
    right: 20px;
    top: 20px;
    padding: 5px 20px;
    background-color: #2862ff;
    color: #fff;
    font-family: Poppins_Regular;
    font-size: 20px;
    border: none;
    outline: none;
    border-radius: 30px;
    cursor: pointer;
    text-align: center;
    height: 43px;
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
  font-family: Poppins_Semi_Bold;
  font-size: 18px;
  line-height: 30px;
  font-weight: bold;
  color: ${(props) =>
    props.type === "ERROR" || props.type === "FAILURE" ? "red" : "#2862ff"};
  width: 450px;
  margin: 20px;
  left: 50%;
  background-color: #fff;
  position: fixed;
  z-index: 1;
  box-sizing: border-box;
  transition: bottom 0.5s;
  box-shadow: 0px 0px 21px -9px #000;
  border-radius: 30px;
  cursor: default;
  transform: translate(-50%, -50%);

  ${(props) => css`
    ${props.isActive
      ? css`
          padding: 10px 60px;
          opacity: 1;
          bottom: 50%;
        `
      : `padding: 0px;
  opacity: 0;
  bottom: 100px;`}
  `}
`;

const PlaceholderWrapper = styled.div`
  background-color: #f3f4fb;
  height: 386px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .heading {
    font-size: 18px;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  a {
    width: 100%;
    cursor: pointer;
    padding: 12px 0;
    display: inline-block;
    border-radius: 30px;
    overflow: hidden;
    font-size: 14px;
    text-align: center;
    text-transform: uppercase;
    font-weight: 500;
  }
`;

const OCRButton = styled(Link)`
  background: #2862FF;
  color: #fff;
  margin-bottom: 10px;
  &:hover {
    color: #fff;
  }
`;

const ViewPdfButton = styled(Link)`
  box-shadow: 2px 2px 5px #00000029;
  color: #000;
  background: #fff 0% 0% no-repeat padding-box;
  &:hover {
    color: #000;
  }
}
`;

const ModalSubHeading = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
`;

export {
  TaggingCategoryWrapper,
  InputFieldsWrapper,
  ResultBlocksWrapper,
  TableWrapper,
  BreadcrumbWrapper,
  ResultTabWrapper,
  TextareaWrapper,
  FileUploadWrapper,
  ResultsHeading,
  ResultImageWrapper,
  ResultsWrapper,
  Divider,
  ResponseWrapper,
  InnerTabWrapper,
  LoadingWrapper,
  ErrorWrapper,
  AlertEl,
  PlaceholderWrapper,
  ButtonWrapper,
  OCRButton,
  ViewPdfButton,
  ModalSubHeading
};
