import styled from "styled-components";
import {
  ListWrapper,
  DataImageBlock,
  RecommendationBtn,
  InputEl,
} from "../../../component";

const CurationContentBlock = styled.div`
  padding-top: 6rem;
  ${ListWrapper} {
    padding: 1em;
    background-color: #f3f4fb;
    margin-top: 15px;
    width: 80%;
    margin: auto;
  }
  ${DataImageBlock} {
    display: initial;
  }
`;

export { CurationContentBlock };
