import styled, { css, keyframes } from "styled-components";
import {
  InputEl,
  RecommendationBtn,
  ImageContainer,
  CarouselItemWrapper,
} from "../../component";

const TitleEl = styled.div`
  height: 3.5em;
  line-height: 3.5em;
  border-bottom: 1px solid #e2e2e2;
  text-transform: uppercase;
  text-align: center;
  color: #064559;
  font-size: 1.25em;
  font-family: "SourceSansPro-SemiBold";
  position: fixed;
  top: 45px;
  min-width: 1240px;
  width: 100%;
  z-index: 1;
  background-color: #fff;
`;

const UserProfileWrapper = styled.div`
  background-color: #f3f4fb;
  margin-top: 7rem;
  padding: 30px 0;
  input {
    padding: 0.75em 0.75em;
    margin: 1px;
    &[type="text"] {
      height: 100%;
      width: 100%;
      border: none;
      outline: none;
      border-radius: 30px;
      font-family: Open_Sans_Regular !important;
      font-size: 16px;
      font-weight: 300;
      letter-spacing: 0.7px;
    }
    &[type="submit"] {
      width: 40%;
      max-width: 600px;
      height: 50px;
      background-color: rgb(40, 98, 255);
      color: #fff;
      margin-top: 10px;
      cursor: pointer;
      border-radius: 30px;
      border: none;
      font-family: Poppins_Regular !important;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 16px;
      letter-spacing: 1.05px;
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
`;
const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const UserInputCont = styled.div`
  text-align: center;
  width: 40%;
  max-width: 600px;
  height: 60px;
  margin: 10px auto;
  color: rgb(51, 51, 51);
  outline: none;
  padding: 5px;
  border-radius: 30px;
  border: 1px solid rgb(40, 98, 255);
  background: #fff;
  display: flex;
  justify-content: space-between;
`;

const InputSectionCont = styled.div`
  &:first-child {
    margin-bottom: 20px;
  }
`;

const UserInfoWrapper = styled.table`
  border-collapse: collapse;
  background-color: #e4e7ff;
  width: 40%;
  max-width: 600px;
  margin: 20px auto 0;

  td {
    padding: 10px 20px;
    font-weight: 600;
    font-family: "Open_Sans_Regular" !important;
    font-size: 14px;
    width: 27%;
    &:nth-child(2) {
      width: 65%;
      font-weight: 300;
      text-align: center;
    }
    &:last-child {
      width: 15%;
      font-weight: 300;
      text-align: right;
    }
    button {
      padding: 5px 10px;
      background-color: #2862ff;
      color: #fff;
      font-family: "Open_Sans_Regular";
      font-size: 20px;
      border: none;
      outline: none;
      border-radius: 30px;
      cursor: pointer;
      text-align: center;
      // height: 43px;
    }
  }

  tr {
    display: flex;
    align-items: center;
    border-bottom: solid 0.5px #fff;
    &:last-child {
      border-bottom: none;
    }
  }
`;

const ProductRecommendationWrapper = styled.div`
  width: 87.5%;
  margin: auto;
  background-color: #fff;
  ${RecommendationBtn} {
    display: block;
  }
  margin-bottom: 1%;

  ${(props) => css`
    ${CarouselItemWrapper} {
      height: ${props?.styleConfig?.image?.height ||
        (props?.isHorizontal ? "150" : "320")}px;
    }
  `}
`;

const PdtRecommendationTabsWrapper = styled.div`
  display: flex;
  margin-bottom: 5px;
  padding-left: 1rem;
  padding-top: 0.5rem;
`;

const PdtRecommendationTabs = styled.div`
  color: #000;
  font-size: 16px;
  font-family: "Poppins_Medium";
  padding: 10px 5px;
  margin: 0 15px;
  line-height: 120%;
  cursor: pointer;
  ${(props) =>
    props.isActive
      ? css`
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
        `
      : null}
`;
const RecosKeyFrames = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const RecosLoader = styled.div`
  border: 10px solid #f3f3f3; /* Light grey */
  border-top: 10px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${RecosKeyFrames} 2s linear infinite;
  margin: auto;
`;

const LoadingPersonalisedResults = styled.h4`
  width: 87.5%;
  margin-top: 50px !important;
  margin: auto;
  padding-left: 34px;
  padding-right: 34px;
  color: #000;
  font-family: Poppins_Medium !important;
  font-size: 18px !important;
  line-height: 1.2 !important;
  font-weight: 400 !important;
`;

const WordCloudWrapper = styled.div`
  width: 100%%;
  float: left;
  padding-left: 1rem;
`;

const DropDownContainer = styled.div`
  width: 87.5%;
  margin: 30px auto 0 !important;
  margin-top: 1rem;
  ${LoadingPersonalisedResults} {
    width: 100%;
  }
  .text {
    padding-left: 3px;
    font-family: "Poppins_Medium";
  }
  .ui.search.selection.dropdown > input.search {
    padding: 9.5px 29.4px 9.5px 3px;
  }
  .ui.selection.active.dropdown .menu {
    border-color: #2862ff !important;
  }
`;
const OverallContainer = styled.div`
  width: 700px;
`;

const UserDataAffinityContainer = styled.div`
  width: calc(87.5% - 60px);
  margin: 0 auto;
  margin-bottom: 5rem;
  margin-top: 2rem;
  padding: 2rem 0;
  border-radius: 5px;
  display: grid;
  grid-template-columns: repeat(auto-fill, calc(50% - 16px));
  grid-gap: 20px;
  align-items: stretch;
  justify-content: left;
`;

const SpiderBlockContainer = styled.div`
  display: inline-block;
  background-color: #e4e7ff;
  border-radius: 20px;
  display: flex;
  // align-items: top;
  justify-content: flex-start;
  padding: 15px;
  flex-direction: column;
  padding: 15px;
  h4 {
    font-family: "Poppins_Semi_Bold" !important;
  }
`;

const WordCloudContainer = styled.div`
  display: inline-block;
  background-color: ${(props) =>
    props.type === "negative"
      ? "rgba(230,124,103,0.5)"
      : props.type === "positive"
      ? "rgba(155,245,132,0.5)"
      : "rgba(155,245,132,0.5)"};

  height: 340px;
  padding: 15px;
  border-radius: 20px;
  h4 {
    font-family: "Poppins_Semi_Bold" !important;
  }
`;
const SparkLineContainer = styled.div`
  display: inline-block;
  padding-left: 20px;
`;

const AffinityButton = styled.div`
  margin-left: 43%;
`;

const SessionContainer = styled.div`
  width: calc(87.5% - 60px);
  margin: 0 auto;
  .subHeading {
    font-family: Poppins_Medium !important;
  }
  tbody {
    display: block;
    height: 300px;
    overflow: auto;
    overflow-y: scroll;
    margin-right: -4px;
    &::-webkit-scrollbar {
      width: 4px;
    }
  }
  .ui.structured.table {
    border-collapse: separate;
  }

  thead,
  tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
    font-family: Poppins_Medium !important;
    border-bottom: 1px solid rgba(34, 36, 38, 0.1);
  }
  tbody tr td:first-child {
    cursor: pointer;
    text-decoration: underline;
    &:hover {
      background-color: #e4e7ff;
    }
  }
  .horizontalFlex {
    display: flex;
    width: 100%;
    height: 100%;
  }
  .horizontalFlex .ui.table {
    border-radius: 5px;
  }
  .verticalFlex {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
  .sessionChart_wrapper {
    border-radius: 5px;
    background-color: #e4e7ff;
    width: 100%;
    padding: 12px;
    margin-left: 20px;
    height: 100%;
    padding-bottom: 27px;
  }
  .time_delta {
    font-size: 28px;
    text-align: center;
    margin-top: 30px;
  }
  .session_bubble_chart,
  .sessionChart_wrapper {
    svg {
      width: 103% !important;
    }
  }
  .session_bubble_chart {
    .axes .Axis:nth-child(2) {
      .tickLabel {
        transform: translate3d(5px, 36px, 0px) rotate(45deg) !important;
      }
    }
  }
  .tooltip-wrap > div > div > div {
    background: #e4e7ff !important;
    color: #000 !important;
    box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.3) !important;
    & > div:first-child {
      border-color: #e4e7ff !important;
      border-top: 5.6px solid transparent !important;
      border-bottom: 5.6px solid transparent !important;
      // box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.3) !important;
    }
  }
`;

const Divider = styled.hr`
  background-color: #d9d9d9;
  height: 1px;
  border: 0;
`;

const ResultsFor = styled.div`
  width: 87.5%;
  margin-bottom: 30px !important;
  margin: auto;
  padding: 4px 25px;
  padding-left: 30px;
  font-family: "Poppins_Regular";

  span {
    font-size: 16px;
    font-family: "Poppins_Semi_Bold";
  }

  i {
    left: 10px;
    font-size: 14px;
    cursor: pointer;
    position: relative;
  }

  button {
    border: none;
    cursor: pointer;
    min-width: 100px;
    padding: 5px 10px;
    text-shadow: none;
    background-image: none;
    margin: 0 6px !important;
    color: rgb(255, 255, 255);
    border-radius: 30px !important;
    font-family: "Poppins_Semi_Bold";
    background-color: rgb(41, 98, 255);
    box-shadow: 0 0 0 0 rgb(34 36 38 / 15%) inset;
  }
`;

const DatePickerPopUp = styled.div`
  position: absolute;
  z-index: 1;
  box-shadow: 0px 0px 5px 1px #ccc;
  right: 0;
  background: #fff;
  display: ${(props) => (props.datePickerPopupState ? "block" : "none")};
  .rdrDateRangePickerWrapper {
    border-top: 1px solid #eff2f7;
  }
  .rdrStartEdge,
  .rdrInRange,
  .rdrEndEdge,
  .rdrStaticRangeSelected {
    color: rgb(41, 98, 255) !important;
  }
`;

const DateFilterButton = styled.div`
  border: none;
  cursor: pointer;
  min-width: 100px;
  padding: 5px 10px;
  text-shadow: none;
  background-image: none;
  margin: 0 6px !important;
  color: rgb(255, 255, 255);
  border-radius: 30px !important;
  font-family: "Poppins_Semi_Bold";
  background-color: rgb(41, 98, 255);
  box-shadow: 0 0 0 0 rgb(34 36 38 / 15%) inset;
  font-size: 14px;
`;

const DataMissingWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Poppins_Semi_Bold";
  background-color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
`;

const DatePickerPopUpHeader = styled.div`
  display: flex;
  align-items: center;
  h3 {
    margin: 0;
    margin-left: 15px;
  }
  button.applyBtn {
    border: none;
    cursor: pointer;
    min-width: 100px;
    padding: 5px 10px;
    text-shadow: none;
    background-image: none;
    margin: 0 6px !important;
    color: rgb(255, 255, 255);
    border-radius: 30px !important;
    font-family: "Poppins_Semi_Bold";
    background-color: rgb(41, 98, 255);
    font-size: 14px;
    box-shadow: 0 0 0 0 rgb(34 36 38 / 15%) inset;
    text-align: center;
    display: block;
    margin: 15px 15px 15px auto !important;
  }
`;

const DatePickerOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: ${(props) => (props.datePickerPopupState ? "block" : "none")};
`;

export {
  UserProfileWrapper,
  TitleEl,
  UserInputCont,
  InputSectionCont,
  ProductRecommendationWrapper,
  PdtRecommendationTabs,
  PdtRecommendationTabsWrapper,
  UserInfoWrapper,
  LoadingPersonalisedResults,
  RecosLoader,
  SpiderBlockContainer,
  WordCloudWrapper,
  WordCloudContainer,
  DropDownContainer,
  UserDataAffinityContainer,
  SparkLineContainer,
  OverallContainer,
  AffinityButton,
  SessionContainer,
  Divider,
  ResultsFor,
  DatePickerPopUp,
  DateFilterButton,
  DataMissingWrapper,
  DatePickerPopUpHeader,
  DatePickerOverlay,
  InputForm,
};
