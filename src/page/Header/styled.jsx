import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { TextWithIconWrapper } from "../../component";

const HeaderWrapper = styled.header`
  background-color: ${(props) => (props.isHyphen ? "black" : "#fff")};
  /*border-bottom: 1px solid #fff;*/
  border-bottom: 1px solid #f3f4fb;
  line-height: 120%;
  font-size: 0.85em;
  padding: 0.5em 3%;
  display: flex;
  /* justify-content: space-between; */
  height: 50px;
  box-sizing: border-box;
  align-items: center;
  position: fixed;
  min-width: 1240px;
  width: 100%;
  top: 0px;
  z-index: 1000;
  box-shadow: 0 3px 5px -4px #000;
  ${TextWithIconWrapper} {
    margin-right: 10px;
    position: relative;
    cursor: pointer;
    color: inherit;
    padding: 0 10px;
    display: inline-block;
  }
`;

const DataImageBlock = styled(Link)``;

const HeaderListWrapper = styled.div`
  width: auto;
  right: 10px;
  display: flex;
  justify-content: flex-end;
  font-family: 'Poppins_Medium';
  /* color: #9094b7; */
  color: #333 !important;
`;

const VueFindContainer = styled.div`
  display: inline-block;
`;

const HeaderLogoWrapper = styled.div`
  width: 8%;
  height: 100%;
`;

const HeaderLogo = styled.img`
  max-width: 100%;
  height: 100%;
  padding: 0.65em 0px;
  vertical-align: middle;
  box-sizing: border-box;
`;

const SignoutBtn = styled.div`
  cursor: pointer;
  color: #9094b7;
  font-size: 16px;
  font-family: "SourceSansPro-Regular";
  margin-left: 10px;
  padding-top: ${(props) => (props.isHyphen ? "0.4rem" : "0")};
  text-decoration: underline;
  &:hover {
    color: #191e50;
  }
`;

const UserInfo = styled.div`
  padding: 0em 0.25em;
  font-size: 16px;
  font-family: "SourceSansPro-Regular";
  color: #eee;
  padding-right: 1em;
  cursor: default;
  padding-top: ${(props) => (props.isHyphen ? "0.4rem" : "0")};
  position: absolute;
  right: 70px;
  padding: 15px;
`;
const VueLogoEl = styled.img`
  width: 10%;
  margin-right: auto;
  background-color: #191e50;
`;

const IconWapper = styled.div`
  cursor: pointer;

  height: 50px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) =>
    props.isLogoutButton
      ? css`
          width: 70px;
        `
      : css`
          width: 40px;
        `}
`;

const PdtCountWrapper = styled.div`
  position: absolute;
  height: 16px;
  width: 16px;
  background: #2962ff;
  font-weight: bold;
  color: #fff;
  font-size: 9.5px;
  right: 10%;
  top: 15%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainMenuContainer = styled.div`
  margin: auto;
  z-index: 9;
  width: auto;
  display: flex;
`;

export {
  HeaderWrapper,
  HeaderLogo,
  HeaderLogoWrapper,
  HeaderListWrapper,
  SignoutBtn,
  UserInfo,
  VueLogoEl,
  VueFindContainer,
  DataImageBlock,
  IconWapper,
  PdtCountWrapper,
  MainMenuContainer
};
