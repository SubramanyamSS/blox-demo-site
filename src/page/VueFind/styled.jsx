import styled, { css } from "styled-components";
import { ListWrapper, InputEl, SelectEl } from "../../component";
import { Link } from "react-router-dom";
import { UserProfileWrapper, UserInfoWrapper } from "../UserProfile/styled";

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

const VueFindWrapper = styled.div`
  .ui.menu .ui.dropdown.item .menu .item:not(.filtered) {
    display: flex;
    justify-content: space-between;
    background: white !important;
    color: gray !important;
    border-radius: initial;
    &:hover {
      background-color: white !important;
      color: black !important;
    }
  }
  .ui.menu:not(.vertical) .item {
    background-color: white;
    color: gray;
    height: 30px;
    font-size: 14px;
  }
  .ui.link.menu .item:hover,
  .ui.menu .dropdown.item:hover,
  .ui.menu .link.item:hover,
  .ui.menu a.item:hover {
    background-color: white;
    color: black;
  }
  .ui.dropdown .menu {
    border: none;
  }
  .ui.menu {
    padding: 1em;
    border: none;
    box-shadow: none;
    padding-bottom: 4px;
  }
  .ui.compact.menu {
    margin: auto;
  }
  ${(props) =>
    props.is_from_discover_page
      ? css`
          margin-top: 5px;
          margin-left: 0rem;
          position: relative;
          width: 85%;
          margin: auto;
          position: relative;
          top: -35px;
          border-bottom: 1px solid #eee;
        `
      : css`
          margin-top: 30px;
          padding-top: 20px;
          background: #ffffff;
        `}
`;

const MainContainer = styled.div`
  display: flex;
  padding-top: 100px;
  background: #ffffff;
`;

const RedirectLinkMask = styled.div`
  display: none;
  position: absolute;
  top: 0px;
  z-index: 999;
  cursor: pointer;
  height: 170px;
  width: 100%;
  background: #191e50de;
  overflow: hidden;
`;

const CategoryWrapper = styled.div`
  background-color: #fff;
  width: 90%;
  margin: auto;
  // box-shadow: 0px 0px 21px -9px #000;
  display: flex;
  align-items: center;
`;

const OntologyCont = styled.div`
  font-family: "SourceSansPro-Regular";
  color: #064559;
  font-size: 14px;
  line-height: 14px;
  margin: 1em;
`;

const PdtContainer = styled.div`
  width: 80%;
  .rc-pagination {
    width: max-content;
    margin: auto;
    padding-bottom: 50px;
  }
  ${ListWrapper} {
    ${(props) =>
      props.renderProduct
        ? css`
            border-left: 1px solid #d7d7d7;
            padding: 10px;
          `
        : null}
  }
`;

const FilterContainer = styled.div`
  width: 22%;
  padding: 10px 10px;

  ${UserProfileWrapper} {
    margin-top: 0;
    padding: 0px;

    form {
      padding: 0.25rem;
      height: 30px;
      width: 100%;
      align-items: center;
    }

    input {
      padding: 0.5rem;
      margin: 1px;
      &[type="text"] {
        width: calc(100% - 60px);
        font-size: 12px;

        &::-webkit-input-placeholder {
          font-size: 9px;
          letter-spacing: 0px;

          @media only screen and (min-width: 1441px) {
            font-size: 12px;
          }
        }
      }
      &[type="submit"] {
        padding: 0.2rem;
        width: 60px;
        margin: 0;
        font-size: 12px;
      }
  }

  ${UserInfoWrapper} {
    width: 100%;
    margin: 0 auto;

    td {
      padding: 0.3rem;
      font-size: 10px;

      &:first-child {
        padding-right: 0;
      }

      &:nth-child(2) {
        word-break: break-all;
        width: auto;
        flex: 1 1 0;
      }

      &:last-child {
        padding-left: 0;
        width: 20%;
      }

      button {
        font-size: 15px;
      }
    }
  }
`;

const ProductDetailsWrapper = styled.div`
  color: #191e50;
  line-height: 16px;
  font-family: "SourceSansPro-Regular";
  font-size: 13px;
  text-align: center;
`;

const RenderSubFilterCont = styled.div`
  padding-left: 20px;
`;

const CustomFilterCont = styled.div`
  text-align: center;
  font-family: "SourceSansPro-Regular";
  position: relative;
  ${InputEl},
  ${SelectEl} {
    margin-bottom: 2em;
    color: #4a4a4a;
    font-size: 14px;
    width: 95%;
    padding: 0px 10px;
    height: 40px;
    /*border: 1px solid #4a4a4a;*/
    background-color: #ffffff;
    font-family: "Poppins_Medium";
    border: 1px solid #6c6c6c;
    border-top: none;
    border-left: none;
    border-right: none;
    outline: none;
    cursor: pointer;
  }
`;

const SelectArrow = styled.img`
  position: absolute;
  right: 20px;
  top: 15px;
  height: 12px;
  width: 12px;
  cursor: pointer;
`;

const FilterCategoryCont = styled.div`
  padding: 15px 5px;
`;

const FilterCategoryTitle = styled.div`
  font-size: 14px;
  font-family: "Poppins_Semi_Bold";
  font-weight: bold;
  color: #333333;
  text-transform: capitalize;
  text-transform: uppercase;
  letter-spacing: 1.2px;
`;

const ClearBtnCont = styled.div`
  color: #7f7f7f;
  font-size: 10px;
  text-decoration: underline;
  cursor: pointer;
  line-height: 14px;
`;

const FilterCategoryTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FilterCategoryEl = styled.div`
  padding: 5px 0;
  display: flex;
  align-items: center;
  font-size: 13px;
  font-family: "Open_Sans_Regular";
  font-weight: normal;
  color: #333333;
  line-height: 24px;

  ${InputEl} {
    width: 14px;
    border: 1px solid #7f7f7f;
    height: 14px;
    border-radius: 2px;
    -webkit-appearance: none;
    margin-right: 10px;
    outline: none;

    &:checked {
      background-color: #2862ff;
      border: 1px solid #2862ff;
      color: #fff;

      &:after {
        content: "";
        border: 1px solid;
        width: 16px;
        height: 16px;
        margin-left: -3px;
        margin-top: -3px;
        display: block;
        box-sizing: border-box;
      }
    }
  }
`;

const FilterCategoryListWrapper = styled.div`
  max-height: 250px;
  overflow: auto;
  margin-top: 10px;

  // &::-webkit-scrollbar-track {
  //   background: #3d77cf1e;
  //   padding: 4px;
  // }

  // &::-webkit-scrollbar-thumb {
  //   background-color: #2862FF ;
  //   border: 3px solid #3d77cf1e;
  // }

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #e9f0f9;
    border-radius: 20px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #2862ff;
    border-radius: 20px;
    border: 3px solid #e9f0f9;

    &:hover {
      background-color: #2862ff;
    }
  }
`;

const CardWrapper = styled.div`
  width: 190px;
  height: 260px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  margin-left: 20px
  &:hover {
    ${RedirectLinkMask} {
      display: flex;
    }
  }
`;

const RedirectionWrapper = styled(Link)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) =>
    props.isFromImageContainer
      ? css`
          background: #fff;
        `
      : null}
`;

const PdtImg = styled.img`
  max-width: 100%;
  height: 170px;
  padding: 10px;
  object-fit: contain;
  width: auto;
`;

const RedirectLink = styled(Link)`
  margin-bottom: 1em;
  font-weight: bold;
  letter-spacing: 0.5px;
  font-family: "SourceSansPro-Regular";
  width: auto;
  font-size: 90%;
  color: #ffffff;
  text-transform: uppercase;
  border-radius: 2px;
  cursor: pointer;
  padding: 5px 15px;
  background-color: #1578c2;
  &:hover {
    color: #fff;
  }
`;

const PdtInfoBlock = styled.div`
  margin: 5px 0px;
  display: flex;
  color: #191e50;
  line-height: 18px;
  font-size: 14px;
  font-weight: 600;
  font-family: "SourceSansPro-Regular";
  padding: 2px 0;
  text-transform: capitalize;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  padding: 0em 1.2em;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const TextSearchWrapper = styled.form`
  padding: 1em;
  width: 100%;
  display: flex;
  padding-bottom: 4px;
  justify-content: flex-start;
  ${(props) =>
    props.is_from_discover_page
      ? css`
          margin-left: 10rem;
        `
      : null}
  ${InputEl} {
    &[type="submit"] {
      color: gray;
      background-color: #fff;
      margin: 10px;
      display: none;
      border: solid 1px lightgray;
      border-radius: 4px;
      padding: 0.5em 1em;
      cursor: pointer;
    }
  }
`;

const SearchInputCont = styled.div`
  width: 70%;
  height: 40px;
  margin: 0px 10px;

  ${InputEl} {
    width: 100%;
    color: #333;
    height: 100%;
    outline: none;
    font-size: 16px;
    font-weight: 600;
    padding: 5px 20px;
    border-radius: 30px;
    letter-spacing: 0.7px;
    border: 1px solid #2862ff;
  }

  i {
    position: relative;
    top: -29px;
    left: 92%;
    cursor: pointer;
    color: #2862ff;
  }
`;

const SearchLabelTxt = styled.label`
  margin-right: 10px;
  color: #064559;
  font-family: "SourceSansPro-Regular";
  font-size: 14px;
  line-height: 30px;
`;

const RecommendationBtn = styled.div`
  font-family: "SourceSansPro-Regular";
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  background-color: #1578c1;
  color: #fff;
  display: inline-block !important;
  cursor: pointer;
  margin-top: 10px;
  padding: 3px 8px !important;
`;

const RelevanceFilter = styled.div`
  padding: 4px 25px;

  .checkbox {
    padding-right: 10px;
  }
`;

const RangeContainer = styled.div`
  padding: 0 10px 0 0;
  display: table-cell;
`;

const SliderContainer = styled.div`
  margin: 5px 0 20px 0;
  font-family: "Poppins_Semi_Bold";
`;

const CheckBoxContainer = styled.div`
  margin: 5px 0px 20px 0;
`;

const DebugInfoWrapper = styled.p`
  color: #fff;
  font-size: 15px;
  font-family: "SourceSansPro-SemiBold";
  margin: 0 !important;
  line-height: 25px;
`;
const UserDataAffinityContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-bottom: 5rem;
  margin-top: 2rem;
  padding: 2rem 0;
  border: 0.5px lightgrey solid;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SparkLineContainer = styled.div`
  display: inline-block;
  padding-left: 20px;
`;

const DropDownContainer = styled.div`
  width: 300px;
  margin: auto;
  margin-top: 2rem;
`;

const WordCloudContainer = styled.div`
  display: inline-block;
  width: calc(50% - 30px);
  background-color: ${(props) =>
    props.type === "negative"
      ? "rgba(230,124,103,0.5)"
      : props.type === "positive"
      ? "rgba(155,245,132,0.5)"
      : "rgba(155,245,132,0.5)"};
  padding: 15px;
  border-radius: 20px;
  margin: 0 auto;
`;

const GraphHeading = styled.p`
  text-align: left;
  font-size: 15px;
  font-weight: 600;
  font-family: "Poppins_Semi_Bold" !important;
  color: #191e50;
  // border-bottom: 1px #191e5038 solid;
  // margin: 0 40px;
  padding: 0 0 15px 0;
`;

const CLPMenuWrapper = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  align-items: flex-start;
  position: fixed;
  z-index: 100;
  &::after {
    content: "";
    position: absolute;
    height: 53px;
    width: 100%;
    border-bottom: 1px solid #eee;
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: -1;
  }
`;

const CLPMenuOverflowWrapper = styled.div`
  overflow: auto hidden;
  width: 100vw;
  text-align: center;
  height: ${(props) => (props.categoryDropdownState ? "100vh" : "53px")};
  &::-webkit-scrollbar {
    display: none;
  }
  & > .menu .item:not(:first-child) {
    & > .menu {
      left: -70%;
    }
  }
`;

const SearchIconWrapper = styled.div`
  color: #333;
  z-index: 999;
  float: right;
  font-size: 18px;
  cursor: pointer;
  background-color: #3d77cf1e;
  font-family: "Poppins_Medium";
  display: flex;
  align-items: center;
  padding-left: 10px;
  width: 145px;
  height: 53px;
`;

const SuggestionWrapper = styled.div`
  width: 65%;
  margin: auto;
  padding: 4px;
  max-height: 400px;
  overflow-y: auto;
  border-radius: 4px;
  background-color: white;
  border: 1px solid #eee;
  margin-left: 25%;
`;

const ResultsFor = styled.div`
  padding: 4px 25px;
  font-family: "Poppins_Regular";

  span {
    font-size: 18px;
    font-family: "Poppins_Semi_Bold";
  }

  i {
    left: 10px;
    font-size: 14px;
    cursor: pointer;
    position: relative;
  }
`;

const ClearSearch = styled.button`
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
  box-shadow: 0 0 0 0 rgba(34, 36, 38, 0.15) inset;
`;

export {
  VueFindWrapper,
  TitleEl,
  CategoryWrapper,
  MainContainer,
  PdtContainer,
  FilterContainer,
  RenderSubFilterCont,
  CardWrapper,
  PdtInfoBlock,
  RedirectLink,
  RedirectLinkMask,
  CustomFilterCont,
  FilterCategoryCont,
  FilterCategoryEl,
  FilterCategoryTitle,
  ClearBtnCont,
  FilterCategoryTitleWrapper,
  FilterCategoryListWrapper,
  OntologyCont,
  PdtImg,
  TextSearchWrapper,
  SearchInputCont,
  SearchLabelTxt,
  RecommendationBtn,
  RedirectionWrapper,
  ProductDetailsWrapper,
  RelevanceFilter,
  RangeContainer,
  SliderContainer,
  CheckBoxContainer,
  DropDownContainer,
  UserDataAffinityContainer,
  WordCloudContainer,
  SparkLineContainer,
  DebugInfoWrapper,
  GraphHeading,
  SelectArrow,
  CLPMenuWrapper,
  SearchIconWrapper,
  SuggestionWrapper,
  ResultsFor,
  ClearSearch,
  CLPMenuOverflowWrapper,
};
