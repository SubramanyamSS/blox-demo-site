import styled, { css } from "styled-components";
import { DataItemBlock, CarouselItemWrapper } from "../../component";
import { UserProfileWrapper, UserInfoWrapper } from "../UserProfile/styled";
import { SearchResultWrapper } from "../VueTag/styled";

const TitleWrapper = styled.div`
  height: 3.5em;
  line-height: 3.5em;
  border-bottom: 1px solid #e2e2e2;
  position: fixed;
  top: 50px;
  min-width: 1240px;
  width: 100%;
  z-index: 1;
  background-color: #fff;
  text-align: center;
`;

const VueLogoImg = styled.img`
  width: 12.5%;
  margin-right: 1em;
  vertical-align: middle;
`;

const ProductDetailsWrapper = styled.div`
  // width: 85%;
  margin: 3%;
  margin-top: 50px;
  display: flex;
`;

const LeftContainer = styled.div`
  width: 32%;
  height: 100%;
`;

const SpiderContainer = styled.div`
  background-color: #e4e7ff;
  border-radius: 20px;
  display: flex;
  // align-items: top;
  justify-content: flex-start;
  padding: 15px;
  flex-direction: column;
  h4 {
    font-family: "Poppins_Semi_Bold" !important;
  }
`;

const RightContainer = styled.div`
  width: 60%;
`;

const FilterIconContainer = styled.div`
  margin-left: auto;
`;

const FullContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  //height: 3rem;

  @media only screen and (max-width: 1440px) {
    ${SearchResultWrapper} {
      top: 12.5% !important;
      padding-bottom: 0;
    }
  }

  ${UserProfileWrapper} {
    width: 86%;
    margin: 0 auto;
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
        font-size: 10px;

        &::-webkit-input-placeholder {
          font-size: 9px;
          letter-spacing: 0px;

          @media only screen and (min-width: 1441px) {
            font-size: 9px;
          }
        }
      }
      &[type="submit"] {
        padding: 0.2rem;
        width: 60px;
        margin: 0;
        font-size: 9px;
      }
    }

    ${UserInfoWrapper} {
      width: 100%;
      margin: 0 auto;

      td {
        padding: 0.5rem;
        font-size: 10px;

        &:first-child {
          padding-right: 0;
        }

        &:nth-child(2) {
          word-break: break-all;
          width: 60%;
          flex: 1 1 0;
        }

        &:last-child {
          padding-left: 0;
        }

        button {
          font-size: 15px;
        }
      }
    }
  }
`;

const ProductImageCont = styled.div`
  height: 100%;
`;

const PdtTopWrapper = styled.div`
  display: flex;
  width: 25%;
  // height: 600px;
  padding: 2em;
  ${DataItemBlock} {
    height: 300px;
  }
  .slick-next {
    right: -3px;
  }
  .slick-prev {
    left: 8px;
    z-index: 1;
  }
`;

const ProductImageEl = styled.img`
  height: 100%;
`;
const CheckBoxWrapper = styled.div`
  margin-top: 130px;
  margin-bottom: 40px;
  z-index: 2000;
  width: 25%;
`;

const CheckBoxWrapperRecos = styled.div`
  margin-left: 3rem;
  font-size: 18px;
  color: #181d50;
  font-family: "SourceSansPro-Regular";
`;
const OccassionSelectBoxWrapper = styled.span`
  display: inline;
`;

const WordCloudWrapper = styled.div`
  float: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${(props) =>
    props.type === "negative"
      ? "rgba(230,124,103,0.5)"
      : props.type === "positive"
        ? "rgba(155,245,132,0.5)"
        : "rgba(155,245,132,0.5)"};
  border-radius: 20px;
  padding: 15px;
  h4 {
    font-family: "Poppins_Semi_Bold" !important;
  }
`;

const SparkLineWrapper = styled.div`
  width: 16.5%;
  float: left;
  display: flex;
  justify-content: center;
}
`;
const SparkLineContainer = styled.div`
  width: 120px;
  p {
    font-size: 14px;
    font-family: "SourceSansPro-Regular";
  }
`;

const WordCloudContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
  margin-left: 2rem;
  margin-right: 1rem;
  // margin-left: 50%;
  // transform: translate(-50%, -50%);
  .ui.buttons .ui.F3F4FA.button {
    background-color: #f3f4fa;
  }
`;

const ButtonContainer = styled.div`
  display: inline-block;
  margin-left: 5rem;
  margin-bottom: 40px;
`;
const ThemeDropdownWrapper = styled.div`
  font-size: 14px;
  font-family: "SourceSansPro-Regular";
  color: #191e50;
  position: absolute;
  margin-left: 20px;
`;

const AffinityContainer = styled.div`
  border-bottom: 0.5px solid #d9d9d9;
  ${"" /* border-radius: 70px;
  padding: 40px 30px; */}
  width: 100%;
  height: auto;
  // position: absolute;
  right: 0;
  background: #fff;
  marginright: 5%;
  // z-index: 123;
  top: 0%;
  margin-right: 2%;
  margin-top: 30px;
  margin-left: 2%;
  padding-bottom: 15px;
`;

const UserAffinityTitle = styled.div`
  font-family: "Poppins_Semi_Bold" !important;
  font-size: 24px !important;
  margin-bottom: 15px !important;
  margin: 0;
  line-height: 1.2 !important;
  font-weight: 400 !important;
  color: #191e50;
  padding: 15px 20px;
  ${"" /* font-size: 18px;
  color: #191e50;
  font-family: "SourceSansPro-Regular"; */}
`;
const AffinityCloseButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 10px 10px;
`;
const RecosWrapper = styled.div`
  background-color: #fff;
  border-bottom: .5px solid #d9d9d9;
  ${"" /* padding: 40px 30px;
  border-radius: 70px; */}
  //margin-top: 55px;
  ${(props) => css`
    ${CarouselItemWrapper} {
      height: ${props.horizontal ? "160px" : "320px"};
    }
  `}

`;
const ProductImageWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  background: red;
  height: 100px;
  width: 400px;
`;
const ModalWrapper = styled.div`
  width: 100%;
  height: auto;
  padding-bottom: 25px;
  // border-bottom: .5px solid #d9d9d9;
  // padding: 0px 20px;
  // border-radius: 70px;
  // margin-bottom: 40px;
`;
const StyleItWithWrapper = styled.div`
  width: 100%;
  height: auto;
  // position: absolute;
  right: 0;
  background: #fff;
  ${"" /* marginright: 5%; */}
  // z-index: 123;
  top: 0%;
  margin-right: 2%;
  margin-top: 80px;
  margin-left: 2%;
  border-bottom: 0.5px solid #d9d9d9;
`;
const StyleItTitleWrapper = styled.div`
  ${"" /* padding: 15px 20px;
  font-size: 18px;
  color: #191e50;
  font-family: "SourceSansPro-Regular"; */}

  color: #191e50;
  padding: 10px 20px;
  font-family: "Poppins_Semi_Bold" !important;
  font-size: 24px !important;
  margin-bottom: 15px !important;
  margin-top: 67px !important;
  margin: 0;
  line-height: 1.2 !important;
  font-weight: 400 !important;
`;
const StyleItWithButtonWrapper = styled.div`
  display: inline-block;
  position: absolute;
  bottom: 0;
  right: 0;
  margin-bottom: 10px;
  margin-right: 10px;
`;

const RenderBottomContainer = styled.div`
  padding: 1em;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImageContainer = styled.div`
  z-index: 3;
  width: 400px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  // position: relative;
  background: #fff;
  &:hover {
    bottom: 0;
    cursor: pointer;
    z-index: 1;
  }
  ${(props) => css`
    height: ${props.isFromCarouselWithTabs ? "160px" : "100%"};
  `}
`;

const DataItemImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 3px;
  object-fit: contain;
`;

const RedirectLinkMask = styled.div`
  //display: none;
  margin-top: 15px;
  position: absolute;
  top: 0px;
  z-index: 999;
  cursor: pointer;
  ${(props) => css`
    height: ${props.isFromCarouselWithTabs ? "160px" : "200px"};
    width: ${props.isFromCarouselWithTabs ? "83%" : "74%"};
  `}
`;

const ImageDivWrapper = styled.div`
  border: 1px solid white;
  margin: auto;
  height: 400px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px;
`;

const NavigationWrapper = styled.div`
  position: fixed;
  z-index: 10;
  padding-top: 10px;
  top: 50px;
  display: flex;
  width: calc(100% - 88px);
  align-items: baseline;
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
  & > .breadcrumb {
    width: 15%;
  }
  .ui.menu {
    border: none;
    box-shadow: none;
    .item:before {
      display: none;
    }
  }
`;

const BrandPriceContainer = styled.div`
  ${(props) => css`
    width: ${props?.isVertical ? "100%" : "auto"};
    padding-top: ${props?.styleConfig?.padding_top || "2"}px;
    padding-right: ${props?.styleConfig?.padding_right || "2"}px;
    padding-bottom: ${props?.styleConfig?.padding_bottom || "2"}px;
    padding-left: ${props?.styleConfig?.padding_left || "2"}px;
    margin-top: ${props?.styleConfig?.margin_top || "0"}px;
    margin-right: ${props?.styleConfig?.margin_right || "0"}px;
    margin-bottom: ${props?.styleConfig?.margin_bottom || "0"}px;
    margin-left: ${props?.styleConfig?.margin_left || "0"}px;
    color: ${props?.styleConfig?.color || "#333"};
    display: block;
    font-size: ${props?.styleConfig?.fontSize || "16"}px;
    min-height: ${props?.styleConfig?.minHeight || "25"}px;
    text-align: ${props?.styleConfig?.textAlign || "center"};
    font-family: ${props?.styleConfig?.fontFamily || "Poppins_Regular"};
  `}
`;

const MetaDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 1rem;
  padding-bottom: 20px;
  max-height: 120px;
  overflow-y: scroll;
  &:not(:last-child) {
    border-bottom: 0.5px solid #d9d9d9;
  }

  ${BrandPriceContainer} {
    line-height: 17px;
    min-height: auto;
    text-align: left;
  }
`;

const TitleContainer = styled.h4`
  ${(props) => css`
    width: ${props?.isVertical ? "100%" : "auto"};
    padding-top: ${props?.styleConfig?.padding_top || "2"}px;
    padding-right: ${props?.styleConfig?.padding_right || "2"}px;
    padding-bottom: ${props?.styleConfig?.padding_bottom || "2"}px;
    padding-left: ${props?.styleConfig?.padding_left || "2"}px;
    margin-top: ${props?.styleConfig?.margin_top || "0"}px;
    margin-right: ${props?.styleConfig?.margin_right || "0"}px;
    margin-bottom: ${props?.styleConfig?.margin_bottom || "0"}px;
    margin-left: ${props?.styleConfig?.margin_left || "0"}px;
    color: ${props?.styleConfig?.color || "#333"};
    display: block;
    font-size: ${props?.styleConfig?.fontSize || "16"}px;
    min-height: ${props?.styleConfig?.minHeight || "25"}px;
    text-align: ${props?.styleConfig?.textAlign || "center"};
    font-family: ${props?.styleConfig?.fontFamily || "Poppins_Regular"};
  `}
`;
const UserAffinityWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, calc(50% - 16px));
  grid-gap: 16px;
  margin-left: 15px;
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
  z-index: 100000000000;
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
  ProductDetailsWrapper,
  ProductImageEl,
  ProductImageCont,
  LeftContainer,
  RightContainer,
  PdtTopWrapper,
  TitleWrapper,
  VueLogoImg,
  CheckBoxWrapper,
  CheckBoxWrapperRecos,
  OccassionSelectBoxWrapper,
  SparkLineContainer,
  FullContainer,
  SparkLineWrapper,
  SpiderContainer,
  WordCloudContainer,
  ToggleContainer,
  ButtonContainer,
  ThemeDropdownWrapper,
  AffinityContainer,
  UserAffinityTitle,
  AffinityCloseButtonContainer,
  WordCloudWrapper,
  RecosWrapper,
  ProductImageWrapper,
  ModalWrapper,
  StyleItWithWrapper,
  StyleItTitleWrapper,
  StyleItWithButtonWrapper,
  FilterIconContainer,
  RenderBottomContainer,
  ButtonWrap,
  ImageContainer,
  DataItemImg,
  RedirectLinkMask,
  ImageDivWrapper,
  NavigationWrapper,
  BrandPriceContainer,
  MetaDataWrapper,
  TitleContainer,
  UserAffinityWrapper,
  AlertEl,
};
