import styled, { css } from "styled-components";

const PdtRecommendationTabsWrapper = styled.div`
  display: flex;
  ${"" /* flex-wrap: wrap */}
  margin-bottom: 5px;
  justify-content: right;
  height: 70px;

  ${(props) =>
    props.is_style_it
      ? css`
          padding-left: 0rem;
          margin-left: 260px;
          margin-top: -15px;
        `
      : null}
  left: 25%;
  width: 50%;
  text-align: right;
  position: relative;
`;

const PdtRecommendationTabs = styled.div`
  font-size: 14px !important;
  font-family: "Poppins_Regular";
  color: #6c6c6c;
  line-height: 120%;
  cursor: pointer;
  width: 90px;
  height: 35px;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  margin: 0 6px;
  line-height: 35px;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  background-color: #f3f4fa;
  border: 1px solid #6c6c6c;
  text-transform: uppercase;

  ${(props) =>
    props.isActive
      ? css`
          /*border-bottom: 1px solid #064559;*/
          background: #2962ff;
          color: #fff;
          border: none;
          line-height: 35px;
          display: inline-block;
          vertical-align: middle;
          font-family: "Poppins_Medium";
        `
      : null}
`;

const RecommendationWithTabsWrapper = styled.div`
  width: 100%;
  padding: 1em 0px;
  ${(props) =>
    props.is_style_it
      ? css`
          padding-left: 0rem;
        `
      : null}
`;

export {
  PdtRecommendationTabs,
  PdtRecommendationTabsWrapper,
  RecommendationWithTabsWrapper,
};
