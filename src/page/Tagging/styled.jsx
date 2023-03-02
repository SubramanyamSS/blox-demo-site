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
    margin-bottom: 30px !important;
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
    ${props =>
      props.allowOptions ? css`
        padding-left: 175px;
      `: null
    }
  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    background: transparent;
    background-image: url("data:image/svg+xml;utf8,<svg fill='blue' height='35' viewBox='0 0 24 24' width='35' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
    background-repeat: no-repeat;
    background-position-x: 100%;
    background-position-y: 5px;
    position: absolute;
    left: 6px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    // background-color: #2862ff;
    height: 80%;
    color: #2862ff;
    border-radius: 30px;
    border: solid 1px #2862ff;
    outline: none;
    width: 160px;
    font-family: Poppins_Regular;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 1.05px;
    text-align: left;
    padding: 15px;
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

const InputFieldsWrapper = styled.form`
  width: 75%;
  margin: 80px auto 60px;
  padding: 50px;
  box-shadow: 0px 0px 25px 0.5px #ccc;
  border-radius: 20px;

  .field__wrapper {
    display: flex;
    width: 700px;
    margin: 0 auto 30px;
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

const FileUploadWrapper = styled.div`
  width: 70%;
  height: 60px;
  margin: 70px auto 0;
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
`;

const CatalogWrapper = styled.div`
  p {
    font-size: 16px;
    font-family: "Open_Sans_Regular";
  }
`;

const CatalogContentWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, ${props => props.columnWidth || '25%'});

  img {
    max-width: 260px;
    max-height: 318px;
    margin: 0 auto;
  }
`;

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

const Divider = styled.hr`
  background-color: #d9d9d9;
  height: 1px;
  border: 0;
`;

export {
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
  InputFieldsWrapper,
  Divider,
};
