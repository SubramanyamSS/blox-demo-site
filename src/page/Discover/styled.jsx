import styled from "styled-components";
import {
  ListWrapper,
  DataImageBlock,
  RecommendationBtn,
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
  width: 100%;
  z-index: 1;
  background-color: #fff;
`;

const DiscoverContentBlock = styled.div`
  padding-top: 6rem;
  ${ListWrapper} {
    padding-top: 1em;
    /*background-color: #f3f4fb;*/
    background-color: #ffffff;
    margin-top: 15px;
    width: 85%;
    margin: auto;
  }
  ${DataImageBlock} {
    display: initial;
  }
`;

const ProductRecommendationTitle = styled.div`
  text-transform: capitalize;
  color: #191e50;
  font-size: 1.25em;
  font-family: "Poppins_Medium";
  width: 100%;
  z-index: 1;
  margin-top: 10px;
  padding: 15px 0px;
  padding-left: 1rem;
`;

const ProductRecommendationWrapper = styled.div`
  width: 85%;
  margin: auto;
  /*border-bottom: 1px solid #e2e2e2;*/
  border-bottom: 1px solid #ffffff;
  background-color: #fff;
  ${RecommendationBtn} {
    display: block;
  }
  ${ProductRecommendationTitle} {
    padding-left: 0 !important;
  }
`;

const CLPContainer = styled.div`
  display: inline-block;
  background: #f3f4fb;
  position: fixed;
  left: 35%;
  z-index: 12222;
`;
// const VueFindContainer = styled.div`
//   width: 60%;
//   display: inline-block;
// `;
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;
const LoaderIcon = styled.img`
  width: 45px;
  height: 45px;
`;

const UseCaseContainer = styled.div`
  width: 85%;
  margin: auto;
  display: flex;
`;

const UseCaseWrapper = styled.div`
  width: 25%;
  display: inline-flex;
`;

const UseCase = styled.div`
  display: flex;
  padding: 50px 30px;
  text-align: center;
  text-align-last: center;
  transition: 0.2s ease;
  height: auto;
  border: 0.5px solid #d9d9d9;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  background: #fff;
  color: #333;
  margin-right: 30px;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
    transform-origin: bottom;
    /*border: .5px solid #2962ff;*/
  }

  i {
    font-size: 30px !important;
    margin-bottom: 15px !important;
    display: inline-block !important;
  }

  h3 {
    font-family: "Poppins_Semi_Bold" !important;
    font-size: 18px !important;
    margin-bottom: 15px !important;
    margin: 0;
    line-height: 1.2 !important;
    font-weight: 400 !important;
  }

  p {
    line-height: 26px;
    color: #333 !important;
    font-size: 16px !important;
    margin-bottom: 20px !important;
    font-family: "Open_Sans_Regular";
  }
`;

const RecosWrapper = styled.div`
  background-color: #fff;
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /*padding-top: 2rem;*/
  margin-left: 2rem;
  margin-right: 1rem;
`;

const ThemeDropdownWrapper = styled.div`
  font-size: 14px;
  font-family: "SourceSansPro-Regular";
  color: #333333;
  position: absolute;
  margin-left: 20px;
  text-transform: uppercase;
`;

const VueFindContainer = styled.div`
  display: inline-block;
  width: 50%;
  position: relative;
  top: -103px;
  left: 30%;
`;

const ErrorMsg = styled.p`
  font-size: 24px;
  text-align: center;
  font-family: "Open_Sans_Regular";
`;

export {
  TitleEl,
  DiscoverContentBlock,
  ProductRecommendationWrapper,
  ProductRecommendationTitle,
  CLPContainer,
  VueFindContainer,
  LoaderContainer,
  LoaderIcon,
  UseCaseWrapper,
  UseCaseContainer,
  UseCase,
  RecosWrapper,
  ToggleContainer,
  ThemeDropdownWrapper,
  ErrorMsg,
};
