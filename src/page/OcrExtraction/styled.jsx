import styled from "styled-components";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ isfullScreen }) => (isfullScreen ? "100vh" : "90%")}
  width: ${({ isfullScreen }) => (isfullScreen ? "100vw" : "100%")}
`;

const LoaderIcon = styled.img`
  width: 45px;
  height: 45px;
`;

export { LoaderContainer, LoaderIcon };
