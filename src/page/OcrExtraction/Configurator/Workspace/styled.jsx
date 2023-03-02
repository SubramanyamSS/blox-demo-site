import styled from "styled-components";
import Button from "msd-button";

const WorkspaceWrapper = styled.div`
  max-height: 100vh;
  overflow: auto;
  width: 35%;
  background: white;
  padding-top: 3.5%;
`;

const ButtonWrapper = styled(Button)`
  cursor: pointer;
  background-color: #2862ff;
  height: 15%;
  color: #ffffff;
  border-radius: 30px;
  border: none;
  outline: none;
  width: 160px;
  font-family: Poppins_Regular;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 1.05px;
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: center;
  &.button-disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const InputWrapper = styled.input`
  border-radius: 30px;
  border: 1px solid #2862ff;
  background-color: #ffffff;
  overflow-wrap: break-word;
  display: block;
  color: #191e50;
  font-family: Lato-Regular;
  height: 3rem;
  font-size: 1rem;
  width: 95%;

  &--combination-input {
    width: 95%;
  }

  &:disabled {
    background-color: #eff1fc;
    color: #c6cde0;
  }
`;

const CombinedInputContainer = styled.div`
  display: flex;
  margin: 5px 0 5px 0;
  padding: 10px;
  border-radius: 10px;
  align-items: center;

  &.bg-active {
    background-image: linear-gradient(90deg, #cfd6fd, #cfd6fd);
    padding-right: 10px;
    border-radius: 30px;
  }
`;

const InputContainerWrapper = styled.div`
  margin: 0 2px 0 0;
  width: 100%;
  flex-basis: 40%;
`;

const IconButtonWrapper = styled(Button)`
  height: 2.5rem;
  width: 2.5rem;
  background-color: #2862ff;
  border-radius: 30px;
  color: white;
  font-size: 16px;
  border: none;
  cursor: pointer;
  margin-right: 0.5rem;
  &:not(.button-disabled):hover {
    background-color: #191e50;
    color: #e7e8f5;
  }
  &:not(.button-disabled):active {
    background: #191e50;
    color: #e7e8f5;
  }
  &.button-disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const SaveWrapper = styled.div`
  background: white;
  position: fixed;
  bottom: 0%;
  width: 33%;
  height: 60px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 0.3%;
`;

const SaveButtonWrapper = styled(Button)`
  cursor: pointer;
  background-color: #2862ff;
  height: 40px;
  color: #ffffff;
  border-radius: 30px;
  border: none;
  outline: none;
  font-family: Poppins_Regular;
  font-weight: 700;
  width: 100%;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 1.05px;
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: center;
  paddingleft: 30px;
  paddingright: 30px;
  &.button-disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const PageNumberWrapper = styled.div`
  width: 2.5rem;
  border-radius: 30px;
  height: 2.5rem;
  border: none;
  color: black;
  fontweight: bold;
  background: #e4e7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

export {
  WorkspaceWrapper,
  ButtonWrapper,
  InputWrapper,
  CombinedInputContainer,
  InputContainerWrapper,
  IconButtonWrapper,
  SaveButtonWrapper,
  SaveWrapper,
  PageNumberWrapper,
};
