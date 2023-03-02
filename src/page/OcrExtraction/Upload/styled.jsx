import Button from "msd-button";
import styled from "styled-components";

import UploadIcon from "../../../static/svg/cloud-upload.svg";

const FileUploadWrapper = styled.div`
  width: 350px;
  height: 350px;
  margin: 70px auto 0;
  position: relative;
  border: 1px solid #2862ff;
  border-style: dashed;
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

const ButtonWrapper = styled(Button)`
  cursor: pointer;
  background-color: #2862ff;
  height: 2.5rem;
  color: #ffffff;
  border-radius: 30px;
  border: none;
  outline: none;
  width: 230px;
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

const ImageUploadIcon = styled.div`
  mask-image: url(${UploadIcon});
  mask-repeat: no-repeat;
  mask-position: center;
  background-color: #507fff;
  height: 100px;
  width: 100px;
  margin: 2em 1em 2em 1em;
  cursor: pointer;
`;

const BreadcrumbWrapper = styled.div`
  position: absolute;
  width: 50%;
  z-index: 900;
  top: 10%;
  left: 2%;

  div {
    width: 85%;
    font-size: 14px;
    font-weight: 300;
    font-family: "Open_Sans_Regular" !important;
  }

  .separator {
    margin: 0 10px;
  }
`;

export { ButtonWrapper, FileUploadWrapper, ImageUploadIcon, BreadcrumbWrapper };
