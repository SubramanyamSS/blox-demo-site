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

const SegmentList = styled.div`
  width: 100%;
  margin: auto;
  height: 100%;
  padding: 10px 40px;
  background-color: #FFFFFF;
`;

const Segment = styled.div`
  padding: 4px;
  text-align: center;

  p {
    color: #191E50;
    font-size: 18px;
    text-align: left;
    padding-bottom: 4px;
    text-transform: capitalize;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const Redirect = styled(Link)`
  width: 100%;
  font-weight: 700;
  padding: 8px 16px;
  margin-bottom: 8px;
  vertical-align: top;
  line-height: 2.5rem;
  transform: scale(1);
  color: rgba(0,0,0,.6);
  display: inline-block;
  text-decoration: none;
  border-bottom-width: 0;
  border-radius: 0.75rem;
  text-transform: capitalize;
  background-clip: padding-box;
  transition: transform 0.35s ease;
  border: 1px solid rgba(0, 0, 0, 0.25);
  background-color: rgba(0, 0, 0, 0.05);

  &:hover {
    transform: scale(1.07);
  }
`;

export {
  Main,
  Content,
  Wrapper,
  Segment,
  Redirect,
  Container,
  SegmentList
};
