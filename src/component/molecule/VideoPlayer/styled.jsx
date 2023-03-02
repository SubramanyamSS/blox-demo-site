import styled, { css } from "styled-components";

const ContainerWrapper = styled.div`
  width: 100vw;
  height: 75vh;
  position: fixed;
  display: flex;
  align-items: center;
  // z-index: 20000000;
  justify-content: center;
  ${(props) => css`
    z-index: ${props.showVideo ? "20000000" : "-1"};
  `}
`;

const PlayerWrapper = styled.div`
  width: 60%;
  height: 70%;
  position: relative;
  background: #000;
  box-shadow: 0px 0px 20px 20px rgba(0, 0, 0, 0.2);
`;

const ButtonWrapper = styled.button`
  position: absolute;
  z-index: 20000001;
  top: 5px;
  right: 5px;
  background: #fff;
  width: 50px;
  height: 50px;
  border-radius: 1000px;
  // display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  transition: all 0.2s;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }

  ${(props) => css`
    display: ${props.showVideo ? "flex" : "none"};
  `}
`;

export { ContainerWrapper, PlayerWrapper, ButtonWrapper };
