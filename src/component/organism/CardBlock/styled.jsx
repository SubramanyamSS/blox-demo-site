import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { Divider } from "../../../page/UserProfile/styled";

const DataInfoBlock = styled.div`
  visibility: hidden;
  width: 250px;
  max-height: 180px;
  background-color: #555;
  color: #fff;
  text-align: left;
  padding: 5px;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  overflow: auto;
  opacity: 0;
  transition: opacity 0.3s;
  font-family: "SourceSansPro-Regular";
  font-size: 12px;
  .modal {
    top: 0;
  }
`;

const RecommendationBtn = styled.div`
  font-family: "Poppins_Regular";
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 1.05px;
  text-transform: uppercase;
  /*background-color: #2862FF;*/
  /*color: #fff;*/
  display: inline-block !important;
  cursor: pointer;
  margin-top: 10px;
  padding: 0px !important;
  color: #ffffff;
`;

const RedirectLinkMask = styled(Link)`
  display: flex;
  margin-top: 15px;
  position: absolute;
  top: 0px;
  z-index: 99;
  cursor: pointer;
  display: ${(props) => (props.isDisplayIcons == true ? "flex" : "none")};
  ${(props) => css`
    height: ${props.isFromCarouselWithTabs ? "70%" : props?.type == 'pdp' ? "auto" : "70%"};
    width: ${props.isFromCarouselWithTabs
      ? "83%"
      : `${props?.isVertical ? "70%" : "96%"}`};
    right: ${props?.isVertical ? "1rem" : ""};
    cursor: ${props?.type ? "default" : "pointer"};
  `}
`;

const DataImageBlock = styled.div`
  width: 100%;
  height: 200px;
  background: #fff;
  position: relative;
`;

const ImageContainer = styled.div`
  z-index: 99;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: #fff;
  &:hover {
    bottom: 0;
    // cursor: pointer;
    z-index: 1;
  }
  ${(props) => css`
    height: 100%;
    width: ${props?.isVertical ? "100%" : "auto"};

    ${DataItemImg} {
      width: ${props?.isVertical ? "100%" : "auto"};
    }
  `}
`;

const DataItemImg = styled.img`
  height: 100%;
  border-radius: 3px;
  object-fit: contain;
`;

const TitleBlock = styled(Link)`
  ${(props) => css`
    color: ${props?.styleConfig?.color || "#333"};
    font-family: ${props?.styleConfig?.fontFamily || "Poppins_Semi_Bold"};
    font-size: ${props?.styleConfig?.fontSize || "14"}px;
    text-align: ${props?.styleConfig?.textAlign || "center"};
    text-transform: ${props?.styleConfig?.textTransform || "capitalize"};
    line-height: ${props?.styleConfig?.lineHeight || "18"}px;
    font-weight: ${props?.styleConfig?.fontWeight || "600"};
    margin-top: ${props?.styleConfig?.margin_top || "10"}px;
    margin-right: ${props?.styleConfig?.margin_right || "3"}px;
    margin-bottom: ${props?.styleConfig?.margin_bottom || "10"}px;
    margin-left: ${props?.styleConfig?.margin_left || "3"}px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    padding-top: ${props?.styleConfig?.padding_top || "0"}px;
    padding-right: ${props?.styleConfig?.padding_right || "0"}px;
    padding-bottom: ${props?.styleConfig?.padding_bottom || "0"}px;
    padding-left: ${props?.styleConfig?.padding_left || "0"}px;
    -webkit-line-clamp: ${props?.styleConfig?.restrictLines || 2};
    -webkit-box-orient: vertical;
    min-height: ${props?.styleConfig?.minHeight || "35"}px;
    &:hover {
      color: ${props?.styleConfig?.styleOnHover?.color || "#333"} !important;
      text-decoration: ${props?.styleConfig?.styleOnHover?.textDecoration ||
    "underline"};
    }
  `}
`;

const DataItemBlock = styled.div`
  padding: 1em;
  box-sizing: border-box;
  /*border-bottom: 0.7px solid #daddf3;*/
  border-bottom: 0.7px solid #ffffff;
  position: relative;
  text-align: center;
  display: flex;
  }
  ${(props) => css`
    flex-direction: ${props?.isVertical ? "column" : "row"};
    flex-wrap: ${props?.isVertical ? "nowrap" : "wrap"};
    width: 100%;
    height: ${props?.debugMode ? "auto" : "auto"};
    margin: ${props?.isVertical ? "10px 0" : "0"};
    box-shadow: ${props?.boxShadow ||
    (props?.isVertical ? "" : "0 0 0 1px #eee")};
    &:hover {
      ${RecommendationBtn} {
        display: block;
        top: 88%;
      }
      ${DataInfoBlock} {
        visibility: visible;
        opacity: 1;
        top: 10%;
        span {
          padding-bottom: 0.5em;
          display: block;
        }
      }
    }

    ${CardTextWrapper} {
      align-items: ${props?.isVertical ? "center" : "flex-start"};
      justify-content: ${props?.isVertical ? "flex-end" : "flex-start"};
      flex: ${props?.isVertical ? "auto" : "1 1 0"};
      overflow: ${props?.isVertical ? "hidden" : "auto"};

      ${Divider} {
        min-height: 1px;
        width: 100%;
        margin: 10px 0 8px;
      }

      &::-webkit-scrollbar {
        height: 0px;
        width: 4px;
        display: none;
      }

      &::-webkit-scrollbar-track {
        background: #3d77cf1e;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #2862ff;
        border: 3px solid #3d77cf1e;
        border-radius: 1px;
      }
    }

    ${TitleBlock} {
      margin: ${props?.isVertical ? "0" : "0"} !important;
      padding-right: ${props?.isVertical ? "" : "1rem"} !important;
      min-height: 36px !important;
    }

    ${TitleBlock}, ${BrandPriceContainer} {
      text-align: ${props?.isVertical ? "center" : "left"};
    }

    ${BrandPriceContainer} {
      min-height: auto !important;
      line-height: 1rem;
    }

    ${MetaDataWrapper} {
      overflow: auto;
      font-family: "Poppins_Medium";
      font-size: 16px;

      &::-webkit-scrollbar {
        height: 0px;
        width: 4px;
        display: none;
      }

      &::-webkit-scrollbar-track {
        background: #3d77cf1e;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #2862ff;
        border: 3px solid #3d77cf1e;
        border-radius: 1px;
      }
    }

    ${CTAContainer} {
      display: ${props?.isVertical ? "block" : "flex"};
      flex-direction: ${props?.isVertical ? "" : "row"};
      align-items: center;
      justify-content: ${props?.isVertical ? "space-between" : "flex-start"};
      width: ${props?.isVertical ? "" : "100%"};
      margin-top: ${props?.isVertical ? "" : "11.9px"};
      flex-wrap: wrap;

      ${SimilarBtn}, ${StlyeItBtn} {
        width: ${props?.isVertical ? "100%" : "auto"};
        height: ${props?.isVertical ? "" : "36px"};
        flex: ${props?.isVertical ? "" : "1 1 0"};
      }

      ${SimilarBtn} {
        margin: ${props?.isVertical ? "0 auto 6px" : "0 1rem 0 0"};
        display: ${props?.isVertical ? "" : "flex"};
        align-items: center;
        justify-content: center;
        padding-left: ${props?.isVertical ? "" : "1rem"};
        padding-right: ${props?.isVertical ? "" : "1rem"};
      }

      ${StlyeItBtn} {
        padding-left: ${props?.isVertical ? "" : "0.5rem"};
        padding-right: ${props?.isVertical ? "" : "0.5rem"};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  `}
`;

const CarouselItemWrapper = styled.div`
  // position: relative;
  // width: 100%;
  /*border: 1px solid lightgray;*/
  border: 1px solid white;
  ${(props) => css`
    height: ${props.styleConfig?.height ||
    (props.isVertical ? "320" : "175")}px;
    width: ${props.styleConfig?.width || (props.isVertical ? "100%" : "auto")};
    margin: ${props.isVertical ? "auto auto 0.75rem" : "auto"};
  `}
`;

const CardTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 15px;

  ${(props) => css`
    max-height: ${props.maxHeight || (props.isVertical ? "" : "175")}px;
  `}
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
  cursor: pointer;
  background-color: #1578c2;
  &:hover {
    color: #fff;
  }
`;

const ProductDetailsWrapper = styled.div`
  color: #191e50;
  font-family: "Poppins_Regular";
  line-height: 16px;
  font-size: 14px;
  text-align: center;
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
  max-height: 100%;
  margin-bottom: 1rem;

  ${BrandPriceContainer} {
    line-height: 17px;
    min-height: auto;
    text-align: left;
  }
`;

const BrandWrapper = styled.div`
  width: 60%;
  color: #191e50;
  font-size: 14px;
  line-height: 20px;
  text-align: right;
  padding-right: 6px;
  display: inline-block;
  vertical-align: middle;
  border-right: 1px solid #707070;
  font-family: "Poppins_Regular";
`;

const PriceWrapper = styled.div`
  width: 30%;
  color: #191e50;
  font-size: 14px;
  text-align: left;
  line-height: 16px;
  padding-left: 6px;
  display: inline-block;
  vertical-align: middle;
  font-family: "Poppins_Regular";
`;

const CTAContainer = styled.div`
  display: block;
  margin: 0;
  justify-content: space-between;
  margin: 5px 0 0 0;
  &:hover {
    ${RedirectLinkMask} {
      display: none !important;
    }
  }
`;

const CTAWrapper = styled.div`
  width: 70%;
  margin: 0;
  padding: 12px 0;
  background: #2862ff;
  border-radius: 30px;
  display: inline-block;
`;

const SimilarBtn = styled.div`
  width: 70%;
  margin: 0;
  cursor: pointer;
  padding: 12px 0;
  display: inline-block;
  border-radius: 30px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${(props) => css`
    background: ${props?.backgroundColor || "#2862FF"};
    font-size: ${props?.fontSize || "11.5"}px;
    text-transform: ${props?.textTransform || ""};
    color: ${props?.color || "#fff"};
    -webkit-line-clamp: ${props?.restrictLines || ""};
  `}
`;

const StlyeItBtn = styled.div`
  ${(props) => css`
    width: 70%;
    cursor: pointer;
    padding: 8px 0 6px 0;
    border-radius: 30px;
    display: inline-block;
    box-shadow: 2px 2px 5px #00000029;
    background: ${props?.backgroundColor || "#fff"} 0% 0% no-repeat padding-box;

    div {
      color: ${props?.color || "#333"};
      background: ${props?.backgroundColor || "#fff"};

      div {
        display: flex;
        align-items: center;

        img {
          width: 18px;
          height: 18px;
          margin: 0 3px;
        }

        span {
          padding: 0 10px;
          line-height: 20px;
          letter-spacing: 0.75px !important;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-size: ${props?.fontSize || "11.5"}px;
          text-transform: ${props?.textTransform || "uppercase"};
        }
      }
    }
  `}
`;

const IconWrapper = styled.div`
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
  z-index: 99;
  position: absolute;
`;

const FeedbackIconWrapper = styled.div`
  bottom: 0px;
  right: 0;
  padding: 10px;
  z-index: 99;
  position: absolute;
  display: flex;
  bottom: ${(props) => (props.isVertical ? "0px" : "-35px")};
`;

const PopupContent = styled.ul`
  list-style: none;
  width: 100%;
  font-family: "Poppins_Regular";
  max-height: 50vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  li {
    margin-bottom: 10px;
    font-size: 16px;
    input {
      margin-right: 5px;
      vertical-align: middle;
      cursor: pointer;
    }
    label {
      vertical-align: middle;
      cursor: pointer;
    }
  }
`;

const PopupButton = styled.button`
  width: 100%;
  // margin: 25px auto 0px;
  cursor: pointer;
  padding: 12px 0px;
  border-radius: 30px;
  overflow: hidden;
  font-family: "Poppins_Regular";
  background: ${(props) =>
    props.loaderState ? "transparent" : "rgb(40, 98, 255)"};
  font-size: 11.5px;
  color: rgb(255, 255, 255);
  border: none;
  outline: none;
  text-align: center;
  font-size: 16px;
  display: block;
  height: 50px;
  &:disabled {
    background: rgba(40, 98, 255, 0.5);
    cursor: not-allowed;
  }
  img {
    width: 26px;
  }
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
  DataInfoBlock,
  RecommendationBtn,
  DataItemImg,
  DataImageBlock,
  DataItemBlock,
  CarouselItemWrapper,
  TitleBlock,
  ImageContainer,
  RedirectLinkMask,
  RedirectLink,
  ProductDetailsWrapper,
  CTAContainer,
  CTAWrapper,
  IconWrapper,
  SimilarBtn,
  StlyeItBtn,
  BrandWrapper,
  PriceWrapper,
  BrandPriceContainer,
  CardTextWrapper,
  MetaDataWrapper,
  FeedbackIconWrapper,
  PopupContent,
  PopupButton,
  AlertEl,
};
