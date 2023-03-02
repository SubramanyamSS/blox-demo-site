import styled, { css } from "styled-components";

const SpiderWrapper = styled.div`
  width: 100%;
  & > svg {
    height: 250px !important;
    width: 100% !important;
    font-family: "SourceSansPro-Regular" !important;
  }
  .caption {
    font-family: 'Poppins_Medium';
  }
`;
const RecommendationSpiderWrapper = styled.div``;

export { SpiderWrapper, RecommendationSpiderWrapper };
