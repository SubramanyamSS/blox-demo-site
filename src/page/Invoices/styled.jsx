import styled, { css } from "styled-components";

const gridWidth = (itemsPerRow) => {
  return Math.floor(100 / itemsPerRow) - 0.5;
};

const TaggingContentWrapper = styled.div`
  width: 85%;
  margin: 0 auto;
  padding: 6rem 0 4rem;
`;

const UseCaseWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
`;

const UseCaseContent = styled.div`
  width: 25%;
  display: flex;
  padding: 50px 30px;
  text-align: center;
  transition: 0.2s ease;
  height: auto;
  max-height: 280px;
  border: 0.5px solid #d9d9d9;
  flex-direction: column;
  flex-wrap: nowrap;
  border-radius: 50px;
  background: #fff;
  color: #333;
  margin-right: 30px;
  cursor: pointer;

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:last-child {
    margin-right: 0px;
  }

  &:not(.highlight):hover {
    transform: scale(1.02);
    transform-origin: bottom;
    /*border: .5px solid #2962ff;*/
  }

  &.highlight {
    border-color: #2962ff;
  }

  i {
    font-size: 24px !important;
    display: inline-block !important;
  }

  h3 {
    font-family: "Poppins_Medium" !important;
    font-size: 20px !important;
    line-height: 1.2 !important;
    font-weight: 300 !important;
  }

  ul {
    padding: 0px;
    margin: 0;
  }

  .description {
    line-height: 26px;
    color: #333 !important;
    font-size: 16px !important;
    margin-bottom: 2px !important;
    padding: 0;
    font-family: "Poppins_Regular";
    list-style: none;
  }

  .description__item {
    display: flex;
    align-items: center;
    text-align: left;
    margin-bottom: 20px;
    color: #000;
    &:last-child {
      margin-bottom: 0px;
    }
    &_disabled {
      opacity: 0.3;
    }
  }

  a.description__item {
    cursor: pointer;
    color: #2862ff;
    &:hover {
      text-decoration: underline;
    }
  }

  .description__icon {
    margin-right: 20px;
    display: flex;
    align-items: center;
    img {
      width: 30px;
      height: 30px;
    }
  }

  .description__content {
    font-size: 16px;
    font-family: "Poppins_Regular";
  }
`;

const SearchBoxWrapper = styled.div`
  width: 70%;
  height: 60px;
  margin: 70px auto 50px;
  position: relative;

  input {
    width: 100%;
    color: #333;
    height: 100%;
    outline: none;
    font-size: 16px;
    font-weight: 300;
    font-family: "Open_Sans_Regular" !important;
    padding: 5px 20px;
    border-radius: 30px;
    letter-spacing: 0.7px;
    border: 1px solid #2862ff;
    padding-right: 175px;
  }

  button {
    position: absolute;
    right: 6px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    background-color: #2862ff;
    height: 80%;
    color: #ffffff;
    border-radius: 30px;
    border: none;
    outline: none;
    width: 160px;
    font-family: Poppins_Regular;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 1.05px;
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

const TextareaWrapper = styled.div`
  width: 70%;
  height: 200px;
  margin: 70px auto 70px;
  position: relative;
  text-align: center;

  textarea {
    width: 100%;
    height: 100%;
    border: 1px solid #2862ff;
    border-radius: 10px;
    padding: 20px;
    font-size: 16px;
    font-weight: 300;
    font-family: "Open_Sans_Regular" !important;
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

const FormInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 70px 0;
  .separator {
    margin: 0 20px;
  }
  button {
    background: #2862ff;
      border: none;
      width: 160px;
      color: #fff;
      height: 60px;
      border-radius: 30px;
      margin-right: 30px;
      cursor: pointer;
      font-size: 14px;
      font-family: Poppins_Regular;
      font-weight: 700;
      letter-spacing: 1.05px;
      text-transform: uppercase;
  }
`;


const FileUploadWrapper = styled.div`
  width: 70%;
  height: 60px;
  position: relative;
  border: 1px solid #2862ff;
  border-radius: 30px;

  input {
    width: 100%;
    color: #333;
    height: 100%;
    outline: none;
    font-size: 16px;
    font-weight: 300;
    font-family: "Open_Sans_Regular" !important;
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

const CatalogWrapper = styled.div`
  p {
    font-size: 16px;
    font-family: "Open_Sans_Regular";
  }
`;

const CatalogContentWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, calc(100% / 3));

  img {
    max-width: 260px;
    max-height: 318px;
    margin: 0 auto;
  }
  iframe {
    height: 386px;
    margin-top: 20px;
  }
`;

const IframeWrapper = styled.div`
  position: relative;
  text-align: center;
  .overlay {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`

const ContentBoxWrapper = styled.div`
  position: relative;
  border: solid 1px #ccc;
  border-radius: 10px;
  whitespace: wrap;
  overflow: hidden;
  margin: 70px 10px 10px;
  width: calc(100% - 20px);
  cursor: pointer;
  transition: transform 0.5s ease;

  p {
    max-height: 140px;
    margin: 10px !important;
    overflow: hidden;
    font-size: 10px;
  }

  button {
    position: absolute;
    top: 5px;
    right: 5px;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 4px;
    border-radius: 5px;
    background-color: #fff;
    border: solid 1px #ccc;
    i {
      margin: 0;
    }
  }
`;

const ContentPopup = styled.div`
  position: fixed;
  width: 40%;
  height: 40%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border: solid 1px #ccc;
  border-radius: 10px;
  padding: 25px;
  min-height: 300px;
  z-index: 100000;

  ${(props) =>
    props.status
      ? css`
          display: block;
        `
      : css`
          display: none;
        `}

  p {
    overflow-y: scroll;
    max-height: 100%;
  }

  button {
    position: absolute;
    right: -10px;
    top: -10px;
    border-radius: 50%;
    background-color: #2862ff;
    color: #fff;
    border: none;
    outline: none;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
`;

const TableWrapper = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: left;
  th {
    // background: rgba(177,197,252) !important;
    // color: #FFF;
    font-weight: 700 !important;
    font-family: Poppins_Medium !important;
    text-transform: capitalize;
  }

  td,
  th {
    background-color: #fff;
    padding: 10px;
    // border-bottom: solid 0.5px #d9d9d9;
    // border-right: solid 0.5px #d9d9d9;
    // font-weight: 600;
    font-family: Poppins_Regular !important;
    font-size: 13px;
    width: calc(50%);
    // text-align: left;
    // border-radius: 10px;
    &:first-child {
      // padding-left: 0;
      font-weight: 600;
    }
    &.font-light {
      font-weight: 300;
    }
    &:nth-child(2) {
      // width: 55%;
      font-weight: 300;
      // text-align: center;
    }
    &:last-child {
      // width: 15%;
      font-weight: 300;
      // text-align: right;
      border-right: none;
      padding-right: 0;
    }
  }

  tr {
    display: flex;
    justify-content: space-between;
    // margin-bottom: 8px;
    &:nth-child(2n+1) {
      td {
        background-color: #e4e7ff;
      }
    }
    &:last-child {
      td {
        border-bottom: none;
      }
    }
  }
  tbody tr {
    cursor: pointer;
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

export {
  AlertEl,
  TaggingContentWrapper,
  UseCaseWrapper,
  UseCaseContent,
  SearchBoxWrapper,
  TextareaWrapper,
  CatalogWrapper,
  FileUploadWrapper,
  CatalogContentWrapper,
  ContentBoxWrapper,
  ContentPopup,
  IframeWrapper,
  FormInputWrapper,
  TableWrapper,
  LoadingWrapper
};
