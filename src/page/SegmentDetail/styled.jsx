import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const Main = styled.div`
  left: 0;
  right: 0;
  bottom: 0;
  top: 50px;
  width: 100%;
  overflow: hidden;
  position: absolute;
  background-color: #F8F9FD;
`;

const Container = styled.div`
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const Wrapper = styled.div`
  top: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #FFFFFF;
`;

const Content = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  overflow-y: auto;
  position: absolute;
`;

const Detail = styled.div`
  width: 100%;
  margin: auto;
  height: 100%;
  padding: 10px 40px;
  background-color: #FFFFFF;
`;

const Segment = styled.div`
  padding: 4px;
  display: flex;
`;

const BLink = styled.div`
  width: 97%;
`;

const Config = styled.div`
  width: 3%;

  i {
    cursor: pointer;
  }
`;

const SliderContainer = styled.div`
  padding: 4px;
`;

const Results = styled.div`
  width: 100%;
  display: flex;
`;

const Preview = styled.div`
  width: 35%;
  display: inline-block;
`;

const Tabs = styled.div`
  width: 65%;
  display: inline-block;

  pre, td {
    overflow-x: auto;
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
  }
`;

const SliderWrapper = styled.div`
  width: 100%;
  margin: auto;
`;

const SliderSection = styled.div`
  padding: 4px;
  height: 150px;
  width: 96% !important;

  img {
    margin: auto;
    max-width: 100%;
    max-height: 100%;
    cursor: pointer;
    object-fit: contain;

    &:hover {
      cursor: pointer;
    }
  }
`;

export {
  Main,
  Tabs,
  BLink,
  Config,
  Detail,
  Content,
  Wrapper,
  Segment,
  Results,
  Preview,
  Container,
  SliderSection,
  SliderWrapper,
  SliderContainer
};
