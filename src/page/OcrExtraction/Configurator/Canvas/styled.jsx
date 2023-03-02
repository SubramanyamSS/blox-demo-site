import styled from "styled-components";

const CanvasWrapper = styled.div`
height: 90vh;
width: 65%;
margin: 2%;
margin-top: 60px;
overflow-y: hidden;
position: relative;
cursor: grab;
`;

const BreadcrumbWrapper = styled.div`
// position: absolute;
width: 100%;
z-index: 900;
// top: -10px;
left: 2%;
margin-bottom: 20px;

div {
  width: 85%;
  font-size: 14px;
  font-weight: 300;
  font-family: "Open_Sans_Regular" !important;
}

.separator {
  margin: 0 10px;
}
`;

const CanvasControls = styled.div`
  position: absolute;
  bottom: 20px;
  right: 40px;
  display: flex;
  column-gap: 20px;
  z-index: 100;

  button {
    border: none;
    outline: none;
    background: transparent;
    cursor: pointer;
    background: #cfd6fd;
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    box-shadow: 5px 5px 15px 0.5px #2862ff5e;
  }

  i {
    color: #2862ff;
    margin: 0 !important;
  }
`;

export { CanvasWrapper, BreadcrumbWrapper, CanvasControls };
