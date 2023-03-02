import styled, { css } from "styled-components";
import { InputEl } from "../../component";
import UploadIcon from "../../static/svg/upload.svg";
import { RedirectLinkMask } from "../../component/organism/CardBlock/styled";

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

const VueLogoEl = styled.img`
  width: 10%;
  margin-right: 1em;
  vertical-align: middle;
`;

const ImageSearchWrapper = styled.div`
  width: 105%;
  margin: auto;
`;

const DottedLine = styled.div`
  border: 1px #9da1c2 dashed;
  height: 1px;
  width: 100%;
  margin: 10px 0;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
`;

const UserInputWrapper = styled.div`
  display: flex;
  width: 40%;
  padding: 1em 0em;
  padding-bottom: 40px;
  margin: auto;
  ${InputEl} {
    padding: 0.75em 0.75em;
    margin: 1px;
    margin-bottom: 25px;
    width: calc(100% - (1px * 2));
    height: calc(100% - (1px * 2));
    font-size: 14px;
    color: #064559;
    border: 0;
    border-radius: 0.15em;
    outline: none;
    &[type="text"] {
      width: 95%;
      border: 1px solid #b9b9b9;
      height: auto;
    }
    &[type="submit"] {
      width: 100%;
      background-color: #ff7054;
      color: #fff;
      cursor: pointer;
    }
  }
`;

const ImageUploadIcon = styled.div`
  mask-image: url(${UploadIcon});
  mask-repeat: no-repeat;
  mask-position: center;
  background-color: lightslategray;
  width: 6.25%;
  margin: 0.6em 1em;
  cursor: pointer;
`;

const SearchResultWrapper = styled.div`
  display: flex;
  // width: 80%;
  // margin: auto;
  padding-bottom: 40px;
  // padding-top: 50px;
  flex-direction: column;
  align-items: center;
  position: fixed;
  /* top: 0; */
  /* left: 0; */
  /* right: 0; */
  z-index: 1;
  width: 25%;
  padding-right: 10px;
  &:hover {
    ${RedirectLinkMask} {
      display: flex;
    }
  }
`;

const UploadedImgWrapper = styled.div`
  width: 90%;
  // padding-right: 10px;
  height: 300px;
  background: #fff;
  margin-top: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer !important;
  }
`;

const UploadedProductImage = styled.img`
  max-width: 100%;
  max-height: 320px;
  // dispay: grid;
  // margin: auto 0;
  // height: 400px;
  // ${(props) => css`
  //   margin-top: ${props.is_from_pdp_page ? "2rem" : null};
  // `}
`;

const PdtRecommendationTabsWrapper = styled.div`
  display: flex;
  margin-bottom: 5px;
  margin: 0px 60px;
`;

const PdtRecommendationTabs = styled.div`
  color: #064559;
  font-size: 16px;
  font-family: "SourceSansPro-SemiBold";
  font-weigth: bold;
  line-height: 120%;
  margin-right: 15px;
  cursor: pointer;
  ${(props) =>
    props.isActive
      ? css`
          border-bottom: 1.5px solid #064559;
        `
      : null}
`;

const TagWrapper = styled.table`
  margin: 0px 10px;
`;

const HeaderContent = styled.th`
  padding: 0 15px;
  font-size: 1.25em;
  text-align: left;
  color: #fff;
  background-color: #064559;
  font-family: "SourceSansPro-Regular";
`;

const SearchTagsWrapper = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  margin-top: 10px;

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }
  ${(props) => css`
    height: ${props.is_from_pdp_page ? "auto" : null};
    overflow-y: ${props.is_from_pdp_page ? "auto" : null};
  `}
`;

const RowElement = styled.tr`
  background-color: #fff;
  height: 2em;
  td {
    color: #7a7a7a;
    font-family: "SourceSansPro-Regular";
    font-size: 17.5px;
    padding: 5px 15px;
  }
`;

const ColorSwatch = styled.span`
  width: 15px;
  height: 15px;
  display: inline-block;
  ${(props) => css`
    background-color: ${props.color};
    border: 1px solid ${props.color};
  `}
  vertical-align: text-bottom;
  margin-left: 10px;
`;

const SliderCont = styled.div`
  // width: 80%;
  padding: 100px 0px;
  // margin: auto;
`;

const ImgWrapper = styled.div`
  height: 150px;
  width: auto;
  ${(props) => css`
    pointer-events: ${props.disabled ? "none" : "default"};
  `}
`;

const ImgEl = styled.img`
  max-width: 100%;
  max-height: 100%;
  cursor: pointer;
`;

const DebugWrapper = styled.form`
  width: 60%;
  margin: auto;
  text-align: center;
  ${InputEl} {
    padding: 0.75em 0.75em;
    margin: 10px;
    width: calc(100% - (1px * 2));
    height: calc(100% - (1px * 2));
    font-size: 14px;
    color: #064559;
    border-radius: 0.15em;
    outline: none;
    border: 1px solid #b9b9b9;
    &[type="text"] {
      width: 37.5%;
      height: auto;
    }
    &[type="submit"] {
      width: 12.5%;
      border: 0px;
      background-color: #ff7054;
      color: #fff;
      cursor: pointer;
    }
  }
`;

const MultiImageTextArea = styled.textarea``;

const MultiImageForm = styled.form`
  width: 60%;
  padding-top: 120px;
  margin: auto;
  text-align: center;
  ${MultiImageTextArea},
  ${InputEl} {
    padding: 0.75em 0.75em;
    margin: 10px;
    width: calc(100% - (1px * 2));
    height: calc(100% - (1px * 2));
    font-size: 14px;
    color: #064559;
    border-radius: 0.15em;
    outline: none;
    border: 1px solid #b9b9b9;
    &[type="text"] {
      width: 37.5%;
      height: auto;
    }
    &[type="submit"] {
      width: 12.5%;
      border: 0px;
      background-color: #ff7054;
      color: #fff;
      cursor: pointer;
    }
  }
`;

const VueTagHyphenBanner = styled.div`
    width : 100%
    height : 100px;
    background-color: #e04528;
    padding: 50px;
    margin-bottom : -70px;
`;

const VueTagHyphenHeader = styled.h1`
    color : #fff
    margin-top : 1%;
`;

const VueTagHyphenContent = styled.h3`
    color : #fff
    margin-top : 1%;
`;
const VueTagHyphenMadStreetDenContent = styled.h4`
    color : ${(props) => (props.isHyphen ? "black" : "#fff")}
    margin-top : 1%;
`;

const GuidelinesContent = styled.h4`
    color : gray
    padding-left: 26rem;
`;

const ProductTitleWrapper = styled.div`
  color: #191e50;
  font-size: 18px;
  font-family: "SourceSansPro-Regular";
  font-weight: bold;
  line-height: 34px;
`;

const PropertiesWrapper = styled.span`
  color: #191e50;
  font-size: 16px;
  font-family: "SourceSansPro-Regular";
  line-height: 28px;
`;

const DescriptionWrapper = styled.span`
  color: #191e50;
  font-size: 16px;
  font-family: "SourceSansPro-Regular";
  line-height: 24px;
`;

const TruncateText = styled.span`
  display: -webkit-box;
  max-width: 600px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PdTitleWrapper = styled.div`
  color: #191e50;
  font-family: "Poppins_Semi_Bold";
  font-size: 14px;
  text-align: center;
  text-transform: capitalize;
  line-height: 18px;
  font-weight: 600;
  margin: 5px 3px;
  pointer-events: none !important;
  cursor: none !important;
  ${"" /* overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box; */}
  padding: 0em 1.2em;
  ${"" /* -webkit-line-clamp: 2;
    -webkit-box-orient: vertical; */}
  min-height: 40px;

  ${"" /* color: #191e50;
  font-size: 16px;
  font-family: "SourceSansPro-Regular";
  line-height: 22px;
  font-weight: bold; */}
`;
const PdDescWrapper = styled.div`
width: 100%;
    padding: 2px;
    margin: auto;
    color: #191e50;
    display: block;
    font-size: 13px;
    min-height: 40px;
    text-align: center;
    font-family: "Open_Sans_Regular";
}
`;

const FeedbackForm = styled.form`
  text-align: center;
  .form-field {
    margin-bottom: 10px;
  }
  label {
    width: calc(50% - 10px);
    margin-right: 10px;
    display: inline-block;
    font-weight: 500;
  }
  input {
    border-radius: 10px;
    width: 50%;
    padding: 5px;
    border: solid 1px #ccc;
  }
  button {
    font-size: 11.5px;
    text-transform: uppercase;
    background-color: #2862FF;
    color: #fff;
    padding: 10px 20px;
    border-radius: 30px;
    border: none;
    outline: none;
    margin-top: 10px;
    cursor: pointer;
  }
`;

export {
  TitleWrapper,
  VueLogoEl,
  ImageSearchWrapper,
  FormWrapper,
  SliderCont,
  ImageUploadIcon,
  UserInputWrapper,
  SearchResultWrapper,
  UploadedImgWrapper,
  UploadedProductImage,
  PdtRecommendationTabs,
  PdtRecommendationTabsWrapper,
  TagWrapper,
  SearchTagsWrapper,
  HeaderContent,
  RowElement,
  ColorSwatch,
  ImgWrapper,
  ImgEl,
  DebugWrapper,
  MultiImageForm,
  MultiImageTextArea,
  VueTagHyphenBanner,
  VueTagHyphenHeader,
  VueTagHyphenContent,
  VueTagHyphenMadStreetDenContent,
  GuidelinesContent,
  ProductTitleWrapper,
  PropertiesWrapper,
  DescriptionWrapper,
  PdTitleWrapper,
  PdDescWrapper,
  TruncateText,
  DottedLine,
  FeedbackForm,
};
